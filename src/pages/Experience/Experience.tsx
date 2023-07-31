import { BrandNavbar } from "../../shared/components/navbar/navbar.component";
import { SelectEnvironmentView } from "./components/select-environment-view/select-environment-view.component";
import { SelectSurfaceView } from "./components/select-surface-view/select-surface-view.component";
import "./Experience.css";

export const Experience = () => {
    return(
        <div className="experience-content">
            <BrandNavbar/>
            {/* <SelectSurfaceView/> */}
            <SelectEnvironmentView/>
        </div>
    );
}