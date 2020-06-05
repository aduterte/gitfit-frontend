import React, {useState} from "react"
import { userAtom, userWorkouts } from "../Atoms/Atoms"
import { useRecoilValue } from "recoil"
import WorkoutCard from "../Components/WorkoutCard"
import {URL} from "../constants/index"



export default function CreateRoutineContainer(){

    const workouts = useRecoilValue(userWorkouts),
        user = useRecoilValue(userAtom),
        [selWorkouts, setSelWorkouts] = useState([]),
        [routineName, setRoutineName] = useState("")

    const handleAddWorkout = (wk) => {
        setSelWorkouts([...selWorkouts, wk])
    }

    const newRoutineChange = (e) => {
        setRoutineName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // debugger
        const obj = {
            name: routineName,
            user_id: user.id
        }
        
        fetch(`${URL}/routines`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(routine => {
            selWorkouts.forEach( workout => {
                fetch(`${URL}/lists`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({workout_id: workout.id, routine_id: routine.id})
                }).then(resp => resp.json())
                .then(data => {
                    setRoutineName("")
                    setSelWorkouts([])
                })
            })
        })
    }
    return (
        <div>
            <div>
                <h3>Create Routine</h3>
                <form onSubmit={handleSubmit}>
                    <div><input value={routineName} placeholder="Enter Routine Name" onChange={newRoutineChange}/></div>
                    
                    {selWorkouts.map((sw)=> <div>{sw.name}</div>)}
                    <div><input type="submit" value="New Routine"/></div>
                </form>
                
            </div>
            <div>
                {workouts.map(wk => <WorkoutCard wk={wk} key={wk.id} addWk={handleAddWorkout}/>)}
            </div>
            
        </div>
    )
}