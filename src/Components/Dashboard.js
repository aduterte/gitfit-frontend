import React, {  useState } from "react"
import { userAtom, sessionAchievements, userAchievements} from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"


import WeightInfo from "./WeightInfo"

export default function Dashboard() {

    const [user, setUser] = useRecoilState(userAtom),
        [achievements, setAchievements] = useRecoilState(sessionAchievements),
        userAch = useRecoilValue(userAchievements)


 

  
       

    // const test = () => {
    //     const a = [...achievements, {name: "This Is A Test", details: "You Deserve Nothing For This. You earned nothing"}]
    //     setAchievements(a)
        // console.log(achievements)
    // }

    // console.log(user.weights)
    return (
        <div className="dashboard">
            <div className="dashboard-title">
                My Dashboard
            </div>
            <WeightInfo/>
            <div>
                {userAch.map((ach, i) => <div key={`ach${i}`}>{ach.name}</div>)}
            </div>
            
           
                
        </div>
    )
}