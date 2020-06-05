import React from "react"
import { selectedExeForWorkout } from "../Atoms/Atoms"
import { useRecoilState } from "recoil"
import CreateWorkoutForm from "../Components/CreateWorkoutForm"

export default function CreateWorkout(){
    const [selected, setSelected] = useRecoilState(selectedExeForWorkout)
    return (
        <div>
            {selected.name} {selected.name && <span onClick={() => setSelected({})}> x </span>}
            {selected.name && <CreateWorkoutForm exe={selected}/>}
        </div>
    )
}