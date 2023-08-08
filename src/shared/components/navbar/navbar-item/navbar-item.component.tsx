import { FormCheck } from "react-bootstrap";
import {navbarItemsProps} from '../../../../core/models/navBarItems/service-navBar';
import { ExperienceViews, ViewStatus } from "../../../enums/routes.enum";
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

    const applyFillColorToSvg = (svgString:string, color:string) => {
       
        const svgWithFill = svgString.replace(/(<path[^>]+fill=")[^"]*"/, `$1${color}"`);
        return svgWithFill;
      }

    useEffect(() => {
        if(Singleton.getInstance().currentExperienceView==props.experienceView)
        {
            updateColor(SelectedColor)
            loadImageData(props.imagenOn)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
            loadImageData(props.imagenOn)
        }
        else
        {
            updateColor(UnCompleteColor)
            loadImageData(props.imagen)
            
        }

    },[]);

    function loadImageData(currImage:string)
    {
        fetch(currImage)
        .then(response => response.text())
        .then(data => setSvgData(data))
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
      
        setSvgData(applyFillColorToSvg(svgData,currColor?.IconColor??UnCompleteColor.IconColor));
    },[updateColor]);

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
            loadImageData(props.imagenOn)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
            loadImageData(props.imagenOn)
        }
        else
        {
            updateColor(UnCompleteColor)
            loadImageData(props.imagen)
        }
       


    },[viewStatus]);
   

    function UpdateStatus()
    {
        if(Singleton.getInstance().currentExperienceView==props.experienceView)
        {
            updateColor(SelectedColor)
            loadImageData(props.imagenOn)
        }
        else if(Singleton.getInstance().ValidateViewCompleteStatus(props.experienceView))
        {
            updateColor(CompleteColor)
            loadImageData(props.imagenOn)
        }
        else
        {
            updateColor(UnCompleteColor)
            loadImageData(props.imagen)
        }

       
    }

    function ClickButton()
    {
        const currentExperienceView = Singleton.getInstance().currentExperienceView??ExperienceViews.EnvironmentType;
        const propExperienceView = props.experienceView;
        
        // Ensure they are both defined and part of the enum
        if (currentExperienceView in ExperienceViews && propExperienceView in ExperienceViews) {
            // Cast to numbers and compare
            if (+currentExperienceView >= +propExperienceView) {
                if(currentExperienceView!=propExperienceView)
                {
                    Singleton.getInstance().ChangeExperienceView(propExperienceView);
                }
            }
            else
            {
                
            }
        }
       
    }

    return (
       <div onClick={ClickButton} className="p-2 border rounded navbar-item d-flex flex-column align-items-center justify-content-center" style={{backgroundColor: currColor?.BackgroundColor}}>

<div  className="pb-1" style={{fill: currColor?.BackgroundColor}}>
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