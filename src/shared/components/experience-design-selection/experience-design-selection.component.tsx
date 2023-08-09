import { useEffect, useState } from 'react';
import { IDesignType } from '../../../core/models/designType/design-type.model';
import './experience-design-selection.component.css';
import { IDesign } from '../../../core/models/design/design.model';
import DesignDataManager from '../../../core/managers/desig-data.manager';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import { getAllDesignByTypeId } from '../../../core/services/design.service';
import Singleton from '../../../core/patterns/singleton';
import { IColor } from '../../../core/models/color/color.model';
import { IFormat } from '../../../core/models/format/format.model';
import { IStructure } from '../../../core/models/structure/structure.model';

interface ExperienceDesingSelectionProps {
    designTypes: IDesignType[],
    designs: IDesign[]
}


export const ExperienceDesignSelection:React.FC<ExperienceDesingSelectionProps> = (props) => {
    
    const [selectedDesignType, setSelectedDesignType] = useState<IDesignType>();
    const [designColors, setDesignColors] = useState<IDesign[]>([]);
    const [designLoaded, setDesignsLoaded] = useState(false);


    useEffect(()=>{
        
        const SelectDesignTypeAsync = async() =>
        {
            console.log("environment changed ",Singleton.getInstance().environmentTypeChanged)
            
            if(selectedDesignType)
            {
                
                const isSameDesignType=Singleton.getInstance().selectedDesignType === selectedDesignType
                

                if(!Singleton.getInstance().environmentTypeChanged && isSameDesignType)
                {
                   setDesignColors(Singleton.getInstance().getDesignDataManager().getAllDesigns());
                   Singleton.getInstance().TexturizeMosaic();
                   
                  
                   return;
                }

                console.log("Current design list "+Singleton.getInstance().currentDesignList);

                
                let defaultFormatSize:IFormat;

                if(Singleton.getInstance().environmentTypeChanged || !isSameDesignType)
                {
                    Singleton.getInstance().getDesignDataManager().ClearDesigns();
                    Singleton.getInstance().currentDesignList=[]
                    Singleton.getInstance().removeALlColors();
                    Singleton.getInstance().currentColorList=[]
                }
                
               

                Singleton.getInstance().selectedDesignType = selectedDesignType;
    
                const ColorList = await getAllDesignByTypeId(selectedDesignType.id);
                
                let defaultDesignType: IDesignType = {id:1,name:"Temp",source: "",mosaicValue:1 };
        


                let currenDesignColors:IDesign[] = ColorList.data.Design.map((element: any) => {
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


     
                ColorList.data.DesignTypeFormatSize.map((element: any) => {
                    

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

                    
                    
                    let currFormat: IFormat = {
                       id:element.idDesignTypeFormatSize,
                       name:element.DesignTypeFormatSizeName,
                       source:element.DesignTypeFormatSizeDefaultImagePath,
                       width:element.DesignTypeFormatSizeWidht,
                       height:element.DesignTypeFormatSizeHeight,
                       scale:element.DesignTypeFormatSizeMosaicScale                       ,
                       formats:FormatSizetexture
                    };

                    if(!defaultFormatSize)
                    {
                        defaultFormatSize=currFormat;
                        Singleton.getInstance().SelectFormat(defaultFormatSize);
                    }
                   
                    Singleton.getInstance().addFormat(currFormat);
                    return currFormat;
                });

               

                let currentColors = ColorList.data.DesignColors.map((element: any) => {
                    let designType = Singleton.getInstance().getDesignTypeDataManager().getDesignTypeById(element.DesignType_idDesignType);
                    
                    let currDesign: IColor = {
                       id:element.idDesignColors,
                       name:element.DesignColorName                       ,
                       source:element.DesignColorPath,
                       isFullField:element.DesignColorType_idDesignColorType==1?true:false,
                       design :designType ? designType : defaultDesignType,
                    };
                    
                    
                    Singleton.getInstance().addColor(currDesign);
                    return currDesign;
                });

                if(Singleton.getInstance().environmentTypeChanged )
                {
                    Singleton.getInstance().GenerateDefaultDesignsSelected()
                }
                Singleton.getInstance().environmentTypeChanged=false;
                
                if(Singleton.getInstance().currentDesignList && !designLoaded)
                {
                    if(Singleton.getInstance().currentDesignList!?.length>0)
                    {                        
                        if(!isSameDesignType)
                        {
                          Singleton.getInstance().GenerateDefaultDesignsSelected()
                        }
                    }
                    else
                    {
                        Singleton.getInstance().GenerateDefaultDesignsSelected()
                    }
                   
                    
                }
                else if(!designLoaded)
                {
                    Singleton.getInstance().GenerateDefaultDesignsSelected()
                }

                
                
                setDesignColors(currenDesignColors);
               
            }
            
        }
        
        SelectDesignTypeAsync();

    },[selectedDesignType]);


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
                            return <img
                                className='cursor-pointer cursor-pointer-hover'
                                key={`designTypeTexture${design.id}`}
                                onClick={()=>SelectNewDesign(design)}
                                src={getServerImagesUrl(design.source)}/>
                        })
                    }
                </div>
            </div>

        </div>

    );
}