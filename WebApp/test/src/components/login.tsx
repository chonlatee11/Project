import { useForm, SubmitHandler } from "react-hook-form";
import  UseAccount   from ".././hooks/acHook/acHook";
import * as React from "react";
import { useEffect } from "react";

type Inputs = {  // type of inputs
    userName: string,
    passWord: string,
    role: string,
};

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { isDirty, isValid }
    } = useForm<Inputs>({ defaultValues: { userName: "", passWord: "", role: "" } }); // default values

    // const [formvalid, setFormValid] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = data => {
        // if (!data.userName || !data.passWord || !data.role) {
        //   alert("Please fill in all fields");
        // }else{
        // setFormValid(true);
        // formState.isValid = true;
        UseAccount(data.userName, data.passWord, data.role);
        // console.log(data);
        // }
    }


    useEffect(() => {
        if (formState.isSubmitSuccessful && formState.isValid) {
            reset({ userName: "", passWord: "", role: "" });
        }
    }, [formState, reset]);
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
