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
    size: number,
}


export const ExperienceCanvas:React.FC<ExperienceCanvasProps> = (props) => {

    console.log("Background size ",props)
    return(
        <div id="Simulation-Canvas" className="aspect-ratio-16-9 overflow-hidden" style={{
            perspective: `${props.perspective}px`,
            perspectiveOrigin: `${props.perspectiveOrigin.X}% ${props.perspectiveOrigin.Y}%`
        }}>
        
            <div className="image-pattern" style={{
                backgroundImage: `url(${props.backgroundImage})`,
                backgroundSize: `${props.size}px`,
                backgroundRepeat: 'repeat',
                transform: `rotateX(${props.rotationX}deg) rotateY(${props.rotationY}deg) rotateZ(${props.rotationZ}deg)`
            }}></div>
        
            <img 
                src={props.mask}
                className="image-16-9"
                alt="Environment Image"/>
        </div>
    );
}