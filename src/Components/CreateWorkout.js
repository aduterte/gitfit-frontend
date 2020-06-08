import React,{useState} from "react"
import { selectedExeForWorkout, userAtom } from "../Atoms/Atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import CreateWorkoutInput from "../Components/CreateWorkoutForm"
import {URL} from "../constants/index"

export default function CreateWorkout(){
    const [selected, setSelected] = useRecoilState(selectedExeForWorkout),
        [routineName, setRoutineName] = useState(""),
        user = useRecoilValue(userAtom)

    const handleRemove = (i) => {
        const exercises = [...selected]
        exercises.splice(i, 1)
        setSelected(exercises)
    }

    const handleRoutineName = (e) => {
        setRoutineName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user.id, selected, routineName)
        const obj = {
            user_id: user.id,
            name: routineName,
            exercises: selected
        }
        // setExercise({})
        fetch(`${URL}/routines`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(routine => {
            selected.forEach(exe => {
                let workout = {
                    routine_id: routine.id,
                    exercise_id: exe.exercise_id,
                    sets: exe.sets,
                    type_name: exe.type_name,
                    name: exe.name
                }
                fetch(`${URL}/workouts`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(workout)
            }).then(setSelected([]))
            // selected.forEach()
        })
  
        
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" value={routineName} onChange={handleRoutineName}/>
            {selected.map((e, i) => 
                <div key={`list-${i}`}>
                {e.name} <span onClick={() => handleRemove(i)}> x </span>
                <CreateWorkoutInput index={i}/>
                </div>
            )}
            <input type="submit" value="Create Routine"/>
            </form> 
        </div>
    )
}