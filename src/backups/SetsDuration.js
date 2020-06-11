import React from "react"

export default function SetsDuration (props) {
    return (
        <div>
            Minutes: {props.set.minutes} Seconds: {props.set.seconds}
        </div>
    )
}