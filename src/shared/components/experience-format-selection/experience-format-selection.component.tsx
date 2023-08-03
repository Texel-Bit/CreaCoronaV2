import './experience-format-selection.component.css';
import { ExperienceFormatThumbnail } from './experience-format-thumbnail/experience-format-thumbnail';

export const ExperienceFormatSelection = () => {
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Formato</h6>
            </div>

            <div className="d-flex p-2 justify-content-around w-100 align-items-center experience-format-container">
                <ExperienceFormatThumbnail/>
                <ExperienceFormatThumbnail/>
            </div>

        </div>
    );
}