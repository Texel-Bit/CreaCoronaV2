import React from "react";
import "./experience-canvas.component.css";

// Define the type for PerspectiveOrigin
interface PerspectiveOrigin {
    X: number,
    Y: number
}

// Define the props type
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

// Destructure props for readability
export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({
    backgroundImage,
    mask,
    perspective,
    perspectiveOrigin,
    rotationX,
    rotationY,
    rotationZ,
    size,
}) => {

    return(
        <div 
            id="Simulation-Canvas" 
            className="aspect-ratio-16-9 overflow-hidden" 
            style={{
                perspective: `${perspective}px`,
                perspectiveOrigin: `${perspectiveOrigin.X}% ${perspectiveOrigin.Y}%`
            }}
        >
            <div 
                className="image-pattern" 
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: `${size}px`,
                    backgroundRepeat: 'repeat',
                    transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`
                }}
            ></div>
            <img 
                src={mask}
                className="image-16-9"
                alt="Environment Image"
            />
        </div>
    );
}
