import { StructureThumbnail } from "./structure-thumbnail/structure-thumbnail.component";
import "./experience-structure-selection.css";

export const ExperienceStructureSelection = () => {
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Estructura</h6>
            </div>

            <div className="p-2 d-flex justify-content-around structure-selection-content">
                <StructureThumbnail />
                <StructureThumbnail />
            </div>

        </div>
    );
}