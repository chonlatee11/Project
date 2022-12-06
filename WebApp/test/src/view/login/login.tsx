import React from "react";
import "../../hooks/acHook/acHook";
import {LoginForm} from "../../components/login";

    const UseAccount = (userName: String, passWord: String, role: String) =>{ 
    console.log(userName);
    console.log(passWord);
    console.log(role);
    }
    UseAccount("test", "test", "test");

const LoginView = () => {
    return (
        <div>
        <LoginForm />
        </div>
    );
};

export default LoginView;