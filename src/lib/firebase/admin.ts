import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function normalizePrivateKey(key: string): string {
  return key.replace(/\\n/g, "\n");
}

function getAdminApp(): App | null {
  if (getApps().length > 0) {
    return getApps()[0] as App;
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !rawKey) return null;
  try {
    const privateKey = normalizePrivateKey(rawKey);
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  } catch {
    return null;
  }
}

export const adminApp = getAdminApp();
export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminAuth = adminApp ? getAuth(adminApp) : null;
