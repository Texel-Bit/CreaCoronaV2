import React from 'react';
import './experience-format-selection.component.css';
import { ExperienceFormatThumbnail, ExperienceFormatThumbnailProps } from './experience-format-thumbnail/experience-format-thumbnail';


interface ExperienceFormatSelectionProps {
    formats: ExperienceFormatThumbnailProps[];
}


export const ExperienceFormatSelection: React.FC<ExperienceFormatSelectionProps> = (props) => {
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Formato</h6>
            </div>

            <div className="d-flex p-2 justify-content-around w-100 align-items-center experience-format-container">
                {
                    props.formats.map(format => {
                        return <ExperienceFormatThumbnail
                                    format={format.format}
                                    onClick={format.onClick} />
                    })
                }
            </div>

        </div>
    );
}