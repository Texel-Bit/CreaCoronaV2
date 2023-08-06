import React, { useEffect } from "react";
import "./experience-canvas.component.css";

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
    size: number
}


export const ExperienceCanvas:React.FC<ExperienceCanvasProps> = (props) => {

    return(
        <div className="position-relative h-100 overflow-hidden">
            <div className="design-canvas" style={{
                backgroundImage: `url(${props.backgroundImage})`,
                backgroundSize: `${props.size}px`,
                transform: `rotateX(${props.rotationX}deg) rotateY(${props.rotationY}deg) rotateZ(${props.rotationZ}deg)`,
                perspectiveOrigin: `${props.perspectiveOrigin.X}% ${props.perspectiveOrigin.Y}%`,
                perspective: `${props.perspective}px`,
                width: "1000px", height: "1000px"
            }}></div>
            <img
                src={props.mask}
                className="position-absolute h-100 w-100 object-fit-cover top-0"
                alt="Environment Image"/>
        </div>
    );
}