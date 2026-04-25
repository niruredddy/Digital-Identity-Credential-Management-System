import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9B07h0KWcHmzZZQCoZPRXSFaIyVYbafI",
  authDomain: "aureum-7a4c5.firebaseapp.com",
  projectId: "aureum-7a4c5",
  storageBucket: "aureum-7a4c5.appspot.com",
  messagingSenderId: "367933173435",
  appId: "1:367933173435:web:213826d5c49a34d187c39e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
