import { BrandNavbar } from "../../shared/components/navbar/navbar.component";
import { SelectSurfaceView } from "./components/select-surface-view.component";
import "./Experience.css";

export const Experience = () => {
    return(
        <div className="vh-100 experience-content">
            <BrandNavbar/>
            <SelectSurfaceView/>
        </div>
    );
}