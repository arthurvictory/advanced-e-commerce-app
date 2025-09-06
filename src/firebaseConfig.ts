import { initializeApp } from "firebase/app";
import { getAuth,  type Auth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr2-HdJbmb6y3emxk-TKumjk55VL-oYag",
  authDomain: "e-commerce-app-b4cf7.firebaseapp.com",
  projectId: "e-commerce-app-b4cf7",
  storageBucket: "e-commerce-app-b4cf7.firebasestorage.app",
  messagingSenderId: "137295787830",
  appId: "1:137295787830:web:544ff754a162a5f0692597",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { auth };
