import { initializeApp, FirebaseApp, getApp } from "firebase/app";
import "firebase/auth";

export let app: FirebaseApp;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6btxCde0lsSepXSuOZDefoBBlaf4bPMY",
  authDomain: "hyukskee-blog.firebaseapp.com",
  projectId: "hyukskee-blog",
  storageBucket: "hyukskee-blog.appspot.com",
  messagingSenderId: "16921852717",
  appId: "1:16921852717:web:acd559c430d1bfb3ee31a4",
};

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
