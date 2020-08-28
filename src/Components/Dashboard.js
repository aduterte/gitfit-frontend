import React, {  useState, useEffect} from "react"
import { userAtom, sessionAchievements, userAchievements} from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"


import WeightInfo from "./WeightInfo"

export default function Dashboard() {

    const [user, setUser] = useRecoilState(userAtom),
        [achievements, setAchievements] = useRecoilState(sessionAchievements),
        userAch = useRecoilValue(userAchievements),
        image = "pngfuel.com.png"


 
    
       

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
            {userAch.length >= 1 && 
            <div className="dashboard-achievement">
                <div className="dashboard-achievement-title">
                    Achievements
                </div>
                {userAch.map((ach, i) => <div key={`ach${i}`} className="dashboard-achievement-name"><img style={{width: "25px"}} src={image} alt="trophy"/>{ach.name}</div>)}
            </div>
            }
           
                
        </div>
    )
}