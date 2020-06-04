import React from "react"
import {selectedExeForWorkout} from "../Atoms/Atoms"
import { useSetRecoilState } from "recoil"

export default function Exercise(props){

    const style = {backgroundImage: `url('${props.exe.image1}')`},
        setSelected = useSetRecoilState(selectedExeForWorkout)

    function handleOnClick(){
        setSelected(props.exe)    
    }
    
    return(
        <div className="exercise-card">
            <div className="exercise-card-background-image" style={style}>

            </div>
            <div className="exercise-card-name">
                {props.exe.name}
               
            </div>
            <div className="exercise-card-body">
                <h4>Body Parts</h4>
                <p>{props.exe.body_part.join(", ")}</p>
            </div>
            <div className="exercise-card-equipment">
                <h4>Equipment</h4>
                <p>{props.exe.equipment.join(", ")}</p>
            </div>
            <div className="exercise-card-difficulty">
                <h4>Difficulty</h4>
                <p>{props.exe.difficulty}</p>
            </div>
            <div>
                <div>
                    view details
                </div>
                <div onClick={handleOnClick}> 
                    add to workout
                </div>
            </div>
        </div>
    )
}