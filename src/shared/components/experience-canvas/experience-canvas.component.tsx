import React from "react";

interface PerspectiveOrigin {
    X: number,
    Y: number
}

interface ExperienceCanvasProps {    
    backgroundImage: string,
    mask: string,
    perspective: number,
    perspectiveOrigin: PerspectiveOrigin,
    rotationX: number,
    rotationY: number,
    rotationZ: number,
    scale: number
}


export const ExperienceCanvas:React.FC<ExperienceCanvasProps> = (props) => {

    return(
        <div className="position-relative h-100">
            <div>
                <div className="design-canvas h-100 w-100" style={{
                    backgroundImage: props.backgroundImage, 
                    transform: `rotateX(${props.rotationX}deg) rotateY(${props.rotationY}deg) rotateZ(${props.rotationZ}deg)`
                }}></div>
            </div>
            <img
                src={props.mask}
                className="position-absolute h-100 w-100 object-fit-cover top-0"
                alt="Environment Image"/>
        </div>
    );
}