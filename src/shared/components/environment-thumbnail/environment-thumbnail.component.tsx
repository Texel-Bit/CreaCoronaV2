import { useState } from "react";
import icon from "../../../assets/icons/background_grid_small.png";
import icon2 from "../../../assets/icons/background_replace.png";
import './environment-thumbnail.component.css';
import Tooltip from "../Tooltip/Tooltip";

export interface EnvironmentThumbnailProps{
    name: string;
    image: string;
    id: number;
    onEvents: Array<(event: React.SyntheticEvent) => void>;
}

export const EnvironmentThumbnail: React.FC<EnvironmentThumbnailProps> = (props) => {
    const handleEvent = (event: React.SyntheticEvent) => {
        props.onEvents.forEach(handler => handler(event));
    };
    
    return (
        <Tooltip content={props.name}>
            <div 
                className="border rounded-3  d-inline-block cursor-pointer item-superficie"
                onClick={handleEvent}
            >
                <div
                    className='environment-thumbnail-image'
                    style={{ backgroundImage: `url("https://corona.texelbit.com:9445/${props.image}")` }}
                >
                </div>

                <div className='p-md-3 d-flex align-items-center justify-content-center gap-5'>
                    <img src={props.name=="Piso"?icon:icon2} alt="navbar icon" height={35} />
                    <label className="color-primary fw-bold color-middle">{props.name}</label>
                </div>
            </div>
        </Tooltip>
    );
}
