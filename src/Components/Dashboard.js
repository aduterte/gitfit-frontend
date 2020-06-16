import React, {  useState } from "react"
import { userAtom } from "../Atoms/Atoms"
import { useRecoilState } from "recoil"
import { Line } from "react-chartjs-2"
import { API } from "../constants/index"

export default function Dashboard() {

    const [user, setUser] = useRecoilState(userAtom)

    const [data, setData] = useState({
        labels: ["1", "a", "3","4"],
        dataset: [ 180, 200]
    })

    const [weightInput, setWeightInput] = useState({weight: 0, type: "lbs"})
        
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

    }
    // console.log(user.weights)
    return (
        <div className="dashboard">
            <div className="dashboard-title">
                My Dashboard
            </div>
            {user.weights.length > 0 && 
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
            }
            <div>
             delete me later
             <form onSubmit={logWeight}>
                 <input onChange={handleWeightForm} type="num" name="weight" placeholder="Enter Weight"/>
                 <select onChange={handleWeightForm} name="type" value={weightInput.type} required>
                     <option name="type" value="lbs">lbs</option>
                     <option name="type" value="kg">kg</option>
                 </select>
                 <button>Submit</button>
             </form>
            </div>
            <div className="line-chart">
                <Line data={data}/>
            </div>
                    
        </div>
    )
}