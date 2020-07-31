import React, {useState, useEffect} from "react"
import { userPosts, userAtom } from "../Atoms/Atoms"
import {useRecoilState, useRecoilValue} from "recoil"
import { API } from "../constants/index"
import * as timeago from "timeago.js"

export default function Post(props){
    const {content, picture, created_at, routine, id, user} = props.post,
        [isEdit, setIsEdit] = useState(false),
        [editContent, setEditContent] = useState(content),
        [posts, setPosts] = useRecoilState(userPosts),
        currentUser = useRecoilValue(userAtom),
        [likes, setLikes] = useState(null),
        [commentForm, setCommentForm] = useState(false),
        [commentContent, setCommentContent] = useState(""),
        [comments, setComments] = useState(props.post.comments)
    
    useEffect(()=>{
        setLikes(props.post.likes)
    },[setLikes])

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

    const addLike = () => {
        fetch(`${API}/likes`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({post_id: id, user_id: currentUser.id})
        }).then(resp => resp.json())
        .then(data => {
            const a = [...likes, data]
            setLikes(a)
           
        })
    }
    const likeAvatars = () => {
        if(likes.length > 3){
            const a = likes.slice(0, 3)
           
            return a
        } else {
            return likes
        }
    }

    const checkLike = () => {
        if (!!likes){
            // debugger
            if(!!likes.find(like => like.user.id === currentUser.id)){
                return true
            } else {
                return false
            }
        }
    }

    const unLike = () => {
        fetch(`${API}/unlike`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({post_id: id, user_id: currentUser.id})
        }).then(()=>{
            const a = likes.filter(like => like.user.id !== currentUser.id)
            setLikes(a)
        })
    }
    
    const handleComment = (e) => {
        setCommentContent(e.target.value)
    }

    const commentSubmit = (e) => {
        e.preventDefault()
        fetch(`${API}/comments`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({content: commentContent, post_id: id, user_id: currentUser.id})
        }).then(resp => resp.json())
        .then(data => {
            
            const a = [...comments, data]
            setComments(a)
            setCommentContent("")
            setCommentForm(!commentForm)
        })
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
                    {+user.id === +currentUser.id &&
                    <div className="post-header-hamburger">&#9776;
                        <div className="post-edit-menu">
                            <div onClick={editPost} className="post-edit-menu-edit"> edit post</div>
                            <div onClick={deletePost} className="post-edit-menu-delete"> delete post</div>

                        </div>
                    
                    </div>
                    }
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
                <div className="post-bottom-container">
                    <div className="post-like-bar">
                        <div className="post-like-bar-left">
                            <div className="post-like-avatar-wrapper">
                                {likes && likeAvatars().map((like, index)=><div className="post-like-avatar" key={index} style={{backgroundImage: `url(${like.user.avatar})`}}/>)}
                            </div>
                            <div className="post-like-counter">
                        {!!likes && likes.length > 0 ? `${likes.length} Likes`: "Be the first to like"}</div>
                        </div>
                        <div className="post-like-bar-right">
                            {checkLike() ? 
                            <div className="post-buttons" onClick={unLike}><span className="glyphicon glyphicon-thumbs-down"></span></div> :
                            <div className="post-buttons" onClick={addLike}><span className="glyphicon glyphicon-thumbs-up"></span></div>
                            }
                            <div onClick={()=>setCommentForm(!commentForm)} className="post-buttons material-icons">&#xe0b9;</div>
                        </div>
                    </div>
                    <div className="post-comments-container">
                        {commentForm && 
                        <div className="post-comments-form">
                            <div className="post-comment-avatar" style={{backgroundImage: `url(${currentUser.avatar})`}}/>
                            <form onSubmit={commentSubmit}>
                                <input className="post-comment-form-input" type="text" value={commentContent} onChange={handleComment} placeholder="Comment this post"/>
                                <button className="post-comment-form-button">Add Comment</button>
                            </form>
                        </div>}
                        {comments.map((com, i) => 
                        <div className="post-comments-comment" key={`com-${i}`}>
                            <div className="post-comment-avatar" style={{backgroundImage: `url(${com.user.avatar})`}}/>
                            <div className="post-comment-content">
                                <div className="post-comment-content-name">{com.user.name}</div>
                                <div className="post-comment-content-content">{com.content}</div>
                            </div>
                            <div className="post-comment-time">{timeago.format(Date.parse(com.created_at))}</div>
                        </div>)}
                        
                        

                    </div>
                </div>        
            
            </div> 
        </div>
    )
}