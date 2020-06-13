import React, {useState, useEffect} from "react"
import { userPosts, userRoutines } from "../Atoms/Atoms"
import {useRecoilState} from "recoil"
import { API } from "../constants/index"
import * as timeago from "timeago.js"

export default function Post(props){
    const {content, picture, created_at, routine, id, user} = props.post,
        [isEdit, setIsEdit] = useState(false),
        [editContent, setEditContent] = useState(content),
        [posts, setPosts] = useRecoilState(userPosts)
    
    
    const setParse = (set) => {
        let split = JSON.stringify(set)
        .replace('{', "").replace('}',"")
        .replace(/:/g,": ").replace(/"/g, "")
        .replace(","," ").split(" ")
        let parsed = split.map((w,i) => {
            if(i===0){
                return w.charAt(0).toUpperCase() + w.slice(1)
            } else if (i===2) {
                return w.charAt(0).toUpperCase() + w.slice(1)
            } else {
                return w
            }
        })
        return parsed.join(" ")
    }

    const editPost = () => {
        setIsEdit(!isEdit)
    }
    const deletePost = () => {
        fetch(`${API}/posts/${id}`, {
            method:  "DELETE"
        })

        const updatedPosts = posts.filter(p => p.id !== id) 
        setPosts(updatedPosts)
    }

    const handleEdit = (e) => {
        setEditContent(e.target.value)
    }

    const submitEdit =(e)=>{
        e.preventDefault()
        const obj = {content: editContent}
        fetch(`${API}/posts/${id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(data => {
            const array = [...posts]
            array.splice(props.index, 1, data)
            setPosts(array)
            setIsEdit(!isEdit)
        })
        e.target.reset()
    }
    return(
        <div className="post">
            <div className="post-header">
                <div className="post-header-left">
                    <div className="post-user-image" style={{backgroundImage: `url(${user.avatar})`}}>
                        
                    </div>
                    <div>
                        <div className="post-user-name">
                            {user.name}
                        </div>
                        <div className="post-time">
                            {timeago.format(Date.parse(created_at))}
                        </div>
                    </div>
                </div>
                <div className="post-header-right">
                    
                    <div className="post-header-hamburger">&#9776;
                    <div className="post-edit-menu">
                        <div onClick={editPost} className="post-edit-menu-edit"> edit post</div>
                        <div onClick={deletePost} className="post-edit-menu-delete"> delete post</div>

                    </div>
                    
                    </div>
                </div>
            </div>
            <div>   
                {routine && 
                <div className="post-activity" >
                    <div className="activity-symbol">
                        <span className="fas">&#xf44b;</span>
                    </div>
                   
                    <div className="post-routine">
                        <div>
                            {routine.name}
                        </div>
                        <div>
                            {routine.workouts.map((wk,i) => 
                            <div key={i} className="post-routine-info">
                                <div className="post-routine-ex-name">{wk.name}</div>
                                {/* {wk.sets.map((s,ix) => 
                                <div key={ix} className="post-routine-sets">
                                    {setParse(s)}
                                </div>
                                )}  */}
                            </div>    
                            )}
                        </div>
                    </div>
                </div>
                }
                <div className="post-content">
                    {!isEdit ? content : 
                    <form className="post-edit-form" onSubmit={submitEdit}>
                        <textarea className="post-edit-content" onChange={handleEdit} name="content" value={editContent}/>    
                        <button className="post-edit-form-button">edit</button>
                    </form>}
                    
                    
                </div>
                <div>
                    {picture && <img className="post-image" src={picture} alt="post image"/>}
                </div>
            
            
            </div> 
        </div>
    )
}