// import * as React from "react";
import { useState, useEffect, createContext } from "react";
// import  LoginForm  from "../../../src/components/loginForm";
const AccountContext = createContext({});

interface AccountType {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UseAccount = (userName: String, passWord: String, role: String) => {
  console.log(userName);
  console.log(passWord);
  console.log(role);

  const [account, setAccount] = useState("");
  setAccount("test");
  console.log(account);
  // const [account, setAccount] = React.useState<AccountType | null>(null);
  // const [loading, setLoading] = React.useState(true);

  // const getUerData = async () => {
  //     const response = await fetch("http://localhost:3031/users");
  //     const data = await response.json();
  //     console.log(data);
  //     const user = data.find((user: AccountType) => user.name === userName && user.password === passWord);
  //     if (user) {
  //         setAccount(user);
  //     }
  //     setLoading(false);
  // }
  // console.log(account);
  // const [loading, setLoading] = useState(true);
  // setAccount({id: 1, name: userName, email: userName, password: passWord});

  // setAccount({id: 1, name: "test", email: "test", password: "test"});
  // console.log(account);
  // useEffect(() => {

  // }, []);

  // return { account, loading };
};

export default UseAccount;
