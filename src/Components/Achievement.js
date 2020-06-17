import React, {useEffect, useRef, createRef} from "react"
import { userAtom, sessionAchievements } from "../Atoms/Atoms"
import { useRecoilValue } from "recoil"

export default function Achievement() {

    const currentUser = useRecoilValue(userAtom),
        achievements = useRecoilValue(sessionAchievements),
        isFirstRender = useRef(true),
        show = createRef(),
        image = "pngfuel.com.png"

    useEffect(()=>{
        if(isFirstRender.current){
            isFirstRender.current = false
            return
        }
        if(achievements.length > 0){
        
        show.current.classList.toggle('show')

        setTimeout(()=> show.current.classList.toggle('show'), 3990)
        }
    },[achievements])
    
   
    return (
        <div className="achievement-div" ref={show}>
            {achievements.length > 0 &&
            <div className="achievement-content">
                <div className="achievment-icon">
                    <img src={image} alt="trophy"/>
                </div>
                <div>
                    <h2 className="achievement-header">Achievement Unlocked!</h2>
                    <div className="achievement-name">{achievements[achievements.length - 1].name}</div>
                    <div className="achievement-details">{achievements[achievements.length - 1].details}</div>
                </div>
            </div>}
        </div>
    )


}