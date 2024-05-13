import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase_config';
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export default function Auth() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const singinHandler = async () => {
        await createUserWithEmailAndPassword(auth, user.email, user.password);
    };
    const logOutHandler = async () => {
        await signOut(auth);
        alert("logout succeeful");
    };
    const signinWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };
    return (
        <>
            <input type="text" placeholder='email' value={user.email} onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} />
            <input type="text" placeholder='pass' value={user.password} onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))} />
            <button onClick={singinHandler}>Submit</button>
            <button onClick={signinWithGoogle}>Signin with google</button>
            <button onClick={logOutHandler}>Log out</button>
        </>
    );
}
