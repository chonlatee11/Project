import React from "react";
import "./loginstyle.css";
import "../../hooks/Account/accountHook"
import {LoginForm} from "../../components/loginForm";

interface AccountType{
    id: number
    name: string
    email: string
    password: string
  };
  
    const UseAccount = (userName: String, passWord: String, role: String) =>{ 

    console.log(userName);
    console.log(passWord);
    console.log(role);

    const [account, setAccount] = React.useState('');
    setAccount("test");
    console.log(account);
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