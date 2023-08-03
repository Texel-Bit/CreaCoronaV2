import { useEffect, useState } from "react";
import { BrandNavbar } from "../../shared/components/navbar/navbar.component";
import { ExperienceView } from "./components/experience-view/experience-view.component";
import { SelectEnvironmentView } from "./components/select-environment-view/select-environment-view.component";
import { SelectSurfaceView } from "./components/select-surface-view/select-surface-view.component";
import "./Experience.css";

export const Experience = () => {

    const [ porcent, setProcent ] = useState<number>(0);
    const [ content, setContent ] = useState<string>('superficie');

    useEffect(()=>{setContent(content)},[content])

    return(
        <div className="experience-content">
            <BrandNavbar
                number={porcent}
                sendDataParent={setProcent}
                content={content}
            />
            {content =='superficie' && <SelectSurfaceView
                toParent={ setContent }
                toProgress={setProcent}
            />}
            {content =='ambiente'   && <SelectEnvironmentView
                toParent={ setContent }
                toProgress={setProcent}
            />}
            {content =='diseña'     && <ExperienceView/>}
        </div> 
    );
}