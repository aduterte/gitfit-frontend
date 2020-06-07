import React, {useState} from "react"
import { userAtom } from "../Atoms/Atoms"
import { useSetRecoilState } from "recoil"
import { URL } from "../constants/index"

export default function LoginContainer(){

    const setUser = useSetRecoilState(userAtom),
        [input, setInput] = useState({name: "", password: "", email: "", passwordConfirm: ""}),
        [isLogin, setIsLogin] = useState(true)

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setInput({...input, [name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(isLogin){
        fetch(`${URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: input.email, password: input.password})
        }).then(resp => resp.json())
        .then(data => {
            // console.log(data.user, data.token)
            localStorage.setItem("token", data.token)
            setUser(data.user)
        })
        } else if (!isLogin){
            fetch(`${URL}/users`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({name: input.name, email: input.email, password: input.password, password_confirmation: input.passwordConfirm})
            }).then(resp => resp.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                setUser(data.user)
            })
        }
    }

    return (
        <div id="login-container">
            <div id="login-form">
                <form onSubmit={onSubmit}>
                    {!isLogin && <input onChange={handleOnChange} value={input.name} name="name" placeholder="Enter Name" required/>}
                    <input onChange={handleOnChange} value={input.email} name="email" placeholder="Enter E-mail" required/>
                    <input onChange={handleOnChange} type="password" value={input.password} name="password" placeholder="Enter Password" required/>
                    {!isLogin && <input onChange={handleOnChange} type="password" value={input.passwordConfirm} name="passwordConfirm" placeholder="Confirm Password" required/>}
                    <input type="submit" value={isLogin ? "Login" : "Sign Up"}/>
                </form>
                <div>{isLogin ? "Not" : "Already"} a member? Click <span onClick={()=>setIsLogin(!isLogin)}>Here</span> to {isLogin ? "Sign up" : "Login"}</div>
            </div>

        </div>
    )
}