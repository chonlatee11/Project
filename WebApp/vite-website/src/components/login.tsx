import { useForm, SubmitHandler } from "react-hook-form";
import UseAccount from "../hooks/accounthook/accounthook";
import { useEffect, useState } from "react";

type Inputs = {  // type of inputs
    userName: string,
    passWord: string,
    role: string,
};

// interface AccountType {
//     id: number;
//     name: string;
//     email: string;
//     password: string;
//   }

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isDirty, isValid }
    } = useForm<Inputs>({ defaultValues: { userName: "", passWord: "", role: "" } }); // default values

    const [formvalid, setFormValid] = useState(false);
    const [account, setAccount] = useState<Inputs | null>(null);
    // const [loading, setLoading] = useState(true);

    const onSubmit: SubmitHandler<Inputs> = data => {
        setAccount(data);
        // if (!data.userName || !data.passWord || !data.role) {
        //   alert("Please fill in all fields");
        // }else{
        setFormValid(true);
        // formState.isValid = true;
        // UseAccount(data);
        console.log(formvalid);
        // }
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful && formState.isValid) {
            reset({ userName: "", passWord: "", role: "" });
        }
    }, [formState, reset]);
    
    if (formvalid) {
        UseAccount(account);
        setFormValid(false);
    }
    // UseAccount( "userName", "passWord",  "role");
    // const UseAccount = (userName: String, passWord: String, role: String) => {
    //     console.log(userName);
    //     console.log(passWord);
    //     console.log(role);
    //     setAccount({id: 1, name: "test", email: "123", password: "aaa"});
    //     setLoading(false);
    //     console.log(account);
    //     console.log(loading);
    // }


    
    // console.log(watch("userName"));
    // console.log(watch("passWord"));
    // console.log(watch("role"));
    // console.log(watch("userName")); 


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input defaultValue="" {...register("userName")} required />
            <input defaultValue="" {...register("passWord")} required />
            <label htmlFor="role-admin">
                <input type="radio" value={"admin"} id={"role-admin"} {...register("role")} required />
            </label>
            <label htmlFor="role-research">
                <input type="radio" value={"research"} id={"role-research"} {...register("role")} />
            </label>
            <button type="submit" disabled={!isValid || !isDirty}>login</button>
        </form>
    );
}
