import React from "react"
import { userAtom } from "../Atoms/Atoms"
import { useRecoilState } from "recoil"
import { Link } from "react-router-dom"

export default function Nav(){

    const [user, setUser] = useRecoilState(userAtom)

    const handleLogout = () => {
        setUser({})
        localStorage.removeItem("token")
    }

    return (
        <div id="nav-bar">
            <div id="nav-logo">
                Logo here
            </div>
            <div id="nav-menu-container">
                {user.name && <div>Welcome, {user.name}</div>}
                <Link to="/create-routine"><div> create routne </div></Link>
                <Link to="/create-workout"><div> create workout </div></Link>
                <div onClick={handleLogout}> Log out </div>
            </div>
        </div>
    )
}