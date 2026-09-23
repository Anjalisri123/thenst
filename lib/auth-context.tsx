"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserProfile, UserRole } from "@/lib/types";
import { sendEmail } from "@/lib/email";
import { logActivity } from "@/lib/firestore";


const DEFAULT_SUPER_ADMIN_PASSWORD = process.env.NEXT_PUBLIC_DEFAULT_SUPER_ADMIN_PASSWORD || "SuperAdmin@123";
const APP_NAMESPACE = process.env.NEXT_PUBLIC_APP_NAMESPACE || "thenst";
const SUPER_ADMIN_EMAILS = [
  process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL_1,
  process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL_2,
  process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL_3,
].filter(Boolean).map((email) => email.toLowerCase());

function isAppProfile(data: UserProfile): boolean {
  return !data.namespace || data.namespace === APP_NAMESPACE;
}

async function isSuperAdmin(email: string): Promise<boolean> {
  try {
    const res = await fetch("/api/check-superadmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.isSuperAdmin === true;
  } catch {
    return false;
  }
}

function isDefaultSuperAdminLogin(email: string, password: string): boolean {
  return SUPER_ADMIN_EMAILS.includes(email.toLowerCase()) && password === DEFAULT_SUPER_ADMIN_PASSWORD;
}


interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string, expectedRole?: UserRole) => Promise<{ role: UserRole }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole,
    companyDetails?: {
      name: string;
      website?: string;
      designation?: string;
    }
  ) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      // Clear previous listener if any
      if (unsubscribeProfile) {
        unsubscribeProfile();
        unsubscribeProfile = null;
      }

      if (firebaseUser) {
        // Set up real-time listener for profile
        const docRef = doc(db, "users", firebaseUser.uid);
        unsubscribeProfile = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists() && isAppProfile(docSnap.data() as UserProfile)) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
          }
          setLoading(false);
        }, (error) => {
          console.error("Profile listener error:", error);
          setLoading(false);
        });
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  async function signIn(identifier: string, password: string, expectedRole?: UserRole) {
    let email = identifier;

    // Resolve phone number to email if identifier is not an email
    if (!identifier.includes("@")) {
      const phoneClean = identifier.startsWith("+")
        ? "+" + identifier.replace(/\D/g, "")
        : identifier.replace(/\D/g, "");

      const res = await fetch("/api/auth/check-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneClean }),
      });
      const data = await res.json();

      if (!data.exists) {
        throw new Error("No account found with this phone number.");
      }

      email = data.email;
    }

    if (isDefaultSuperAdminLogin(email, password)) {
      try {
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const docRef = doc(db, "users", credential.user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          const newProfile: UserProfile = {
            uid: credential.user.uid,
            namespace: APP_NAMESPACE,
            email: credential.user.email || email,
            fullName: "Super Admin",
            phone: "",
            role: "superadmin",
            status: "active",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
          return { role: "superadmin" as UserRole };
        }

        const data = docSnap.data() as UserProfile;
        if (!isAppProfile(data)) {
          await firebaseSignOut(auth);
          throw new Error("Account not found in this application.");
        }
        setProfile(data);
        return { role: data.role };
      } catch (error: any) {
        if (error?.code !== "auth/user-not-found" && error?.code !== "auth/invalid-credential") {
          throw error;
        }

        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const newProfile: UserProfile = {
          uid: credential.user.uid,
          namespace: APP_NAMESPACE,
          email: credential.user.email || email,
          fullName: "Super Admin",
          phone: "",
          role: "superadmin",
          status: "active",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await setDoc(doc(db, "users", credential.user.uid), newProfile);
        setProfile(newProfile);
        return { role: "superadmin" as UserRole };
      }
    }

    const startTime = Date.now();
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const duration = Date.now() - startTime;
    const firebaseUser = credential.user;

    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile;

      if (!isAppProfile(data)) {
        await firebaseSignOut(auth);
        throw new Error("Account not found in this application.");
      }

      if (data.status === "blocked" || data.status === "disabled") {
        await firebaseSignOut(auth);
        throw new Error(
          "Your account has been " + data.status + ". Contact admin."
        );
      }

      // Verify Role if expectedRole is provided
      if (expectedRole && data.role !== expectedRole && data.role !== "superadmin") {
        await firebaseSignOut(auth);
        throw new Error(`Access denied. You are registered as a ${data.role}, not a ${expectedRole}.`);
      }

      setProfile(data);

      // Audit Log: Login
      await logActivity({
        userId: firebaseUser.uid,
        email: data.email,
        action: "Login",
        role: data.role,
        details: { method: identifier.includes("@") ? "email" : "phone", duration }
      });

      return { role: data.role };
    }


    if (await isSuperAdmin(email)) {
      const newProfile: UserProfile = {
        uid: firebaseUser.uid,
        namespace: APP_NAMESPACE,
        email: firebaseUser.email || "",
        fullName: "Super Admin",
        phone: "",
        role: "superadmin",
        status: "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await setDoc(docRef, newProfile);
      setProfile(newProfile);

      return { role: "superadmin" as UserRole };
    }


    throw new Error("Account not found. Please register first.");
  }

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    phone: string,
    role: UserRole,
    companyDetails?: {
      name: string;
      website?: string;
      designation?: string;
    }
  ) {

    // 1. Check for Duplicate Email/Phone via Server API
    const res = await fetch("/api/auth/check-exists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });
    const checkData = await res.json();

    if (checkData.exists) {
      if (checkData.type === "email") {
        throw new Error("An account with this email address already exists.");
      } else {
        throw new Error("An account with this mobile number already exists.");
      }
    }

    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const newProfile: UserProfile = {
      uid: credential.user.uid,
      namespace: APP_NAMESPACE,
      email,
      fullName,
      phone,
      role,
      status: (role === "admin" || role === "intern") ? "pending_verification" : "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...(role === 'hr' && { credits: 3 }),
      ...(companyDetails && { companyDetails }),
    };

    await setDoc(doc(db, "users", credential.user.uid), newProfile);

    setProfile(newProfile);

    // Audit Log: Signup
    await logActivity({
      userId: credential.user.uid,
      email,
      action: "Signup",
      role,
      details: { fullName, companyName: companyDetails?.name || "N/A" }
    });


    // Send Welcome Email
    const subject = role === "guard" 
      ? "Welcome to TheNST – Complete Your KYC" 
      : role === "hr" 
        ? "Welcome to TheNST – Complete Your Company Verification" 
        : role === "agency"
          ? "Welcome to TheNST – Complete Your Agency Verification"
          : role === "admin"
            ? "Admin Account Created 👤"
            : "Welcome to TheNST!";

    sendEmail({
      to: email,
      subject,
      template: "welcome",
      data: {
        fullName,
        role,
      },
    }).catch(err => console.error("Welcome email failed:", err));
  }

  async function signOutUser() {
    if (user && profile) {
      // Audit Log: Logout (Run before signout while context is available)
      await logActivity({
        userId: user.uid,
        email: user.email || "",
        action: "Logout",
        role: profile.role,
        details: {}
      });
    }
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  }

  async function resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function fetchProfile(firebaseUser: User) {
    const docRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as UserProfile;
      if (isAppProfile(data)) setProfile(data);
    }
  }

  async function refreshProfile() {
    if (user) {
      await fetchProfile(user);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut: signOutUser,
        resetPassword,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
