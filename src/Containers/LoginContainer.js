import React, {useState, createRef} from "react"
import { userAtom, userAchievements, userRoutines, userFollowers, userFollowing, editProfileAtom } from "../Atoms/Atoms"
import { useSetRecoilState } from "recoil"
import { API } from "../constants/index"

export default function LoginContainer(){

    const setUser = useSetRecoilState(userAtom),
        setRoutines = useSetRecoilState(userRoutines),
        setFollowing = useSetRecoilState(userFollowing),
        setFollowers = useSetRecoilState(userFollowers),
        setEditProfile = useSetRecoilState(editProfileAtom),
        setUserAch = useSetRecoilState(userAchievements),
        [input, setInput] = useState({name: "", password: "", email: "", passwordConfirm: ""}),
        [isLogin, setIsLogin] = useState(true),
        loginForm = createRef(),
        loginImage = createRef(),
        loginButton = createRef()

    const handleOnChange = (e) => {
        const {name, value} = e.target
        setInput({...input, [name]: value})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(isLogin){
        fetch(`${API}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: input.email, password: input.password})
        }).then(resp => resp.json())
        .then(data => {
            debugger
            localStorage.setItem("token", data.token)
            setUser(data.user)
            setRoutines(data.user.routines)
            setFollowers(data.user.followers)
            setFollowing(data.user.followed)
            setUserAch(data.user.achievements)

            
            
        })
        } else if (!isLogin){
            fetch(`${API}/users`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify({name: input.name, email: input.email, password: input.password, password_confirmation: input.passwordConfirm})
            }).then(resp => resp.json())
            .then(data => {
                localStorage.setItem("token", data.token)
                setUser(data.user)
                setEditProfile(true)
            })
        }
    }

    const handleToggle = () => {
        setIsLogin(!isLogin)
        loginForm.current.classList.toggle('is-sign-up')
        loginImage.current.classList.toggle('is-sign-up')
        loginButton.current.classList.toggle('toggle')
        console.log(loginForm.current)
    }

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <div className="login-form" ref={loginForm}>
                    <h1>{isLogin ? "Log In" : "Sign Up"}</h1>
                    <form onSubmit={onSubmit}>
                        {!isLogin && <div><input className="login-input" onChange={handleOnChange} value={input.name} name="name" placeholder="Enter Name" required/></div>}
                        <div><input className="login-input" onChange={handleOnChange} value={input.email} name="email" placeholder="Enter E-mail" required/></div>
                        <div><input className="login-input" onChange={handleOnChange} type="password" value={input.password} name="password" placeholder="Enter Password" required/></div>
                        {!isLogin && <div><input className="login-input" onChange={handleOnChange} type="password" value={input.passwordConfirm} name="passwordConfirm" placeholder="Confirm Password" required/></div>}
                        <div>
                            <input ref={loginButton} className="login-submit" type="submit" value={isLogin ? "Login" : "Sign Up"}/>
                        </div>
                    </form>
                    
                </div>
            
            <div className="login-image" ref={loginImage}>
                
                    <img src="/images/blocklogogray.png" alt="logo"/>
                    <div>
                        <h2>{isLogin ? "Not" : "Already"} a member? </h2> Click <button onClick={handleToggle}>Here</button> to {isLogin ? "Sign up" : "Login"}
                    </div>
                    </div>  
            </div>
        </div>
    )
}