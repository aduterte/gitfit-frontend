import React, {useState} from "react"
import {userAtom, editProfileAtom} from "../Atoms/Atoms"
import { useRecoilState, useSetRecoilState} from "recoil"
import { API } from "../constants/index"
import Footer from "../Components/Footer"

export default function EditProfile(){
    const [user, setUser] = useRecoilState(userAtom),
        setEditProfile = useSetRecoilState(editProfileAtom),
        [userInfo, setUserInfo] = useState({
            firstName: user.name.split(" ")[0], 
            lastName: user.name.split(" ")[1], 
            avatar: user.avatar, 
            goal_weight: user.goal_weight, 
            zipcode: user.zipcode, 
            gender: user.gender, 
            height: user.height, 
            trainer: user.trainer,
            age: user.age})



    const handleOnChange = (e) => {
        const {name, value} = e.target
        setUserInfo({...userInfo, [name]: value})
        
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        
        const obj = {
            name: `${userInfo.firstName} ${userInfo.lastName}`,
            avatar: userInfo.avatar,
            goal_weight: userInfo.goal_weight,
            zipcode: userInfo.zipcode,
            gender: userInfo.gender,
            height: userInfo.height,
            trainer: userInfo.trainer,
            age: userInfo.age
        }

        fetch(`${API}/users/${user.id}`, {
            method: "PATCH",
            headers: {"Content-Type":"application/json"},
            body:  JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(data => setUser(data))
        console.log(obj)
    }
    
    return (
        <div className="edit-profile">
            <div className="edit-profile-left">
                <img className="edit-profile-logo" src="/images/blocklogogray.png" alt="git fit logo"/>
            </div>
            <div className="edit-profile-right">
                <div className="edit-profile-close">
                    <div onClick={()=>setEditProfile(false)} className="edit-profile-close-button">x</div>
                </div> 
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <div>
                        <h2>Edit Profile</h2>
                        <input className="edit-profile-name" onChange={handleOnChange} name="firstName" value={userInfo.firstName} placeholder="First Name"/>
                        <input className="edit-profile-name" onChange={handleOnChange} name="lastName" value={userInfo.lastName} placeholder="Last Name (Optional)"/>
                    </div>
                    <div>
                        Profile Image Url:
                        <input className="edit-profile-image" onChange={handleOnChange} name="avatar" value={userInfo.avatar} placeholder="Enter image url"/>
                    </div>
                    <div>
                        Goal Weight: <input className="edit-profile-goal"onChange={handleOnChange} name="goal_weight" value={userInfo.goal_weight} placeholder="0"/> lbs
                    </div>
                    <div>
                        Height: <input className="edit-profile-height"onChange={handleOnChange} name="height"value={userInfo.height} placeholder="0"/> inches
                    </div>
                    <div>
                        Age: <input className="edit-profile-age"onChange={handleOnChange} type="number" name="age" value={userInfo.age} placeholder="18"/>
                    </div>
                    <div>
                        Gender: <input className="edit-profile-gender"onChange={handleOnChange} name="gender" value={userInfo.gender} placeholder="M/F"/>
                    </div>
                    <div>
                        Zip-code: <input className="edit-profile-zipcode"onChange={handleOnChange} name="zipcode" value={userInfo.zipcode} placeholder="00000"/>
                    </div>
                    <button className="edit-profile-submit">Update</button>
            
                </form>
                <Footer/>
            </div>
            
        </div>
    )
}