
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

    const [canvasMask, setCanvasMask] = useState("");


    useEffect(() => {

        
        if (!Singleton.getInstance().currentEnvironment?.maskImage)
            return;

        let maskImage = `https://corona.texelbit.com:9445/${Singleton.getInstance().currentEnvironment?.maskImage}`;
        setCanvasMask(maskImage);
    }, []);


    function ChangeView(experieceView: ExperienceViews | null, value:number)
    {
        
        if(experieceView) {
            let numericalValue: number = experieceView;
            let view: ExperienceViews = numericalValue + value;
            Singleton.getInstance().ChangeExperienceView(view);
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
                            <ExperienceDesignSelection designTypes={Singleton.getInstance().currentEnvironmentType?.designTypes??[]} designs={[]}/>
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <MosaicComponent mosaic={<MosaicSquare squares={[]}/>}/>
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
                            <ExperienceTextureSelection />
                            <ExperienceGroutSelection grouts={[]} />
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <MosaicComponent mosaic={<MosaicBrick brick={{}} />}/>
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
                                <MosaicComponent mosaic={<MosaicHexagon hexagon={{}}/>}/>
                                <ExperienceStructureSelection structures={[]}/>
                            </div>
                        </div>
                        <div className="textures-selection-column d-flex flex-column col-5 h-100">
                            <ExperienceFormatSelection/>
                            <InitQuotationForm/>
                        </div>
                    </div> }

               


            </div>

            <div className="w-50 position-relative">
                <div className="design-canvas h-100 w-100"></div>
                <img
                    src={canvasMask}
                    className="position-absolute h-100 w-100 object-fit-cover top-0"
                    alt="Environment Image"/>
            </div>

        </div>

    );
}