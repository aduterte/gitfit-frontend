import React from "react"

export default function SetsWeight (props) {
    return(
        <div>
            Reps: {props.set.reps} Weight: {props.set.weight}
        </div>
    )
}