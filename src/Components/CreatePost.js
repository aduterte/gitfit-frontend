import React, {useState} from "react"
import { userAtom, userRoutines, userPosts  } from "../Atoms/Atoms"
import { useRecoilValue, useRecoilState } from "recoil"
import { API } from "../constants/index"

export default function CreatePost(props){

    const [content, setContent] = useState(""),
        [addPicture, setAddPicture] = useState(false),
        [imageUrl, setImageUrl] = useState(""),
        user = useRecoilValue(userAtom),
        uRoutines = useRecoilValue(userRoutines),
        [routine, setRoutine] = useState(null),
        [posts, setPosts] = useRecoilState(userPosts)

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    const handleImage = (e) => {
        setImageUrl(e.target.value)
    }

    const handleAddImage = (e) => {
        e.preventDefault()
        setAddPicture(!addPicture)
    }
    const handleRoutine = (e) => {
        setRoutine(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(routine)
        const obj = {
            content: content,
            user_id: user.id
        }
        if (addPicture) {
            obj.picture = imageUrl
        }
        if (routine) {
            obj.routine_id = routine
        }
        // console.log(obj)
        fetch(`${API}/posts`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(obj)
        }).then(resp => resp.json())
        .then(post => {
            if(!!posts){
            setPosts([post, ...posts])
            props.func()
            } else {
                setPosts([post])
                props.func()
            }
        })
    }
    return (
        <div className="post-modal-content">
            <form onSubmit={handleSubmit}>
                <h2 className="post-modal-header"> Create a Post </h2>
                <div>
                    <textarea className="post-modal-text" name="content" onChange={handleContent} value={content} placeholder="Say Something..."/>
                </div>
                <div>
                    <button className="post-modal-add-picture-button" onClick={handleAddImage}>Add Picture</button>
                    {addPicture && <input className="post-modal-image-input" name="image" value={imageUrl} onChange={handleImage} placeholder="Enter image url..."/>}
                </div>
                <div>Optional
                    <select className="post-modal-routine-select" onChange={handleRoutine}>
                        
                        <option>Choose a Routine</option>
                        {uRoutines.map((routine, i) => <option key={`option-${i}`} name="routine_id" value={routine.id}>{routine.name}</option>)}
                    </select>
                </div>
                <button className="post-modal-post-button">Post</button>
            </form>
        </div>
    )
}