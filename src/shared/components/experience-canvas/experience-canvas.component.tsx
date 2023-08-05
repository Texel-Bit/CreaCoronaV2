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
    scale: number
}


export const ExperienceCanvas:React.FC<ExperienceCanvasProps> = (props) => {

    useEffect(() => {
        console.log("DISEÑO SELECCIONADO => ", props);
    }, [props]);

    return(
        <div className="position-relative h-100">
            <div className="design-canvas h-100 w-100" style={{
                backgroundImage: `url(${props.backgroundImage})`,
                transform: `rotateX(${props.rotationX}deg) rotateZ(${props.rotationZ}deg)`,
                perspectiveOrigin: `${11 * props.perspectiveOrigin.X - 500}% ${11 * props.perspectiveOrigin.Y - 500}%`
            }}></div>
            <img
                src={props.mask}
                className="position-absolute h-100 w-100 object-fit-cover top-0"
                alt="Environment Image"/>
        </div>
    );
}