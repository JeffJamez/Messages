import React from 'react';
import "../styles/login.css";
import {Button} from "@material-ui/core";
import {auth, provider} from "../firebase";

function Login(props) {
    const login = e =>{
        auth.signInWithPopup(provider)
        .catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <div className="logo">
                <img src="data:image/jpeg;base64,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"/>
                <h3>Module 3 Messages</h3>
            </div>
            <Button onClick={login}>Sign in</Button>
        </div>
    );
}

export default Login;