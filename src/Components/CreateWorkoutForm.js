import React, { useState, useEffect } from "react"

export default function CreateWorkoutForm(){

    
    
    // useEffect(()=>{
    //     const blankSet = {}
    // },[])

    const [setsCount, setSetsCount] = useState(0),
        [type, setType] = useState(null),
        [sets, setSets] = useState([]),
        [inputFields, setsInputFields] = useState([])

    const handleSetsCountsChange = (e) => { 
        setSetsCount(e.target.value)
        inputs(setsCount)
     }
    const handleTypeChange = (e) => {setType(e.target.value)}

    function inputs(setsCount){
        let blankSet = {}
        // if(type==="weights"){
        //     const 
        // } else if (type==="resistance"){
        //     const blankSet = { reps: 0, resistance: ""}
        // } else if (type==="time"){
        //     const blankSet = { duration: 0 }
        // }
        
        let i = 0,
        arr = []
        while(i < setsCount ){
            
            if(type==="weights"){
                blankSet = { reps: 0, weight: 0 }
                setSets([...sets, {blankSet}])
                arr.push(<div key={`set-${i}`}>Reps: <input type="number" placeholder="0"/> Weight: <input placeholder="0"/></div> )
                setsInputFields(arr)
            }
            ++i
    }
    console.log(setsCount, type, sets)
    }
    
    
    return (
        <div>
            <form>
                <select onChange={handleTypeChange}>
                    <option>Select</option>
                    <option value="weights">Weights</option>
                    <option value="resistance">Resistance</option>
                    <option value="time">Time</option>
                </select>
                {type && <input type="number" value={setsCount} onChange={handleSetsCountsChange} min="0" max="10"/>}
                {inputFields.map(i => i)}
            </form>
        </div>
    )
}