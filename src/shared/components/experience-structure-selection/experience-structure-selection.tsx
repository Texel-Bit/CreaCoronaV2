import { StructureThumbnail } from "./structure-thumbnail/structure-thumbnail.component";
import "./experience-structure-selection.css";
import { IStructure } from "../../../core/models/structure/structure.model";
import React from "react";


interface ExperienceStructureSelectionProps {
    structures: IStructure[]
}


export const ExperienceStructureSelection:React.FC<ExperienceStructureSelectionProps> = (props) => {
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Estructura</h6>
            </div>

            <div className="p-2 d-flex justify-content-around structure-selection-content">
                
                {
                    props.structures.map(struct => {
                        return <StructureThumbnail structure={struct}/>
                    })
                }

            </div>

        </div>
    );
}