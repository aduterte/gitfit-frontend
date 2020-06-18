import React, {  useState } from "react"
import { userAtom, sessionAchievements } from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState } from "recoil"


import WeightInfo from "./WeightInfo"

export default function Dashboard() {

    const [user, setUser] = useRecoilState(userAtom),
        [achievements, setAchievements] = useRecoilState(sessionAchievements)

 

  
       

    const test = () => {
        const a = [...achievements, {name: "This Is A Test", details: "You Deserve Nothing For This. You earned nothing"}]
        setAchievements(a)
        // console.log(achievements)
    }

    // console.log(user.weights)
    return (
        <div className="dashboard">
            <div className="dashboard-title">
                My Dashboard
            </div>
            <WeightInfo/>
            
           
            <button onClick={test}>Test</button>        
        </div>
    )
}