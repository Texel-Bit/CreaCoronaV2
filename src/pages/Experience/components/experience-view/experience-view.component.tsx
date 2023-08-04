
import { ExperienceColorPaletteSelection } from "../../../../shared/components/experience-color-palette-selection/experience-color-palette-selection.component";
import { ExperienceDesignSelection } from "../../../../shared/components/experience-design-selection/experience-design-selection.component";
import { ExperienceGroutSelection } from "../../../../shared/components/experience-grout-selection/experience-grout-selection.component";
import { ExperienceSteepTitle } from "../../../../shared/components/experience-steep-title/experience-steep-title.component"
import { ExperienceTextureSelection } from "../../../../shared/components/experience-texture-selection/experience-texture-selection.component";
import { MosaicActionsBar } from "../../../../shared/components/mosaic/actions/mosaic-actions-bar.component";
import { MosaicBrick } from "../../../../shared/components/mosaic/brick/mosaic-brick.component";
import { MosaicHexagon } from "../../../../shared/components/mosaic/hexagon/mosaic-hexagon.component";
import { MosaicComponent } from "../../../../shared/components/mosaic/mosaic.component";
import { MosaicSquare } from "../../../../shared/components/mosaic/square/mosaic-square.component";
import { ExperienceViews } from "../../../../shared/enums/routes.enum";
import './experience-view.component.css';
import { ReactElement, useEffect, useState } from 'react';

import CozyIco from '../../../../assets/icons/view_cozy_ico.png'
import PalletIco from '../../../../assets/icons/palette_ico.png'
import OpenIco from '../../../../assets/icons/open_with_ico.png'
import { ExperienceFormatSelection } from "../../../../shared/components/experience-format-selection/experience-format-selection.component";
import { InitQuotationForm } from "../../../../shared/components/init-quotation-form/init-quotation-form.component";
import { ExperienceStructureSelection } from "../../../../shared/components/experience-structure-selection/experience-structure-selection";
import Singleton from "../../../../core/patterns/singleton";
import { IDesignType } from "../../../../core/models/designType/design-type.model";
import { IDesign } from "../../../../core/models/design/design.model";
import { ExperienceCanvas } from "../../../../shared/components/experience-canvas/experience-canvas.component";
import { MosaicActionsMask } from "../../../../shared/components/mosaic/actions/mosaic-actions-mask/mosaic-actions-mask.component";


interface currentExperienceView
{
    currentView:ExperienceViews | null;
}

interface contentData
{
    title:string;
    icon:string;
    description:ReactElement
}

