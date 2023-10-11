import React, { useEffect, useRef, useState } from "react";
import "./experience-canvas.component.css";
import Singleton from "../../../core/patterns/singleton";
import { ExperienceViews } from "../../enums/routes.enum";

// Define the type for PerspectiveOrigin
interface PerspectiveOrigin {
    X: number,
    Y: number
}

interface ExperienceCanvasStyle{
    MarginBottom:string
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

    const divRef = useRef<HTMLDivElement | null>(null);
    const [showPopup, setShowPopup] = useState(false);


    const openPopup = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };
    
    
    const [canvasStyle, setCanvasStyle] = useState<ExperienceCanvasStyle>({MarginBottom:"27px"});

    Singleton.getInstance().updateViewStatusFunc.push(UpdateViewStatusView);

    function UpdateViewStatusView()
    {
        if(Singleton.getInstance().currentExperienceView==ExperienceViews.Design)
        {
           setCanvasStyle({MarginBottom:"68px"})
        }
        else if(Singleton.getInstance().currentExperienceView==ExperienceViews.Color)
        {
            setCanvasStyle({MarginBottom:"-107px"})
        }
        else if(Singleton.getInstance().currentExperienceView==ExperienceViews.Format)
        {
            setCanvasStyle({MarginBottom:" 10px"})
        }
       
       console.log(Singleton.getInstance().currentExperienceView)
    }


    return(
        <div 
       
            id="Simulation-Canvas" 
            className="aspect-ratio-16-9 overflow-hidden" 
            style={{
                marginBottom:canvasStyle.MarginBottom,
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
