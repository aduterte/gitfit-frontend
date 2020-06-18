import React,{useState} from "react"
import { selectedExeForWorkout, userAtom, userRoutines, sessionAchievements, userAchievements } from "../Atoms/Atoms"
import { useRecoilState, useRecoilValue } from "recoil"
import CreateWorkoutInput from "../Components/CreateWorkoutForm"
import {API} from "../constants/index"

export default function CreateWorkout(){
    const [selected, setSelected] = useRecoilState(selectedExeForWorkout),
        [routineName, setRoutineName] = useState(""),
        user = useRecoilValue(userAtom),
        [myRoutines, setMyRoutines] = useRecoilState(userRoutines),
        [tempWorkouts, setTempWorkout] = useState([]),
        [achievements, setAchievements] = useRecoilState(sessionAchievements),
        [userAch, setUserAch] = useRecoilState(userAchievements)

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
        // console.log(user.id, selected, routineName)
        const obj = {
            user_id: user.id,
            name: routineName,
            exercises: selected
        }
        // setExercise({})
        fetch(`${API}/routines`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        })
        .then(resp => resp.json())
        .then(routine => {
            
            selected.forEach(exe => {
                let workout = {
                    routine_id: routine.id,
                    exercise_id: exe.exercise_id,
                    sets: exe.sets,
                    type_name: exe.type_name,
                    name: exe.name
                }
                fetch(`${API}/workouts`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(workout)
                })
                .then(resp => resp.json())
                // .then(workout => {
                    // console.log(workout)
                    // debugger
                    // workArray = [...workArray, workout]
                    // setTempWorkout([...tempWorkouts, workout])

                
                
                // })
            }) // end of for each
            const array = [...myRoutines, {...routine, workouts: tempWorkouts}]
            // const array = [...myRoutines, {...routine, workouts: workArray}]
            console.log(array)
            // array = [...myRoutines, {...tempRoutine, weights: tempWorkouts}]
            
            setMyRoutines(array)
            // console.log(tempRoutine)
        })
        e.target.reset()
        setRoutineName("")
        setSelected([])

        if(!userAch.find( ach => ach.code === "routine")){
            fetch(`${API}/unlocks`, {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({user_id: user.id, achievement_code: "routine"})
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
        <div className="routine-form">
            <form onSubmit={handleSubmit}>
                <div>
                    {selected.length > 0 && <input className="routine-form-name-input" name="name" value={routineName} onChange={handleRoutineName} placeholder="Enter Routine Name" required/>}
                </div>
                <div className="routine-form-workout-container">
                    {selected.map((e, i) => 
                    <div className="routine-form-each-ex" key={`list-${i}`}>
                        <div className="routine-form-ex">
                            <div className="routine-form-ex-name">
                                {e.name} 
                            </div> 
                            <div style={{display: "flex", justifyContent: "flex-start", alignContent: "center"}}>
                                <div onClick={() => handleRemove(i)} className="remove-button"> 
                                &#10006; 
                                </div>
                                <div className="duplicate-button material-icons" onClick={()=> setSelected([...selected, e])}>
                                &#xe14d;
                                </div>
                            </div>
                        </div>
                        <CreateWorkoutInput index={i}/>
                    </div>
                    )}
                </div>
                <div>
                    <br/>
                    {selected.length < 1 ? <div>Select an Exercise to Create a Routine</div>:
                    <input className="routine-form-submit-button" type="submit" value="Create Routine"/>
                    }
                </div>
            </form> 
        </div>
    )
}