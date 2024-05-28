// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD57oOE1t9Jrs9tO1KKs9Q2SpkAlQI0TmM",
    authDomain: "netflix-trailer-5215e.firebaseapp.com",
    projectId: "netflix-trailer-5215e",
    storageBucket: "netflix-trailer-5215e.appspot.com",
    messagingSenderId: "47482343785",
    appId: "1:47482343785:web:cc257d85ecdc49a545adf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        const user = response.user;

        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); //Removing the "auth/" and replacing the "-" with space in the error code
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")); //Removing the "auth/" and replacing the "-" with space in the error code
    }
}

const logout = () =>{
    signOut(auth);
}

export {auth, db, login, logout, signup};