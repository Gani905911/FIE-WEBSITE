import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzi7uRlmHppSRpFOQOLaYaBuV8ztyRv_c",
    authDomain: "friends-restaurant-263aa.firebaseapp.com",
    projectId: "friends-restaurant-263aa",
    storageBucket: "friends-restaurant-263aa.firebasestorage.app",
    messagingSenderId: "916419158916",
    appId: "1:916419158916:web:5e81254593a34b31e1b3d1",
    measurementId: "G-EZFWX67YZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
