import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";
import { fbConfig } from "../env";

export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: fbConfig.API_KEY,
  authDomain: fbConfig.AUTH_DOMAIN,
  projectId: fbConfig.PROJECT_ID,
  storageBucket: fbConfig.STORAGE_BUCKET,
  messagingSenderId: fbConfig.MESSAGING_SENDER_ID,
  appId: fbConfig.APP_ID,
};

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
