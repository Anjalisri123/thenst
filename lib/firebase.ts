import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, browserLocalPersistence, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDvJ_UlfybrOS7NGOq2tOBCzt8G_opoyjk",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "forcesandfashion-66f97.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "forcesandfashion-66f97",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "forcesandfashion-66f97.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "714457533865",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:714457533865:web:697b58265fb9c3c5b248b8",
};

let app: any;
try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.warn("Firebase app initialization notice:", error);
}

let authInstance: any = null;
try {
  if (app) {
    if (typeof window !== "undefined") {
      try {
        authInstance = initializeAuth(app, {
          persistence: [indexedDBLocalPersistence, browserLocalPersistence],
        });
      } catch {
        authInstance = getAuth(app);
      }
    } else {
      authInstance = getAuth(app);
    }
  }
} catch (error) {
  console.warn("Firebase auth initialization notice:", error);
  authInstance = {} as any;
}

let dbInstance: any = null;
try {
  if (app) {
    dbInstance = getFirestore(app);
  }
} catch (error) {
  console.warn("Firebase firestore initialization notice:", error);
  dbInstance = {} as any;
}

let storageInstance: any = null;
try {
  if (app) {
    storageInstance = getStorage(app);
  }
} catch (error) {
  console.warn("Firebase storage initialization notice:", error);
  storageInstance = {} as any;
}

export const auth = authInstance;
export const db = dbInstance;
export const storage = storageInstance;
export default app;

