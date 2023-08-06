import { FormCheck } from "react-bootstrap";
import {navbarItemsProps} from '../../../../core/models/navBarItems/service-navBar';
import { ViewStatus } from "../../../enums/routes.enum";
import { useEffect, useState } from "react";
import Singleton from "../../../../core/patterns/singleton";

interface NavBarItemColor
{
    FontColor:string;
    IconColor:string;
    BackgroundColor:string;
}

export const NavbarItem:React.FC<navbarItemsProps> = (props) => {
    
    const [ viewStatus , updateViewStatus ] = useState<ViewStatus>(ViewStatus.UnComplete);
    const [ currColor, updateColor ] = useState<NavBarItemColor>();
    const [svgData, setSvgData] = useState("");

    useEffect(() => {
        fetch(props.imagen)
            .then(response => response.text())
            .then(data => setSvgData(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [props.imagen]);

    useEffect(() => {
        if(Singleton.getInstance().currentExperienceView==props.experienceView)
        {
            updateColor(SelectedColor)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
        }
        else
        {
            updateColor(UnCompleteColor)
        }

    },[]);

    

    const SelectedColor: NavBarItemColor = {
        FontColor: "#213365",
        IconColor: "#213365", 
        BackgroundColor: "#bed9ef" 
    };

    const UnCompleteColor: NavBarItemColor = {
        FontColor: "#C7CED9",
        IconColor: "#AEAEAE", 
        BackgroundColor: "#ffffff" 
    };

    const CompleteColor: NavBarItemColor = {
        FontColor: "#213365",
        IconColor: "#0069b4", 
        BackgroundColor: "#ffffff" 
    };


    useEffect(() => {
        Singleton.getInstance().updateViewStatusFunc.push(UpdateStatus)

        if(Singleton.getInstance().currentExperienceView==props.experienceView)
        {
            updateColor(SelectedColor)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
        }
        else
        {
            updateColor(UnCompleteColor)
        }
       

    },[viewStatus]);
   

    function UpdateStatus()
    {
        if(Singleton.getInstance().currentExperienceView==props.experienceView)
        {
            updateColor(SelectedColor)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
        }
        else
        {
            updateColor(UnCompleteColor)
        }

       
    }


    return (
       <div className="p-2 border rounded navbar-item d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: currColor?.BackgroundColor}}>

<div className="pb-1" style={{fill: currColor?.BackgroundColor}}>
    {svgData && 
    <div >
        <div dangerouslySetInnerHTML={{ __html: svgData }} style={{fill: currColor?.IconColor, width: '1%', height: '1%'}} />
    </div>
    }
</div>
        
            <div>
                <label className="navbar-item-text text-center" style={{color: currColor?.FontColor}}> 
                    {props.text}
                </label>
            </div>
        
        </div>
    
    
    );
}