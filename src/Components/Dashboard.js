import React, {  useState } from "react"
import { userAtom, sessionAchievements } from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState } from "recoil"
import { Line } from "react-chartjs-2"

import WeightInfo from "./WeightInfo"

export default function Dashboard() {

    const [user, setUser] = useRecoilState(userAtom),
        [achievements, setAchievements] = useRecoilState(sessionAchievements)

    const [data, setData] = useState({
        labels: ["1", "a", "3","4"],
        dataset: [ 180, 200]
    })

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
            
            <div className="line-chart">
                <Line data={data}/>
            </div>
            <button onClick={test}>Test</button>        
        </div>
    )
}