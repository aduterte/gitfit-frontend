import React, {useState} from "react"
import {userAtom} from "../Atoms/Atoms"
import { useRecoilState} from "recoil"
import { API } from "../constants/index"

export default function EditProfile(){
    const [user, setUser] = useRecoilState(userAtom),
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

    const [weightInput, setWeightInput] = useState({weight: 0, type: "lbs"})
        
    const handleWeightForm = (e) => {
        const {name, value} = e.target
        setWeightInput({...weightInput, [name]: value})

    }

    const logWeight = (e) => {
        e.preventDefault()
        const obj = {user_id: user.id, lbs: 0, kg: 0}
        if(weightInput.type ==="lbs"){ 
            obj.lbs = weightInput.weight
            obj.kg = obj.lbs / 2.205
        } else if (weightInput.type === "kg") {
            obj.kg = weightInput.weight
            obj.lbs = obj.kg * 2.205
        }
        e.target.reset()
        setWeightInput({...weightInput, type: "lbs"})
        console.log(obj)

        fetch(`${API}/weights`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(data => console.log(data))

    }

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
    console.log(userInfo)
    return (
        <div className="edit-profile">
            <form onSubmit={handleSubmit}>
            <div>
                <h2>Edit Profile</h2>
                <input onChange={handleOnChange} name="firstName" value={userInfo.firstName} placeholder="First Name"/>
                <input onChange={handleOnChange} name="lastName" value={userInfo.lastName} placeholder="Last Name"/>
            </div>
            <div>
                Profile Image Url:
                <input onChange={handleOnChange} name="avatar" value={userInfo.avatar} placeholder="Enter image url"/>
            </div>
            <div>
                Goal Weight: <input onChange={handleOnChange} name="goal_weight" value={userInfo.goal_weight} placeholder="Enter Goal Weight"/>
            </div>
            <div>
                Height: <input onChange={handleOnChange} name="height"value={userInfo.height} placeholder="Enter Height"/>
            </div>
            <div>
                Age: <input onChange={handleOnChange} type="number" name="age" value={userInfo.age} placeholder="Enter Age"/>
            </div>
            <div>
                Gender: <input onChange={handleOnChange} name="gender" value={userInfo.gender} placeholder="Enter Gender"/>
            </div>
            <div>
                Zip-code: <input onChange={handleOnChange} name="zipcode" value={userInfo.zipcode} placeholder="Enter Zip-code"/>
            </div>
            <button>Submit</button>
            </form>
            {/* start of input form for weight */}
            <div>
                delete me later
                <form onSubmit={logWeight}>
                    <input onChange={handleWeightForm} type="num" name="weight" placeholder="Enter Weight"/>
                    <select onChange={handleWeightForm} name="type" value={weightInput.type} required>
                        <option name="type" value="lbs">lbs</option>
                        <option name="type" value="kg">kg</option>
                    </select>
                </form>
            </div>
            {/* end of input form for weight */}
        </div>
    )
}