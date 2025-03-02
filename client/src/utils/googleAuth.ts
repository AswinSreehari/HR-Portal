// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAoEurr02A9Y1Zi4QDnqsJCqZI1QvPOrAo",
  authDomain: "hr-portal-8c278.firebaseapp.com",
  projectId: "hr-portal-8c278",
  storageBucket: "hr-portal-8c278.firebasestorage.app",
  messagingSenderId: "121401849528",
  appId: "1:121401849528:web:8627aeb788348f028a264d",
  measurementId: "G-P7517H9547"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
