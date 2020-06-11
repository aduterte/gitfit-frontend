import React, { useState } from "react"
import { selectedExeForWorkout } from "../Atoms/Atoms"
import { useRecoilState } from "recoil"

export default function CreateWorkoutForm(props){

    const [type, setType] = useState(null),
        [repWeightField, setRepWeightField] = useState([{ reps: 0, weight: 0 }]),
        [resistField, setResistField] = useState([{ reps: 0, resistance: ""}]),
        [durationField, setDurationField] = useState([{ minutes: 0, seconds: 0 }]),
        [selected, setSelected] = useRecoilState(selectedExeForWorkout)

  
    const handleTypeChange = (e) => {
        setType(e.target.value)
        const array = [...selected]
        array[props.index] = {...array[props.index], type_name: e.target.value}
        setSelected(array)
    }

    const handleRepWeight = (i,e) => {
        const array = [...selected]
        array[props.index] = {...array[props.index], sets: [...repWeightField]}
        if (e.target.name === `reps${i}`){
            array[props.index].sets[i] = {...array[props.index].sets[i], reps: e.target.value}
        } else {
            array[props.index].sets[i] = {...array[props.index].sets[i], weight: e.target.value}
        }
        setRepWeightField(array[props.index].sets)
        setSelected(array)
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
        const array = [...selected]
        array[props.index] = {...array[props.index], sets: [...resistField]}
        if (e.target.name === `reps${i}`){ 
            array[props.index].sets[i] = {...array[props.index].sets[i], reps: e.target.value}
        } else {
            array[props.index].sets[i] = {...array[props.index].sets[i], resistance: e.target.value}
        }
        setResistField(array[props.index].sets)
        setSelected(array)
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
        const array = [...selected]
        array[props.index] = {...array[props.index], sets: [...durationField]}
        if (e.target.name === `minutes${i}`){
            array[props.index].sets[i] = {...array[props.index].sets[i], minutes: e.target.value}
        } else {
            array[props.index].sets[i] = {...array[props.index].sets[i], seconds: e.target.value}
        }
        setDurationField(array[props.index].sets)
        setSelected(array)
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

   
    return (
        <div>
            <select className="routine-form-select" onChange={handleTypeChange}>
                <option>Select Type</option>
                <option value="weights">Weights</option>
                <option value="resistance">Resistance</option>
                <option value="time">Time</option>
            </select>
            {/* {type && <input type="number" value={setsCount} onChange={handleSetsCountsChange} min="0" max="10"/>} */}
            {type === "weights" && 
            repWeightField.map((r,i) => 
            <div key={i} className="routine-form-input-div">
                <div>
                    Reps: <input className="routine-form-input" type="number" min="0" value={r.reps} name={`reps${i}`} onChange={event => handleRepWeight(i, event)}/> 
                </div>
                <div>
                    &nbsp; Weight: <input className="routine-form-input" type="number" min="0" step="0.5" value={r.weight}  name={`weight${i}`} onChange={event =>handleRepWeight(i, event)}/> 
                </div>
                {i > 0 && <div className="routine-form-minus" onClick={()=>removeRepWeightField(i)}>-</div>}
                {+i === repWeightField.length - 1 && <div className="routine-form-plus" onClick={addRepWeightField}>+</div>}
            </div>)
            }
            {type === "resistance" && 
            resistField.map((r,i) => 
            <div key={i} className="routine-form-input-div">
                <div>
                    Reps: <input className="routine-form-input" type="number" min="0" value={r.reps} name={`reps${i}`} onChange={event => handleResist(i, event)}/> 
                </div>
                <div>
                    &nbsp; Resistance: <input className="routine-form-input-long" type="text" value={r.resistance}  name={`resistance${i}`} onChange={event =>handleResist(i, event)}/> 
                </div>
                {+i > 0 && <div className="routine-form-minus" onClick={()=>removeResistField(i)}>-</div>}
                {+i === resistField.length -1 && <div className="routine-form-plus" onClick={addResistField}>+</div>}
            </div>)
            }
            {type === "time" && 
            durationField.map((r,i) => 
            <div key={i} className="routine-form-input-div">
                <div>
                    Minutes: <input className="routine-form-input" type="number" min="0" value={r.minutes} name={`minutes${i}`} onChange={event => handleDuration(i, event)}/> 
                </div>
                <div>
                    &nbsp; Seconds: <input className="routine-form-input" type="text" value={r.seconds}  name={`seconds${i}`} onChange={event =>handleDuration(i, event)}/> 
                </div>
                {i > 0 && <div className="routine-form-minus" onClick={()=>removeDurationField(i)}>-</div>}
                {+i === durationField.length - 1 && <div className="routine-form-plus" onClick={addDurationField}>+</div>}
            </div>)
            }
        </div>
    )
}