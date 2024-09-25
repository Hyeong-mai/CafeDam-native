import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2jpkmlAPsH4Ax-ilgQZdWvYcHt_w-zDE",
  authDomain: "cafedamnative.firebaseapp.com",
  projectId: "cafedamnative",
  storageBucket: "cafedamnative.appspot.com",
  messagingSenderId: "870900165842",
  appId: "1:870900165842:web:f24fda7ff7c6270adc510b",
  measurementId: "G-56EV99GL32",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
