import { StructureThumbnail, StructureThumbnailProps } from "./structure-thumbnail/structure-thumbnail.component";
import "./experience-structure-selection.css";
import { IStructure } from "../../../core/models/structure/structure.model";
import React, { useEffect } from "react";
import Singleton from "../../../core/patterns/singleton";


interface ExperienceStructureSelectionProps {
    structures: StructureThumbnailProps[];
}


export const ExperienceStructureSelection:React.FC<ExperienceStructureSelectionProps> = (props) => {
    
    
    useEffect(() => {
        if(props.structures.length>0)
        {
            console.log("New structure ",props.structures);
       
            ChangeStructure(props.structures[0].structure);
        }
        
        
    }, [props.structures]);

    useEffect(() => {

        if(props.structures[0])
        {
           ChangeStructure(props.structures[0].structure);
        }
        
    }, [Singleton.getInstance().currentFormat]);

    



    function ChangeStructure(structure: IStructure)
    {
        Singleton.getInstance().ChangeStructure(structure)
    }
    
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 py-1 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Estructura</h6>           
            </div>
          
            <div className="p-2 d-flex justify-content-around structure-selection-content">
            <div>  
                {
                    props.structures.map(struct => {
                        return <StructureThumbnail 
                                key={`structureThumbnail${struct.structure.id}`}
                                structure={struct.structure}
                                onClick={ChangeStructure}/>
                    })
                }
{!Singleton.getInstance().currentStructure&& <p className="text-danger">Seleccione una estructura</p> }
            </div>
            </div>
        </div>
    );
}