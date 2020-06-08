import React from "react"
import { userAtom } from "../Atoms/Atoms"
import { useRecoilValue } from "recoil"
import {Link} from "react-router-dom"

export default function ProfileContainer(){

    const user = useRecoilValue(userAtom)

    return (
        <div id="profile-container">
            <div id="profile-info">
                <h2>{user.name}</h2>
                <h4>Tools</h4>
                
                <Link to="/create-workout"><div>Create a Routine</div></Link>
                
                
            </div>
            <div id="profile-main">
                <div className="create-post">
                create a post

                </div>
                <div>
                    posts go here
                </div>
            </div>

        </div>
    )
}