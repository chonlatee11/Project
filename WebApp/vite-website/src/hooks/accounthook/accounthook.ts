// import * as React from "react";
import { useState, useEffect, createContext } from "react";
import { LoginForm } from "../../components/login";
// const AccountContext = createContext({});

interface AccountType {
  id: number;
  userName: string;
  passWord: string;
  role: string;
}

const UseAccount = (props: any) => {
  console.log(props.userName);
  console.log(props.passWord);
  console.log(props.role);

  //   const [account, setAccount] = useState("");
//   setAccount("test");
//   console.log(account);
  const [account, setAccount] = useState<AccountType | null>(null);
  setAccount( {id: 1, userName : props.userName, passWord: props.passWord, role: props.role} );
//   const [loading, setLoading] = useState(true);

//   const getUerData = async () => {
//     const response = await fetch("http://localhost:3031/users");
//     const data = await response.json();
//     console.log(data);
//     const user = data.find(
//       (user: AccountType) =>
//         user.name === userName && user.password === passWord
//     );
//     if (user) {
//       setAccount(user);
//     }
//     setLoading(false);
//   };
//   console.log(account);
//   const [loading, setLoading] = useState(true);
//   setAccount({ id: 1, name: userName, email: userName, password: passWord });

//   setAccount({ id: 1, name: "test", email: "test", password: "test" });
  console.log(account);
//   useEffect(() => {}, []);

//   return { account, loading };
};

export default UseAccount;
