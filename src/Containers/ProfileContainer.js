import React, {useEffect, useState, createRef} from "react"
import { userAtom, userPosts } from "../Atoms/Atoms"
import { useRecoilValue, useRecoilState } from "recoil"
import {Link} from "react-router-dom"
import CreatePost from "../Components/CreatePost"
import { API } from "../constants/index"
import Post from "../Components/Post"
import EditProfile from "../Components/EditProfile"
import Dashboard from "../Components/Dashboard"

export default function ProfileContainer(props){

    const user = useRecoilValue(userAtom),  
        [posts, setPosts] = useRecoilState(userPosts),
        [newPost, setNewPost] = useState(false),
        [editProfile, setEditProfile] = useState(false),
        profile = createRef()
        
    useEffect(()=>{
        fetch(`${API}/users/${user.id}`)
        .then(resp => resp.json())
        .then(data => {
            
            if(data.posts.length > 0){
            const sorted = [...data.posts.sort((a,b) => {
                if(a.created_at <b.created_at){return 1 }
                else if (a.created_at > b.created_at){return -1 }
                else {return 0}
                // Date.parse(b) - Date.parse(a)
            })]
            // console.log(sorted)
            setPosts(sorted)
            }
            // console.log(data)
        })
    },[setPosts])

    const togglePostModal = () => {
        setNewPost(!newPost)
    }
    
    const latestActivity = () => {
        let latest = posts.find(p => !!p.routine)
        return latest
    }

    const totalActivities = () => {
        if(posts){
        let total = posts.filter(p => !!p.routine)
        return total.length
        }
    }

    const toggleEdit = () => {
        setEditProfile(!editProfile)
        // profile.current.classList.toggle('is-toggle')
    }
    return (
        <div id="profile-container">
            <div id="profile-info">
                <div className="profile-wallpaper">
                    <div className="profile-picture" style={{backgroundImage: `url(${user.avatar})`}}/>
                    <h2>{user.name.split(" ")[0]}<br/>{user.name.split(" ")[1] === undefined ? null : user.name.split(" ")[1]}</h2>
                </div>
                <div className="profile-info-bottom">
                    <div className="profile-latest-activity">
                        <div style={{fontWeight: "bold"}}>
                            Activities Completed
                        </div>
                        <br/>
                        <div>
                            {totalActivities()}
                        </div>
                        <br/>
                        <div style={{fontWeight: "bold"}}>Latest Activity</div>
                        <br/>
                        {posts && 
                        <div>
                            {latestActivity() && <div> <span className="fas">&#xf44b; &nbsp;</span>{latestActivity().routine.name}</div>}
                            {latestActivity() && <div>on  {Date(latestActivity().created_at).substring(0,15)}</div>}
                        </div>}
                    </div>
                    <br/>
                <div className="profile-button" onClick={()=>setNewPost(!newPost)}>New Post</div>
                <h4>Tools</h4>
                
                <Link to="/create-workout"><div className="profile-button">Create a Routine</div></Link>
                <Link to="/routines"><div className="profile-button">My Routines</div></Link>
                <div onClick={toggleEdit} className="profile-button">Edit Profile</div>
                </div>
            </div>
            <div id="profile-main-container">
                {!!posts && <div id="profile-main">
                
                    <div className="post-selector">My Posts</div>
                    <div>
                        {posts && posts.map((post, index) => <Post key={post.id} post={post} index={index}/>)}
                    </div>
                </div>}
                {editProfile &&
                <div ref={profile} className="profile-edit">
                    <EditProfile />
                </div>    
                }
                <Dashboard />
            </div>
            {newPost &&
                    <div className="post-modal">
                        {/* {begin create post modal} */}
                        <div >
                        <CreatePost func={togglePostModal}/>
                        
                        </div>
                        <div onClick={()=>setNewPost(!newPost)} style={{color: "white"}}> CLOSE </div>
                    {/* {end create post modal} */}
                    </div>
                    }
        </div>
    )
}