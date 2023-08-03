import { useEffect, useState } from "react";
import { BrandNavbar } from "../../shared/components/navbar/navbar.component";
import { ExperienceView } from "./components/experience-view/experience-view.component";
import { SelectEnvironmentView } from "./components/select-environment-view/select-environment-view.component";
import { SelectSurfaceView } from "./components/select-surface-view/select-surface-view.component";
import "./Experience.css";
import { ExperienceViews } from "../../shared/enums/routes.enum";
import Singleton from "../../core/patterns/singleton";



export const Experience = () => {

    const [ porcent, setProcent ] = useState<number>(0);
    const [ content, setContent ] = useState<ExperienceViews>(ExperienceViews.EnvironmentType);

    // Passing `setContent` function to singleton
    Singleton.getInstance().setContentFunc = setContent;


console.log(Singleton.getInstance().currentExperienceView,"  Singleton experience view ")
    return(
        <div className="experience-content">
            <BrandNavbar
                number={porcent}
                sendDataParent={setProcent}
            />
            {content ==ExperienceViews.EnvironmentType? <SelectSurfaceView
               
            />:content ==ExperienceViews.Environment? <SelectEnvironmentView
               
            />:<ExperienceView currentView={Singleton.getInstance().currentExperienceView} />}
           
        </div> 
    );
}