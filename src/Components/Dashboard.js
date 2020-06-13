import React, {  useState } from "react"
import { Line } from "react-chartjs-2"

export default function Dashboard() {

    const [data, setData] = useState({
        labels: ["1", "a", "3","4"]
    })

    
    return (
        <div className="dashboard">
                    stuff
                    why wont css update
            <div className="line-chart">
                <Line data={data}/>
            </div>
                    
        </div>
    )
}