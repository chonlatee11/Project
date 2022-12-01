import './FormComponent.css'
import {useState} from "react"
import axios from 'axios'
import React from 'react'

const FormComponent = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [EmailColor,setEmailColor] = useState('')
    const [passwordColor, setPasswordColor] = useState('')

    const login = () => {
        axios.post("http://localhost:3030/login",{
            email: email,
            password: password,
        }).then((response) => {
            console.log(response.data)
        });
    };


    const validateForm = (e)=>{
        e.preventDefault()
        if(email.includes("@")){
            setErrorEmail('')
            setEmailColor('green')
        }else{
            setErrorEmail('อีเมลไม่ถูกต้อง')
            setEmailColor('red')
        }

        if(password.length > 8){
            setErrorPassword('')
            setPasswordColor('green')
        }else{
            setErrorPassword('รหัสผ่านไม่ถูกต้อง')
            setPasswordColor('red')
        }
    }

    return(
        <div className = "container">
            <form className = "form" onSubmit={validateForm}>
                <h2>LOGIN</h2>
                <div className="form-control">
                    <label>อีเมล</label>
                    <input type = "text" placeholder='E-mail'onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <small style={{color:EmailColor}}>{errorEmail}</small>
                </div>
                <div className="form-control">
                    <label>รหัสผ่าน</label>
                    <input type = "password" placeholder='Password'onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    <small style={{color:passwordColor}}>{errorPassword}</small>
                </div>
                <div className="form-group">
                    <input type="radio" name="demo" value="Admin"/>ผู้ดูแลระบบ
                    <input type="radio" name="demo" value="Research"/>นักวิจัย
                </div>
                <button type="submit" onClick={login}>เข้าสู่ระบบ</button>
            </form>
        </div>
    )
}

export default FormComponent


/* <div className = "container">
<form className = "form" onSubmit={validateForm}>
    <h2>LOGIN</h2>
    <div className="form-control">
        <label>อีเมล</label>
        <input type = "text" placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} style={{borderColor:EmailColor}}/>
        <small style={{color:EmailColor}}>{errorEmail}</small>
    </div>
    <div className="form-control">
        <label>รหัสผ่าน</label>
        <input type = "password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}/>
        <small style={{color:passwordColor}}>{errorPassword}</small>
    </div>
    <radio>
        <input type="radio" name="demo" value="Admin"/>ผู้ดูแลระบบ
        <input type="radio" name="demo" value="Research"/>นักวิจัย
    </radio>
    <button type="submit">เข้าสู่ระบบ</button>
</form>
</div> */