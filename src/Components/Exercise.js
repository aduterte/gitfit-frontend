import React, {useState} from "react"
import {selectedExeForWorkout} from "../Atoms/Atoms"
import { useRecoilState } from "recoil"
import ExerciseModal from "../Components/ExerciseModal"

export default function Exercise(props){

    const style = {backgroundImage: `url('${props.exe.image1}')`},
        [selected, setSelected] = useRecoilState(selectedExeForWorkout),
        [showModal, setShowModal] = useState(false)

    function handleOnClick(){
        setSelected([...selected, {name: props.exe.name, sets:[], type_name: "", exercise_id: props.exe.id}])    
    }

    function toggleModal(){
        setShowModal(!showModal)
    }
    // console.log(props.exe)
    return(
        <div className="exercise-card">
            <div className="exercise-card-background-image" style={style}>
                <div className="exercise-card-content-container">
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
                    <div className="exercise-card-bottom">
                        <div onClick={()=>setShowModal(!showModal)}>
                            view details
                        </div>
                        <div onClick={handleOnClick}> 
                            add to routine
                        </div>
                        
                </div>
            </div>
        </div>  
        <div className="exercise-modal" style={showModal ? {display: "flex"} :{ display: "none"}}>
                            {showModal && <ExerciseModal func={toggleModal} exe={props.exe}/>}
                        </div>
        </div>
    )
}