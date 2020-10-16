import React, {useState} from "react"
import { userList, userFollowing, userFollowers,searchUsers } from "../Atoms/Atoms"
import { useRecoilValue, useSetRecoilState} from "recoil"
import SearchResultUser from "../Components/SearchResultUser"

export default function SeachUserModal () {

    const following = useRecoilValue(userFollowing),
        followers = useRecoilValue(userFollowers),
        [selector, setSelector] = useState("following"),
        users = useRecoilValue(userList),
        setShow = useSetRecoilState(searchUsers)

    const handleClick = () =>{
        console.log("test")
    }
    
    return (
        <div className="search-user-container">
            <div className="search-user-content">
                <div className="search-user-header">
                    <div onClick={()=>setSelector("followers")} className="search-user-filter">
                        followers
                    </div>
                    <div onClick={()=>setSelector("following")} className="search-user-filter">
                        following
                    </div>
                    <div onClick={()=>setSelector("users")} className="search-user-filter">
                        all users
                    </div>
                </div>
               
                {selector === "following" &&
                <div className="search-user-following-container">
                    {following && following.map(user => <SearchResultUser key={user.id} user={user} />)}
                </div>
                }
                {selector === "followers" &&
                <div className="search-user-followers-container">
                    {followers && followers.map(user => <SearchResultUser key={user.id} user={user} />)}
                </div>
                }
                {selector === "users" &&
                <div className="search-user-users-container">
                     <div className="search-user-search">
                    <input type="text" />
                </div>
                    {users && users.map(user => <SearchResultUser key={user.id} user={user} onClick={handleClick} />)}
                </div>
                }
            </div>
            <div className="search-close" onClick={()=>setShow(false)}>Close</div>
        </div>
    )
}