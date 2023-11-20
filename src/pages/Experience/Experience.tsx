import { useEffect, useState } from "react";
import { BrandNavbar } from "../../shared/components/navbar/navbar.component";
import { ExperienceView } from "./components/experience-view/experience-view.component";
import { SelectEnvironmentView } from "./components/select-environment-view/select-environment-view.component";
import { SelectSurfaceView } from "./components/select-surface-view/select-surface-view.component";
import "./Experience.css";
import { ExperienceViews } from "../../shared/enums/routes.enum";
import Singleton from "../../core/patterns/singleton";
import ForegroundWithMessage from "./components/select-surface-view/FullscreenForeground";
import { isVisible } from "@testing-library/user-event/dist/utils";




export const Experience = () => {

    const [ porcent, setProcent ] = useState<number>(0);
    const [ visible, setIsVisible ] = useState(false);
    const [ content, setContent ] = useState<ExperienceViews>(ExperienceViews.EnvironmentType);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // This will set 'visible' to true after 4 seconds

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this runs once when the component mounts


    // Passing `setContent` function to singleton
    Singleton.getInstance().setContentFunc = setContent;
    Singleton.getInstance().UpdateViewsStatus();

    return(
        <div className="experience-content">
            {visible && <>
                <BrandNavbar
                    number={porcent}
                    sendDataParent={setProcent}
                />

                {content === ExperienceViews.EnvironmentType ? 
                    <SelectSurfaceView /> 
                    : content === ExperienceViews.Environment ? 
                    <SelectEnvironmentView /> 
                    : 
                    <ExperienceView currentView={Singleton.getInstance().currentExperienceView} />
                }
            </>}
            <ForegroundWithMessage />
        </div> 
    );
}