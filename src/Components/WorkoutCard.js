import React, {useState} from "react"
import { userAtom, exeAtom, userWorkouts} from "../Atoms/Atoms"
import { useRecoilValue, useRecoilState } from "recoil"
import Weights from "../Components/SetsWeight"
import Resistance from "../Components/SetsResist"
import Duration from "../Components/SetsDuration"
import { URL } from "../constants/index"

// import {willMount} from "../hooks/willMount"

export default function WorkoutCard(props){
   
    const exes = useRecoilValue(exeAtom),
    exe = exes.find(e => e.id === props.wk.exercise_id),
    [workouts, setWorkouts] = useRecoilState(userWorkouts) 
    // style = {backgroundImage: `url(${exe.image1})`}


    const {name, type_name, sets, id }= props.wk
    // style = {backgroundImage: `url(${exe.image1})`}

    const handleDelete = () => {
        fetch(`${URL}/workouts/${id}`, {
            method: "DELETE"
        }).then( () =>{
            const array = [...workouts].filter(wk => wk.id !== id)
            
            setWorkouts(array)
        })

    }       
        
    return (
        <div>
            {exe &&
            <div className="workout-card-wrapper" style = {{backgroundImage: `url(${exe.image1})`}} >
                <div className="workout-card" onClick={()=>props.addWk(props.wk, props.index)}>
                    <div>
                    {name}
                    {/* {renderSets()} */}
                    {type_name === "weights" && sets.map((set, i) => <Weights key={i} set={set} />) }
                    {type_name === "resistance" && sets.map((set, i) => <Resistance key={i} set={set} />) }
                    {type_name === "time" && sets.map((set, i) => <Duration key={i} set={set} />) }
                    </div>
                   
                </div>
                <div onClick={handleDelete}>
                    delete me
                </div>
            </div>
            }
        </div>
    )
}