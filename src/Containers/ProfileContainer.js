import React, {useEffect, useState, createRef} from "react"
import { searchUsers, userAtom, userPosts, userFollowers, userFollowing } from "../Atoms/Atoms"
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil"
import {Link} from "react-router-dom"
import CreatePost from "../Components/CreatePost"
import { API } from "../constants/index"
import Post from "../Components/Post"
import Dashboard from "../Components/Dashboard"

export default function ProfileContainer(props){

    const user = useRecoilValue(userAtom),  
        [posts, setPosts] = useRecoilState(userPosts),
        [newPost, setNewPost] = useState(false),
        followers = useRecoilValue(userFollowers),
        following = useRecoilValue(userFollowing),
        setShowSearch = useSetRecoilState(searchUsers)

        
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
        // console.log(latest)
        return latest
    }

    const latestDate = () => {
        let latestDate = latestActivity().created_at
        let d = new Date(latestDate)
        
        return d.toString()
        
    }

    const totalActivities = () => {
        if(posts){
        let total = posts.filter(p => !!p.routine)
        return total.length
        }
    }

    // const toggleEdit = () => {
    //     setEditProfile(!editProfile)
    //     // profile.current.classList.toggle('is-toggle')
    // }
    return (
        <div id="profile-container">
            <div id="profile-info">
                <div className="profile-wallpaper">
                    <div className="profile-picture" style={{backgroundImage: `url(${user.avatar})`}}/>
                    <h2>{user.name.split(" ")[0]}<br/>{user.name.split(" ")[1] === undefined ? null : user.name.split(" ")[1]}</h2>
                </div>
                <div  className="dashboard-followers-container">
                    <div className="dashboard-followers">
                        <h4>Followers</h4>
                        <div>{followers && followers.length}</div>  
                        
                    </div>
                    <div className="dashboard-following">
                        <h4>Following</h4>
                        <div onClick={()=>setShowSearch(true)}>{following && following.length}</div>  
                    </div>

                </div>
                <div className="profile-info-bottom">
                    <div className="profile-latest-activity">
                        <div style={{fontWeight: "bold"}}>
                            Activities Completed
                        </div>
                        <br/>
                        <div className="activity-count">
                            {totalActivities()}
                        </div>
                        <br/>
                        <div style={{fontWeight: "bold"}}>Latest Activity</div>
                        <br/>
                        {posts && 
                        <div>
                            {latestActivity() && <div> <span className="fas">&#xf44b; &nbsp;</span>{latestActivity().routine.name}</div>}
                            {latestActivity() && <div>on  {latestDate().substring(0,15)}</div>}
                        </div>}
                    </div>
                    <br/>
                  
                </div>
            </div>
            <div id="profile-main-container">
              
                <div id="profile-main">
                    < div className="profile-post-header">
                        <div className="post-selector">My Posts</div>
                        <div onClick={()=>setNewPost(!newPost)}className="new-post-button">New Post</div>
                    </div>
                    <div className="profile-post-container">       
                        {!!posts && <div>
                            {posts && posts.map((post, index) => <Post key={post.id} post={post} index={index}/>)}
                        </div>}
                    </div> 
                </div>
                {/* {editProfile &&
                <div ref={profile} className="profile-edit">
                    <EditProfile />
                </div>    
                } */}
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