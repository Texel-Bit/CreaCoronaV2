import React, { useEffect, useRef, useState } from "react";
import "./experience-canvas.component.css";
import Singleton from "../../../core/patterns/singleton";
import { ExperienceViews } from "../../enums/routes.enum";
import { Fullscreen } from "@material-ui/icons";

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
    onOpenModal?: () => void,
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
    onOpenModal,
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
    
    
    const [canvasStyle, setCanvasStyle] = useState("ExperienceCanvasGeneric");

    Singleton.getInstance().updateViewStatusFunc.push(UpdateViewStatusView);

    function UpdateViewStatusView()
    {
        if(Singleton.getInstance().currentExperienceView==ExperienceViews.Design)
        {
            setCanvasStyle("ExperienceCanvasDesignSelection")
        }
        else if(Singleton.getInstance().currentExperienceView==ExperienceViews.Color)
        {
            setCanvasStyle("ExperienceCanvasColorSelection")
        }
        else if(Singleton.getInstance().currentExperienceView==ExperienceViews.Format)
        {
            setCanvasStyle("ExperienceCanvasFormatSelection")
        }
       
       console.log(Singleton.getInstance().currentExperienceView)
    }


    return(
        <div 
       
            id="Simulation-Canvas" 
            className={`aspect-ratio-16-9 overflow-hidden ${canvasStyle}`}
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

<button id="previewButton" className="buttomPreviewCustomCss"
    style={{
        position: "absolute", 
        bottom: "3%", 
        zIndex:8000,
        backgroundColor: "var(--color-middle)",  // Setting the background color
        color: "white",  // Setting the text/icon color for the button
        border: "none",  // Removing the default button border
        cursor: "pointer",  // Making sure it looks clickable
        borderRadius: "4px",  // Optional: rounding the corners for aesthetics
        padding: "8px 12px"  // Optional: adding some padding for spacing
    }} 
    
    onClick={onOpenModal}
>
    <Fullscreen style={{ color: "white" }} />  {/* Making the icon white */}
</button>
        
        </div>
    );
}
