import React, {useState, useEffect} from "react"

export default function ExerciseModal(props){

    const images = [props.exe.image1, props.exe.image2],
        [currentImage, setCurrentImage] = useState(0)

    useEffect(() => {
        const switchImage = () => {
            setCurrentImage(image => {
                if (image < images.length -1){
                setCurrentImage(image + 1)
            } else {
                setCurrentImage(0)
            }})
            return currentImage
        }
        const interval = setInterval(switchImage, 1000);
        return () => clearInterval(interval);
      }, [currentImage, images]);

    return(
        
        <div className="exercise-modal-content">
            
            <div className="exercise-modal-main" >
                <div className="exercise-modal-image-container" >
                    <div className="exercise-modal-image">
                    <img src={images[currentImage]} alt=""/>
                    </div>
                </div>
                <div style={{backgroundColor: "white"}}>
                    <div className="exercise-modal-header">

                        <div className="exercise-modal-title">
                            {props.exe.name}
                        </div>
                    
                        <div className="exercise-modal-info-bar">
                            <div>
                                <h3>Category</h3>
                                {props.exe.category}
                            </div>
                            <div>
                                <h3>Body Parts</h3> 
                                {props.exe.body_part.join(", ")}
                            </div>
                            <div>
                                <h3>Equipment</h3>
                                {props.exe.equipment.join(", ")}
                            </div>
                            <div>
                                <h3>Difficulty</h3>
                                {props.exe.difficulty}
                            </div>
                        </div>
                    </div>
                    <div className="exercise-modal-bottom">
                        <h5>Description</h5>
                        {props.exe.description}
                
                    </div>
                </div>
            </div>
            <div onClick={props.func}>
            CLOSE
            </div>
        </div>
           
        
    )
}