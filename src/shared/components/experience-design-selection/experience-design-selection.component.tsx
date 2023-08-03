import { useEffect, useState } from 'react';
import { IDesignType } from '../../../core/models/designType/design-type.model';
import './experience-design-selection.component.css';
import { IDesign } from '../../../core/models/design/design.model';
import DesignDataManager from '../../../core/managers/desig-data.manager';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import { getAllDesignByTypeId } from '../../../core/services/design.service';
import Singleton from '../../../core/patterns/singleton';

interface ExperienceDesingSelectionProps {
    designTypes: IDesignType[],
    designs: IDesign[]
}


export const ExperienceDesignSelection:React.FC<ExperienceDesingSelectionProps> = (props) => {
    
    const [selectedDesignType, setSelectedDesignType] = useState<IDesignType>();
    const [designColors, setDesignColors] = useState<IDesign[]>([]);


    useEffect(()=>{
        
        const SelectDesignTypeAsync = async() =>
        {
            if(selectedDesignType)
            {
                Singleton.getInstance().selectedDesignType = selectedDesignType;
    
                const CurrColorsSelected = await getAllDesignByTypeId(selectedDesignType.id);
                
                let defaultDesignType: IDesignType = {id:1,name:"Temp",source: "",mosaicValue:1 };
        
                let currenDesignColors = CurrColorsSelected.data.Design.map((element: any) => {
                    let designType = Singleton.getInstance().getDesignTypeDataManager().getDesignTypeById(element.DesignType_idDesignType);
                    
                    let currDesign: IDesign = {
                        id: element.idDesign,
                        source: element.DesignImagePath,
                        name: element.DesignName,
                        designType: designType ? designType : defaultDesignType
                    };
        
                    Singleton.getInstance().addDesign(currDesign);
                    return currDesign;
                });

                setDesignColors(currenDesignColors);
            }
        }

        SelectDesignTypeAsync();

    },[selectedDesignType]);


    useEffect(() => {
        setSelectedDesignType(props.designTypes[0]);
    }, [props.designTypes]);


    const handleDesignTypeChange =async (_event:any, designType:IDesignType) => {
        setSelectedDesignType(designType);
    }


    return(

        <div className='h-100 mh-100 design-selection-container'>

            <div className="btn-group design-types-selection-group" role="group" aria-label="Design types selection group">
                {
                    props.designTypes.map(designType => {
                        return <>
                            <input 
                                type="radio" 
                                className="btn-check" 
                                name="designTypeSelector" 
                                id={designType.id.toString()}
                                checked={selectedDesignType?.id == designType.id}
                                onChange={(event) => handleDesignTypeChange(event, designType)}
                            />
                            <label 
                                className="btn btn-sm btn-outline-primary rounded-0 rounded-top pb-0 px-3" 
                                htmlFor={designType.id.toString()}>
                                {designType.name}
                            </label>
                        </>
                    })
                }
            </div>

            <div className='mh-100 overflow-y-hidden'>
                <div className="border border-1 border-color-middle gap-2 p-3 h-100 design-thumbnails-grid">
                    {
                        designColors.map(design => {
                            return <img src={getServerImagesUrl(design.source)}/>
                        })
                    }
                </div>
            </div>

        </div>

    );
}