import React, { useState } from "react"
import { userAtom, selectedExeForWorkout, userWorkouts } from "../Atoms/Atoms"
import { useRecoilState } from "recoil"
import { URL } from "../constants/index"
import { useSetRecoilState } from "recoil/dist/recoil.production"


export default function CreateWorkoutForm(props){

    const [type, setType] = useState(null),
        [repWeightField, setRepWeightField] = useState([{ reps: 0, weight: 0 }]),
        [resistField, setResistField] = useState([{ reps: 0, resistance: ""}]),
        [durationField, setDurationField] = useState([{ minutes: 0, seconds: 0 }]),
        [user, setUser ]= useRecoilState(userAtom),
        setExercise = useSetRecoilState(selectedExeForWorkout),
        [workouts, setWorkouts] = useRecoilState(userWorkouts)

  
    const handleTypeChange = (e) => {setType(e.target.value)}

    const handleRepWeight = (i,e) => {
        const values = [...repWeightField]
        if (e.target.name === `reps${i}`){
            values[i].reps = e.target.value
        } else {
            values[i].weight = e.target.value
        }
        setRepWeightField(values)
    }
    
    const addRepWeightField = () => {
        const values = [...repWeightField]
        values.push({ reps: 0, weight: 0 })
        setRepWeightField(values)
    }

    const removeRepWeightField = (i) => {
        const values = [...repWeightField]
        values.splice(i,1)
        setRepWeightField(values)
    }

    const handleResist = (i,e) => {
        const values = [...resistField]
        if (e.target.name === `reps${i}`){
            values[i].reps = e.target.value
        } else {
            values[i].resistance = e.target.value
        }
        setResistField(values)
    }
    
    const addResistField = () => {
        const values = [...resistField]
        values.push({ reps: 0, resistance: "" })
        setResistField(values)
    }

    const removeResistField = (i) => {
        const values = [...resistField]
        values.splice(i,1)
        setResistField(values)
    }

    const handleDuration = (i,e) => {
        const values = [...durationField]
        if (e.target.name === `minutes${i}`){
            values[i].minutes = e.target.value
        } else {
            values[i].seconds = e.target.value
        }
        setDurationField(values)
    }
    
    const addDurationField = () => {
        const values = [...durationField]
        values.push({ minutes: 0, seconds: 0 })
        setDurationField(values)
    }

    const removeDurationField = (i) => {
        const values = [...durationField]
        values.splice(i,1)
        setDurationField(values)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let sets = []
        if(type==="weights"){
            sets = repWeightField
        } else if (type==="resistance"){
            sets = resistField
        } else if (type==="time"){
            sets = durationField
        }
        const obj = {
            user_id: user.id,
            exercise_id: props.exe.id,
            sets: sets,
            type_name: type,
            name: props.exe.name
        }

        fetch(`${URL}/workouts`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(data => setWorkouts([...workouts, data]))
        
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select onChange={handleTypeChange}>
                    <option>Select</option>
                    <option value="weights">Weights</option>
                    <option value="resistance">Resistance</option>
                    <option value="time">Time</option>
                </select>
                {/* {type && <input type="number" value={setsCount} onChange={handleSetsCountsChange} min="0" max="10"/>} */}
                {type === "weights" && 
                repWeightField.map((r,i) => 
                <div key={i}>Reps: <input type="number" min="0" value={r.reps} name={`reps${i}`} onChange={event => handleRepWeight(i, event)}/> Weight: <input type="number" min="0" step="0.5" value={r.weight}  name={`weight${i}`} onChange={event =>handleRepWeight(i, event)}/> 
                {i > 0 && <span onClick={()=>removeRepWeightField(i)}>-</span>}
                {+i === repWeightField.length - 1 && <span onClick={addRepWeightField}>+</span>}</div>)
                }
                {type === "resistance" && 
                resistField.map((r,i) => 
                <div key={i}>Reps: <input type="number" min="0" value={r.reps} name={`reps${i}`} onChange={event => handleResist(i, event)}/> Weight: <input type="text" value={r.resistance}  name={`resistance${i}`} onChange={event =>handleResist(i, event)}/> {+i > 0 && <span onClick={()=>removeResistField(i)}>-</span>}{+i === resistField.length -1 && <span onClick={addResistField}>+</span>}</div>)
                }
                {type === "time" && 
                durationField.map((r,i) => 
                <div key={i}>Minutes: <input type="number" min="0" value={r.minutes} name={`minutes${i}`} onChange={event => handleDuration(i, event)}/> Seconds: <input type="text" value={r.seconds}  name={`seconds${i}`} onChange={event =>handleDuration(i, event)}/> 
                {i > 0 && <span onClick={()=>removeDurationField(i)}>-</span>}
                {+i === durationField.length - 1 && <span onClick={addDurationField}>+</span>}</div>)
                }
                <input type="submit"/>
            </form>
        </div>
    )
}