export const ExperienceView:React.FC<currentExperienceView>=(props) => {
    
    let dict = new Map<ExperienceViews, contentData>();

    dict.set(ExperienceViews.Design, {
        title: "Diseña tu revestimiento",
        icon: CozyIco,
        description: <h6>Selecciona <b className="color-middle">1 opción</b> de mosaico</h6>
    });
    
    dict.set(ExperienceViews.Color, {
        title: "Agrega color a tu diseño",
        icon: PalletIco,
        description: <h6>Selecciona <b className="color-middle">1 opción</b> de color plano pensados para ti.</h6>
    });

    dict.set(ExperienceViews.Format, {
        title: "Calcula tu espacio",
        icon: OpenIco,
        description: <h6>Agrega las medidas de tu espacio para generar la cotización</h6>
    });


    const [designTypes, setDesignTypes] = useState<IDesignType[]>([]);
    const [selectedDesigns, setSelectedDesigns] = useState<IDesign[]>(Singleton.getInstance().GetSelectedDesigns() ?? []);
    const [canvasMask, setCanvasMask] = useState("");

   


    useEffect(() => {

        let currentDesignTypes = Singleton.getInstance().getDesignTypeDataManager().getAllDesignTypes() ?? [];
        setDesignTypes(currentDesignTypes);

        let currentDesignsSelected = Singleton.getInstance().GetSelectedDesigns() ?? [];
        setSelectedDesigns(currentDesignsSelected);

        if (!Singleton.getInstance().currentEnvironment?.maskImage)
            return;

        let maskImage = `https://corona.texelbit.com:9445/${Singleton.getInstance().currentEnvironment?.maskImage}`;
        setCanvasMask(maskImage);
    }, []);

    Singleton.getInstance().updateMosaicFunc = updateMosaic;

    function updateMosaic() {
        
        console.log(Singleton.getInstance().GetSelectedDesigns());
        setSelectedDesigns(Singleton.getInstance().GetSelectedDesigns() ?? [])
    }
    
    useEffect(()=>{
        
       

    },[selectedDesigns])
    
    function ChangeView(experieceView: ExperienceViews | null, value:number)
    {
        
        if(experieceView) {
            let numericalValue: number = experieceView;
            let view: ExperienceViews = numericalValue + value;
            Singleton.getInstance().ChangeExperienceView(view);

            Singleton.getInstance().UpdateViewsStatus();
        }
       
    }


    return(

        <div className="d-flex mh-100 overflow-hidden">

            <div className="w-50 p-3 h-100 experience-behavior-container">

                <div className="d-flex align-items-start">
                    <div className="col-2">
                        <button type="button" onClick={()=>ChangeView((props.currentView || null), -1)} className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">← Volver</button>
                    </div>
                    
                    <div className="col-8">
                        <ExperienceSteepTitle 
                            title={dict.get(props.currentView ?? ExperienceViews.Design)?.title ?? ""}
                            description={dict.get(props.currentView ?? ExperienceViews.Design)?.description ?? <></>}
                            icon={dict.get(props.currentView ?? ExperienceViews.Design)?.icon ?? ""}
                        />
                    </div>
                  

                    <div className="col-2 text-end">
                    {props.currentView!==ExperienceViews.Format&& <button type="button" onClick={()=>ChangeView((props.currentView || null), 1)} className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">Siguiente →</button>}
                    </div>
                </div>

            
                {
                   
                    props.currentView==ExperienceViews.Design&&
                    // PRIMER CASO DE LA EXPERIENCIA
                    
                    <div className="d-flex pt-4 h-100 justify-content-around overflow-hidden">
                        <div className="h-100 col-5">
                            
                            <ExperienceDesignSelection designTypes={designTypes} designs={Singleton.getInstance().getDesignDataManager().getAllDesigns()??[]}/>
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                {
                                    Singleton.getInstance().selectedDesignType?.id === 3 && 
                                    <MosaicComponent mosaic={<MosaicHexagon hexagon={selectedDesigns[0] ?? null}/>} actions={false} />
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.id == 2 && 
                                    <MosaicComponent mosaic={<MosaicSquare squares={selectedDesigns}/>} actions={true}/>
                                }

                                {
                                    Singleton.getInstance().selectedDesignType?.id == 1 && 
                                    <MosaicComponent mosaic={<MosaicBrick brick={selectedDesigns[0] ?? null}/>} actions={false}/>
                                }
                                
                                <MosaicActionsBar/>
                            </div>
                        </div>
                    </div> 
                }

                {
                    props.currentView==ExperienceViews.Color&&
                    // SEGUNDO CASO DE LA EXPERIENCIA

                    <div className="d-flex pt-4 h-100 justify-content-around overflow-hidden">
                        <div className="textures-selection-column col-5 h-100">
                            <ExperienceColorPaletteSelection />
                            <ExperienceTextureSelection 
    colorArray={
        Singleton.getInstance().getColorDataManager().GetAllColors(
            Singleton.getInstance().currentDesignList?.[0]?.fullField ?? true
        )
    } 
/>                            <ExperienceGroutSelection grouts={[]} />
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                {/*  */}
                                <MosaicActionsBar/>
                            </div>
                        </div>
                    </div> 
                }

                {
                     props.currentView==ExperienceViews.Format&&
                 <div className="d-flex pt-1 h-100 justify-content-around overflow-hidden">
                        <div className="col-5 d-flex">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <ExperienceStructureSelection structures={[]}/>
                            </div>
                        </div>
                        <div className="textures-selection-column d-flex flex-column col-5 h-100">
                            <ExperienceFormatSelection/>
                            <InitQuotationForm/>
                        </div>
                    </div> }

               


            </div>

            <div className="w-50 h-100">
                <ExperienceCanvas 
                    backgroundImage=""
                    mask={canvasMask}
                    perspective={1000}
                    perspectiveOrigin={{ X: 50, Y: 50 }}
                    rotationX={0}
                    rotationY={0}
                    rotationZ={0}
                    scale={1}/>
            </div>

        </div>

    );
}