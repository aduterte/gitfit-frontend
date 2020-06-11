import React from "react"
import {userRoutines} from "../Atoms/Atoms"
import {useRecoilValue} from "recoil"
import RoutineCard from "../Components/RoutineCard"

export default function RoutineContainer(){

    const routines = useRecoilValue(userRoutines)
    
    return(
        <div id="routine-container">
            {routines && routines.map(r => <RoutineCard key={r.id} routine={r}/>)}
        </div>
    )
}