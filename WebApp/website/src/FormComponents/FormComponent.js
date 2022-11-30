import './FormComponent.css'
import {useState} from "react"

const FormComponent = ()=>{
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [EmailColor,setEmailColor] = useState('')
    const [passwordColor, setPasswordColor] = useState('')

    const validateForm = (e)=>{
        e.preventDefault()
        if(email.includes("@")){
            setErrorEmail('')
            setEmailColor('green')
        }else{
            setErrorEmail('รูปแบบอีเมลไม่ถูกต้อง')
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
                <h2>Disease Sugarcane WEB</h2>
                <div className="form-control">
                    <label>E-mail</label>
                    <input type = "text" placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} style={{borderColor:EmailColor}}/>
                    <small style={{color:EmailColor}}>{errorEmail}</small>
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input type = "password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} style={{borderColor:passwordColor}}/>
                    <small style={{color:passwordColor}}>{errorPassword}</small>
                </div>
                <radio>
                    <input type="radio" name="demo" value="One"/>ผู้ดูแลระบบ
                    <input type="radio" name="demo" value="Two"/>นักวิจัย
                </radio>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default FormComponent