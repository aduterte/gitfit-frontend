import React from "react"
import { exeAtom, searchExe } from "../Atoms/Atoms"
import {useRecoilValue, useRecoilState } from "recoil"
import Exercise from "../Components/Exercise"
import CreateWorkout from "../Components/CreateWorkout"

export default function CreateWorkoutContainer(){

    const exercises = useRecoilValue(exeAtom),
        [search, setSearch] = useRecoilState(searchExe)

    function onChange(e){
        setSearch(e.target.value)
    }

    const exeSearchResults = () => {
        const filtered = exercises.filter(exe => exe.name.toLowerCase().includes(search))
        return filtered
    }
   
   
    return (
        <div id="create-workout-container">
            <div className="create-workout-column">
                <h1>Create a Workout</h1>
                <CreateWorkout />
            </div>
            <div className="create-workout-right">
                <div className="exercise-selection-search">
                    <input type="text" value={search} placeholder="Search..." onChange={onChange}/>
                </div>
                <div id="exercise-selection">
                    {exeSearchResults().map(exe => <Exercise key={exe.id} exe={exe}/>)}
                </div>
            </div>
        </div>
    )
}