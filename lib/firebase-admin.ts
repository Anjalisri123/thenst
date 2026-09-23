import * as admin from "firebase-admin";

function getFirebaseAdminApp() {
  if (!admin.apps.length) {
    try {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
        : undefined;

      const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "thenst";

      if (process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: projectId,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: privateKey,
          }),
        });
      } else {
        admin.initializeApp({
          projectId: projectId,
        });
      }
    } catch (error) {
      console.warn("Firebase admin initialization warning:", error);
    }
  }
  return admin;
}

getFirebaseAdminApp();

const dbAdmin = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    getFirebaseAdminApp();
    if (admin.apps.length) {
      const firestore = admin.firestore();
      const val = (firestore as any)[prop];
      return typeof val === "function" ? val.bind(firestore) : val;
    }
    return undefined;
  },
});

export { admin, dbAdmin };

