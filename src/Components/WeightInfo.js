import React, {useState} from "react"
import {userAtom, sessionAchievements, userAchievements} from "../Atoms/Atoms"
import {useRecoilState} from "recoil"
import { API } from "../constants/index"
import { Line } from "react-chartjs-2"
import * as Zoom from "chartjs-plugin-zoom"
import Hammer from "hammerjs"

export default function WeightInfo () {
    const [user, setUser] = useRecoilState(userAtom)
    const [weightInput, setWeightInput] = useState({weight: 0, type: "lbs"}),
        [achievements, setAchievements] = useRecoilState(sessionAchievements),
        [userAch, setUserAch] = useRecoilState(userAchievements)
        
    const handleWeightForm = (e) => {
        const {name, value} = e.target
        setWeightInput({...weightInput, [name]: value})

    }

    const chart = () => {
        const labels = user.weights.map(w => {
            let temp = new Date(w.created_at)
            return temp.toString().substring(4, 15)
        })

        const dataset = {
            labels: labels,
            datasets: [
                {
                  label: 'Lbs',
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: 'rgb(55, 178, 255)',
                  borderColor: 'rgb(55, 178, 255)',
                  borderWidth: 2,
                  data: user.weights.map(w => w.lbs)
                }
              ]
        }
        return dataset
    }

    const logWeight = (e) => {
        e.preventDefault()
        const obj = {user_id: user.id, lbs: 0, kg: 0}
        let logW = 0
        if(weightInput.type ==="lbs"){ 
            obj.lbs = weightInput.weight
            obj.kg = obj.lbs / 2.205
            logW = weightInput.weight
        } else if (weightInput.type === "kg") {
            obj.kg = weightInput.weight
            obj.lbs = obj.kg * 2.205
            logW = obj.lbs
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
            if(!!user.weights){
                const updatedUser = {...user, weights: [...user.weights, data]}
                setUser(updatedUser)
            } else {
                setUser(data)
            }
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

        if(!userAch.find( ach => ach.code === "halfWay")){
            if(user.weights[0] > 0){
            if(user.weights[0].lbs > user.goal_weight){ // want to lose weight
                // console.log("lose weight goal")
                if(logW < user.goal_weight + Math.abs(user.goal_weight - user.weights[0].lbs)/2){
                    fetch(`${API}/unlocks`, {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({user_id: user.id, achievement_code: "halfWay"})
                    }).then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        const a = [...achievements, data]
                        const uA = [...userAch, data]
                        setAchievements(a)
                        setUserAch(uA)
                    })
                  console.log(true)
                } 
            } else {
                if(logW > user.weights[0].lbs + Math.abs(user.goal_weight - user.weights[0].lbs)/2){
                    fetch(`${API}/unlocks`, {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({user_id: user.id, achievement_code: "halfWay"})
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
        }
    }
        if(!userAch.find( ach => ach.code === "goalHit")){
            if(user.weights[0] > 0){
            if(user.weights[0].lbs > user.goal_weight){
                if (logW <= user.goal_weight){
                    fetch(`${API}/unlocks`, {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({user_id: user.id, achievement_code: "goalHit"})
                    }).then(resp => resp.json())
                    .then(data => {
                        console.log(data)
                        const a = [...achievements, data]
                        const uA = [...userAch, data]
                        setAchievements(a)
                        setUserAch(uA)
                    })
                }
            } else {
                if (logW >= user.goal_weight){
                    fetch(`${API}/unlocks`, {
                        method: "POST",
                        headers: {"Content-Type":"application/json"},
                        body: JSON.stringify({user_id: user.id, achievement_code: "goalHit"})
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
        }}
    }

    return (
        <>
        
            <div className="weight-info-wrapper">
                {!!user.weights && user.weights.length > 0 &&
                <> 
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
                    <div className="line-chart">
                        {user && 
                        <Line
                            data={chart()}
                            options={{
                                title:{
                                    display:false,
                                    text:'Weight Log',
                                    fontSize:20
                                },
                                legend:{
                                    display:true,
                                    position:'bottom'
                                },
                                plugins: {
                                    zoom: {
                                        pan: {
                                            enabled: true,
                                            mode: 'x',
                                            rangeMin: {
                                                x: 0,
                                                y:0,
                                            },
                                            rangeMax: {
                                                x:100,
                                                y: 400,
                                            }
                                        },
                                        zoom: {
                                            enabled: true,
                                            mode: 'x',
                                            rangeMin: {
                                                x: 0,
                                                y:50,
                                            },
                                            rangeMax: {
                                                x:100,
                                                y: 400,
                                            }
                                        }
                                    }
                                }
                            }}
                        />}
                    </div>
                </>
                }
                    
                <div>
                    <form className="weight-form" onSubmit={logWeight}>
                        <label>Log Weight</label> 
                        <input onChange={handleWeightForm} type="num" name="weight" placeholder="Enter Weight"/>
                        <select onChange={handleWeightForm} name="type" value={weightInput.type} required>
                            <option name="type" value="lbs">lbs</option>
                            <option name="type" value="kg">kg</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
            
            
        </>
    )
}