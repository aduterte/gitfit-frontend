import React from "react"
import { userAtom, exeAtom} from "../Atoms/Atoms"
import { useRecoilValue } from "recoil"
import Weights from "../Components/SetsWeight"
import Resistance from "../Components/SetsResist"
import Duration from "../Components/SetsDuration"

export default function WorkoutCard(props){

    // const exes = useRecoilValue(exeAtom),
    //     exe = exes.find(e => e.id === props.wk.exercise_id)
    const {name, type_name, sets }= props.wk
    
 
    return (
        <div onClick={()=>props.addWk(props.wk)}>
            {name}
            {/* {renderSets()} */}
            {type_name === "weights" && sets.map((set, i) => <Weights key={i} set={set} />) }
            {type_name === "resistance" && sets.map((set, i) => <Resistance key={i} set={set} />) }
            {type_name === "time" && sets.map((set, i) => <Duration key={i} set={set} />) }
        </div>
    )
}