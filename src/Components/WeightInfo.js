import React, {useState} from "react"
import {userAtom, sessionAchievements, userAchievements} from "../Atoms/Atoms"
import {useRecoilState} from "recoil"
import { API } from "../constants/index"

export default function WeightInfo () {
    const [user, setUser] = useRecoilState(userAtom)
    const [weightInput, setWeightInput] = useState({weight: 0, type: "lbs"}),
        [achievements, setAchievements] = useRecoilState(sessionAchievements),
        [userAch, setUserAch] = useRecoilState(userAchievements)
        
    const handleWeightForm = (e) => {
        const {name, value} = e.target
        setWeightInput({...weightInput, [name]: value})

    }

    const logWeight = (e) => {
        e.preventDefault()
        const obj = {user_id: user.id, lbs: 0, kg: 0}
        if(weightInput.type ==="lbs"){ 
            obj.lbs = weightInput.weight
            obj.kg = obj.lbs / 2.205
        } else if (weightInput.type === "kg") {
            obj.kg = weightInput.weight
            obj.lbs = obj.kg * 2.205
        }
        e.target.reset()
        setWeightInput({...weightInput, type: "lbs"})
        console.log(obj)

        fetch(`${API}/weights`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(data => {
            console.log(data)
            const updatedUser = {...user, weights: [...user.weights, data]}
            console.log(updatedUser) 
            setUser(updatedUser)
        })

        if(!userAch.find( ach => ach.code === "weight")){
            fetch(`${API}/unlocks`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({user_id: user.id, achievement_code: "weight"})
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                const a = [...achievements, data]
                const uA = [...userAch, data]
                setAchievements(a)
                setUserAch(uA)
            })
        }

    }
    return (
        <>
        {user.weights.length > 0 && 
            <div className="weight-info-wrapper">
                <div className="dashboard-title">
                    Weight Log
                </div>
                <div className="weight-info">
                    <div className="first-weight">
                        <div className="weight-info-text">Starting Weight</div>
                        <div className="weight-numbers">{user.weights[0].lbs}</div>
                    </div>
                    <div className="current-weight">
                        <div className="weight-info-text">Current Weight </div>
                        <div className="weight-numbers"> {user.weights[user.weights.length - 1 ].lbs}
                        </div>
                    </div>
                    <div className="goal-weight">
                        <div className="weight-info-text">Goal Weight</div>
                        <div className="weight-numbers">{user.goal_weight}
                        </div>
                    </div>
                </div>
                <div>
                    <form className="weight-form" onSubmit={logWeight}>
                        <label>Log Weight</label><br/>
                        <input onChange={handleWeightForm} type="num" name="weight" placeholder="Enter Weight"/>
                        <select onChange={handleWeightForm} name="type" value={weightInput.type} required>
                            <option name="type" value="lbs">lbs</option>
                            <option name="type" value="kg">kg</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            }
            </>
    )
}