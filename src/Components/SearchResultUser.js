import React from "react"
import { Link } from "react-router-dom"
import {searchUsers } from "../Atoms/Atoms"
import {useSetRecoilState} from "recoil"

export default function SearchResultUser(props){

    const {name, id, avatar} = props.user
    const setShow = useSetRecoilState(searchUsers)

    
    
    return (
        
        
        <div className="search-result-wrapper">
            <Link to={`/profile/${id}`}>
                <div onClick={()=>setShow(false)} className="search-result-avatar" style={{backgroundImage: `url("${avatar}")`}}/>
            </Link>
            <div>
                 {name}
            </div>      
        </div>
        
       
    )

}