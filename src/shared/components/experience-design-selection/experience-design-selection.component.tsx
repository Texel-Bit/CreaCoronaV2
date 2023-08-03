import { useEffect, useState } from 'react';
import { IDesignType } from '../../../core/models/designType/design-type.model';
import './experience-design-selection.component.css';
import { IDesign } from '../../../core/models/design/design.model';
import DesignDataManager from '../../../core/managers/desig-data.manager';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';

interface ExperienceDesingSelectionProps {
    designTypes: IDesignType[],
    designs: IDesign[]
}

export const ExperienceDesignSelection:React.FC<ExperienceDesingSelectionProps> = (props) => {

    return(

        <div className='h-100 mh-100 design-selection-container'>

            <div className="btn-group design-types-selection-group" role="group" aria-label="Design types selection group">
                {
                    props.designTypes.map(designType => {
                        return <>
                            <input type="radio" className="btn-check" name="designTypeSelector" id={designType.id} />
                            <label className="btn btn-sm btn-outline-primary rounded-0 rounded-top pb-0 px-3" htmlFor={designType.id}>
                                {designType.name}
                            </label>
                        </>
                    })
                }
            </div>

            <div className='mh-100 overflow-y-hidden'>
                <div className="border border-1 border-color-middle gap-2 p-3 h-100 design-thumbnails-grid">
                    {
                        props.designs.map(design => {
                            return <img src={getServerImagesUrl(design.source)}/>
                        })
                    }
                </div>
            </div>

        </div>

    );
}