import React from "react"
import { userAtom } from "../Atoms/Atoms"
import { useRecoilValue } from "recoil"

export default function Nav(){

    const user = useRecoilValue(userAtom)

    return (
        <div id="nav-bar">
            <div id="nav-logo">
                Logo here
            </div>
            <div id="nav-menu-container">
                {user.name && <div>Welcome, {user.name}</div>}
                <div>Button 1</div>
                <div>Button 2</div>
            </div>
        </div>
    )
}