import { useEffect, useState } from 'react';
import { IDesignType } from '../../../core/models/designType/design-type.model';
import './experience-design-selection.component.css';
import { IDesign } from '../../../core/models/design/design.model';
import DesignDataManager from '../../../core/managers/desig-data.manager';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import { getAllDesignByTypeId, getAllDesignColorsByDesignTypeId } from '../../../core/services/design.service';
import Singleton from '../../../core/patterns/singleton';
import { IColor } from '../../../core/models/color/color.model';
import { IFormat } from '../../../core/models/format/format.model';
import { IStructure } from '../../../core/models/structure/structure.model';
import { getAllFormatSizeByEnvironmentType } from '../../../core/services/formatSize.service';
import { getDesignTypeFormatSizByEnvironmentTypeId } from '../../../core/services/environment.service';

interface ExperienceDesingSelectionProps {
    designTypes: IDesignType[],
    designs: IDesign[]
}


export const ExperienceDesignSelection:React.FC<ExperienceDesingSelectionProps> = (props) => {
    
    const [selectedDesignType, setSelectedDesignType] = useState<IDesignType>();
    const [designColors, setDesignColors] = useState<IDesign[]>([]);
    const [designLoaded, setDesignsLoaded] = useState(false);

    const singletonInstance=Singleton.getInstance();
    const isSelected = (designId:number) => {
        const selectedDesigns = singletonInstance.GetSelectedDesigns();
        const exist= Array.isArray(selectedDesigns) && selectedDesigns.some(design => design.id === designId);
        if(exist) console.log("Exist "+designId);
        return exist
      };

    useEffect(() => {

        console.log("useEffect triggered with selectedDesignType:", selectedDesignType);
    
        const SelectDesignTypeAsync = async() => {
            
            if (selectedDesignType) {
                
                console.log("Inside selectedDesignType check...");
    
                const isSameDesignType = Singleton.getInstance().selectedDesignType === selectedDesignType;
               
    
                if (!Singleton.getInstance().environmentTypeChanged && isSameDesignType) {
                    console.log("Inside environmentTypeChanged & isSameDesignType check...");
                    
                    setDesignColors(Singleton.getInstance().getDesignDataManager().getAllDesigns());
                    Singleton.getInstance().TexturizeMosaic();
                    console.log("TexturizeMosaic called");
                    
                    return;
                }
    
                console.log("Removing all formats...");
                Singleton.getInstance().removeAllFormats();
    
                let defaultFormatSize: IFormat;
    
                if (Singleton.getInstance().environmentTypeChanged || !isSameDesignType) {
                    console.log("Environment type changed or not same design type...");
                    
                    Singleton.getInstance().getDesignDataManager().ClearDesigns();
                    Singleton.getInstance().removeALlColors();
                    setDesignsLoaded(false);
                    Singleton.getInstance().currentColorList = [];
                    console.log("Designs cleared and currentColorList reset");
                }
    
                Singleton.getInstance().selectedDesignType = selectedDesignType;
    

                const DesignList = await getAllDesignByTypeId(selectedDesignType.id,Singleton.getInstance().currentEnvironmentType?.id||0);
                const DesignTypesFormatSize = await getDesignTypeFormatSizByEnvironmentTypeId(Singleton.getInstance().currentEnvironmentType?.id||0);

    
                let defaultDesignType: IDesignType = {id:1,name:"Temp",source: "",mosaicValue:1,mosaicId:1 };
    
                

                let currenDesignColors:IDesign[] = DesignList.data.map((element: any) => {
                   
                    let designType = Singleton.getInstance().getDesignTypeDataManager().getDesignTypeById(element.DesignType_idDesignType);
                    let currDesign: IDesign = {
                        id: element.idDesign,
                        source: element.DesignImagePath,
                        name: element.DesignName,
                        designType: designType ? designType : defaultDesignType,
                        fullField:element.DesignColorType_idDesignColorType==1?true:false
                    };
                    Singleton.getInstance().addDesign(currDesign);
                    return currDesign;
                });
                
    
                const FormatsType = await getAllFormatSizeByEnvironmentType(Singleton.getInstance().currentEnvironmentType?.id||0);
               
                console.log(FormatsType);
                
                FormatsType.data.map((element: any) => {

                    
                   
                    let FormatSizetexture = element.FormatSizeTexture.map((structure: any) => {
                       
                        let colorTypes = structure.DesignColorType_has_FormatSizeTexture.map((colorType: any) => {
                            return colorType.DesignColorType_idDesignColorType;
                        });
                        

                        let currStructure: IStructure = {
                            id: structure.idFormatSizeTexture,
                            name: structure.FormatSizeTextureName,
                            source: structure.FormatSizeTextureMaskPath,
                            designColorType: colorTypes
                        };
                        return currStructure;
                    });
    
                    console.log("Element format ",element)
                    let currFormat: IFormat = {
                        id:element.idDesignTypeFormatSize,
                        name:element.DesignTypeFormatSizeName,
                        source:element.DesignTypeFormatSizeDefaultImagePath,
                        width:element.DesignTypeFormatSizeWidht,
                        height:element.DesignTypeFormatSizeHeight,
                        scale:element.DesignTypeFormatSizeMosaicScale,
                        formats:FormatSizetexture,
                        DesignType_idDesignType:element.DesignType_idDesignType
                    };
                    
                    

                    if(DesignTypesFormatSize.data.length>0)
                    {
                        if(!defaultFormatSize) {
                            defaultFormatSize=currFormat;
                            Singleton.getInstance().SelectFormat(defaultFormatSize);
                        }
                       
                        Singleton.getInstance().addFormat(currFormat);
                    }


                   
                   
                    return currFormat;
                });

                const ColorList = await getAllDesignColorsByDesignTypeId(selectedDesignType.id);


                let currentColors = ColorList.data.map((element: any) => {
                    
                    let designType = Singleton.getInstance().getDesignTypeDataManager().getDesignTypeById(element.DesignType_idDesignType);
                    
                    let currDesign: IColor = {
                       id:element.idDesignColors,
                       name:element.DesignColorName,
                       source:element.DesignColorPath,
                       isFullField:element.DesignColorType_idDesignColorType==1?true:false,
                       design:designType ? designType : defaultDesignType,
                    };
                    
                    Singleton.getInstance().addColor(currDesign);
                    return currDesign;
                });
    
                if(Singleton.getInstance().environmentTypeChanged || !isSameDesignType ) {
                    console.log("Environment type changed, generating default designs...");
                    Singleton.getInstance().GenerateDefaultDesignsSelected();
                }
                
                Singleton.getInstance().environmentTypeChanged=false;
    
                if(Singleton.getInstance().currentDesignList && !designLoaded) {
                    if(Singleton.getInstance().currentDesignList!.length > 0) {                        
                        if(!isSameDesignType) {
                            console.log("Not the same design type, generating default designs...");
                            Singleton.getInstance().GenerateDefaultDesignsSelected();
                        }
                    } else {
                        console.log("No current design list, generating default designs...");
                        Singleton.getInstance().GenerateDefaultDesignsSelected();
                    }
                } else if(!designLoaded) {
                    console.log("Designs not loaded, generating default designs...");
                    Singleton.getInstance().GenerateDefaultDesignsSelected();
                }
    
                setDesignColors(currenDesignColors);
                console.log("Design colors set");
            }
        }
        
        SelectDesignTypeAsync();
    
    }, [selectedDesignType]);
    


    useEffect(() => {

        if(!Singleton.getInstance().selectedDesignType)
        {
            setSelectedDesignType(props.designTypes[0]);
        }
        else
        {
            if(Singleton.getInstance().selectedDesignType)
            {
                setDesignsLoaded(true);
            }
        }
           

    }, [props.designTypes]);

    
    useEffect(() => {
        
        setSelectedDesignType(Singleton.getInstance().selectedDesignType!);     
    }, [designLoaded]);


    const handleDesignTypeChange =async (_event:any, designType:IDesignType) => {
        setSelectedDesignType(designType);
    }

    const SelectNewDesign=(design: IDesign)=>
    {
        Singleton.getInstance().AddDesignToMosaic(design);
    }

    return(

        <div className='h-100 mh-100 design-selection-container'>

            <div className="btn-group design-types-selection-group" role="group" aria-label="Design types selection group">
                {
                    props.designTypes.map(designType => {
                        return <>
                            <input 
                                key={`designTypeTagCheck${designType.id}`}
                                type="radio" 
                                className="btn-check" 
                                name="designTypeSelector" 
                                id={designType.id.toString()}
                                checked={selectedDesignType?.id == designType.id}
                                onChange={(event) => handleDesignTypeChange(event, designType)}/>
                            <label
                                key={`designTypeTagText${designType.id}`}
                                className="btn-corona-secondary rounded-0 rounded-top pb-0 px-3 cursor-pointer"
                                style={{border: '1px solid #0069B4', textAlign: 'center'}}
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
            const selected = isSelected(design.id);
            return (
                <img
                    className={`cursor-pointer ${selected ? 'selected-design-class' : 'cursor-pointer-hover'}`}
                    style={{ 
                        border: selected ? "4px solid var(--color-middle)" : "none"
                    }}
                    key={`designTypeTexture${design.id}`}
                    onClick={()=>SelectNewDesign(design)}
                    src={getServerImagesUrl(design.source)}
                />
            );
        })
    }
</div>

            </div>

        </div>

    );
}