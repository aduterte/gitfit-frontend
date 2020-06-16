import React, {useEffect, useState} from "react"
import {userAtom, userFollowing} from "../Atoms/Atoms"
import {useRecoilValue, useRecoilState} from "recoil"
import { API } from "../constants/index"
import Post from "../Components/Post"

export default function ProfileShowContainer(props){

    const [posts, setPosts] = useState(null),
        [user, setUser] = useState(null),
        currentUser = useRecoilValue(userAtom),
        [following, setFollowing] = useRecoilState(userFollowing)
    

    useEffect(()=>{
        fetch(`${API}/users/${props.user}`)
        .then(resp => resp.json())
        .then(data => {
            setUser(data)
            if(data.posts.length > 0){
            const sorted = [...data.posts.sort((a,b) => {
                if(a.created_at <b.created_at){return 1 }
                else if (a.created_at > b.created_at){return -1 }
                else {return 0}
            })]
            setPosts(sorted)
            }
        })
    },[setPosts])

    const totalActivities = () => {
       return posts ? posts.filter(p => !!p.routine).length : null
    }
    const isFollowed = () => {
        if(!!following){
            if(following.find( f => f.id === user.id)){
                return true
            } else {
                return false
            }
        }
    }
    const followUser = () => {
        fetch(`${API}/friends`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({follow_id: user.id, follower_id: currentUser.id})
        }).then(resp => resp.json())
        .then(data => {
            const array =[...following, data]
            setFollowing(array)
        })
    }

    const unfollowUser = () => {
        fetch(`${API}/unfollow`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({follow_id: user.id, follower_id: currentUser.id})
        }).then(resp => resp.json())
        .then(data => {
            const array = following.filter(f => f.id !== user.id)
            setFollowing(array)
        })
    }
    return (
        <>
        {user && 
        <div className="show-profile-container">
            
            {user.avatar ? <div className="profile-picture" style={{backgroundImage: `url(${user.avatar})`}}/> : <div className="profile-picture" style={{backgroundImage: `url(https://pcafalcons.com/wp-content/uploads/2019/08/no-profile-picture-icon-female-0-e1564976045606.jpg)`}}/>}
            {user.name}
            {isFollowed() ? <div onClick={unfollowUser}>Unfollow</div>:<div onClick={followUser}>Follow</div> }
            Activities: {totalActivities()}
            <div>
                Followers: {user.followers.length}
            </div>
            <div>
                Following: {user.followed.length}
            </div>
            <div>
                {posts && posts.map((post, index) => <Post key={post.id} post={post} index={index}/>)}
            </div>
        </div>
        }
        </>
    )
}