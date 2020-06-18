import React, {useState, createRef} from "react"
import { userAtom, userRoutines, userPosts, editProfileAtom } from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
import EditProfile from "../Components/EditProfile"
import { Link } from "react-router-dom"

export default function Nav(){

    const [user, setUser] = useRecoilState(userAtom),
        setPosts = useSetRecoilState(userPosts),
        setRoutines = useSetRecoilState(userRoutines),
        [editProfile, setEditProfile] = useRecoilState(editProfileAtom),
        profile = createRef()

    const handleLogout = () => {
        setUser({})
        setPosts(null)
        setRoutines([])

        
        localStorage.removeItem("token")
    }

    const toggleEdit = () => {
        setEditProfile(!editProfile)
        // profile.current.classList.toggle('is-toggle')
    }

    return (
        <div id="nav-bar">
            <div id="nav-logo">
                <Link to="/"><img src="/images/longlogowhite.png" alt="nav logo"/></Link>
            </div>
            <div id="nav-menu-container">
                {user.name && <div className="welcome-name">Welcome, {user.name.split(" ")[0]}</div>}
                {user.name && 
                <div className="gear-button">
                    <div className="nav-dropdown-menu">
                        <div className="nav-dropdown-content">
                        <Link to="/profile"><div className="nav-dropdown-button">Dashboard </div></Link>
                        <Link to="/create-workout"><div className="nav-dropdown-button">Create Routine</div></Link>
                        <Link to="/routines"><div className="nav-dropdown-button">My Routines</div></Link>
                            <div onClick={()=> setEditProfile(!editProfile)}className="nav-dropdown-button">Edit Profile</div>
                        </div>
                    </div>
                    <div className="gear fa">&#xf013;</div>
                    
                </div>}
                {/* {user.name && <Link to="/profile"><div className="nav-button">Dashboard </div></Link>} */}
                {/* <Link to="/create-workout"><div className="nav-button"> Create Routine </div></Link> */}
                {user.id ? <div className="nav-button" onClick={handleLogout}> Log out </div> : <Link to="/login"><div className="nav-button" > Log In </div></Link>}
            </div>
            {editProfile &&
                <div ref={profile} className="profile-edit">
                    <EditProfile />
                </div>    
                }
        </div>
    )
}