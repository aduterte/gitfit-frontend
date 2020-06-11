import React from "react"
import {userRoutines} from "../Atoms/Atoms"
import { useRecoilState} from "recoil"
import { API } from "../constants/index"
import { RecoilRoot } from "recoil"

export default function RoutineCard(props){

    const {name, workouts} = props.routine

    const [routines, setRoutines] = useRecoilState(userRoutines)

    const setParse = (set) => {
        let split = JSON.stringify(set)
        .replace('{', "").replace('}',"")
        .replace(/:/g,": ").replace(/"/g, "")
        .replace(","," ").split(" ")
        let parsed = split.map((w,i) => {
            if(i===0){
                return w.charAt(0).toUpperCase() + w.slice(1)
            } else if (i===2) {
                return w.charAt(0).toUpperCase() + w.slice(1)
            } else {
                return w
            }
        })
        return parsed.join(" ")
    }

    const handleDelete = () => {

        const array = routines.filter(r => r.id !== props.routine.id)
        setRoutines(array)
        fetch(`${API}/routines/${props.routine.id}`, {
            method: "DELETE"
        })
    }

    return(
        <div className="routine-card">
            <div className="routine-card-name">{name.toUpperCase()}
            </div>
            <div className="routine-card-workout-container">
                {workouts.map((w,i) => 
                    <div key={i} className="routine-card-workout" >
                        <div className="routine-card-workout-name">
                            {w.name}
                        </div>
                        {w.sets.map((s,i) => 
                            <div key={i} className="routine-card-sets">
                                {setParse(s)}
                            </div>
                        )}
                    </div>    
                )}
            </div>
            <div onClick={handleDelete} className="routine-card-delete">Delete</div>
        </div>
    )

}