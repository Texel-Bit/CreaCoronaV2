
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
import { FaSearchPlus, FaTrashAlt } from "react-icons/fa";
import { getServerImagesUrl } from "../../../../shared/utilities/format-server-endpoints.utility";
import { convertHtmlToImage } from "../../../../shared/utilities/html-to-image.utility";
import { idText } from "typescript";
import { IGrout } from "../../../../core/models/grout/grout.model";
import { IFormat } from "../../../../core/models/format/format.model";
import { IStructure } from "../../../../core/models/structure/structure.model";
import { ExperienceFormatThumbnailProps } from "../../../../shared/components/experience-format-selection/experience-format-thumbnail/experience-format-thumbnail";
import { StructureThumbnailProps } from "../../../../shared/components/experience-structure-selection/structure-thumbnail/structure-thumbnail.component";


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
    const [selectedDesigns, setSelectedDesigns] = useState<HTMLElement[]>();
    const [canvasMask, setCanvasMask] = useState("");
    const [canvasImage, setCanvasImage] = useState("");
    const [mosaicGrout, setMosaicGrout] = useState("");
    const [formats, setFormats] = useState<ExperienceFormatThumbnailProps[]>();
    const [selectedFormatScale, setSelectedFormatScale] = useState(1);
    const [structures, setStructures] = useState<StructureThumbnailProps[]>();
    

    const [colorType, setColorType] = useState(1);


    useEffect(() => {
       updateCanvas();
    }, [mosaicGrout]);


function ChangeChessMode()
{
    Singleton.getInstance().ChangeChessMode();
}

    
function SelectFormat(newFormat:IFormat)
{
    Singleton.getInstance().SelectFormat(newFormat);
    let newScale = Singleton.getInstance().currentEnvironment?.environmentAngle.size + (newFormat.height / 100);
    setSelectedFormatScale(newScale);
    updateCanvas();
}


function SelectStructure (newStructure: IStructure)
{
    
}


function UpdateFormats(currrentFormats:IFormat[])
{
    let formatsCollection = currrentFormats.map(format => ({
        format,
        onClick: SelectFormat
    }));

    setFormats(formatsCollection);
}


function UpdateStructures(currrentStructure:IStructure[])
{
    let structuresCollection = currrentStructure.map(structure => ({
        structure,
        onClick: SelectStructure
    }));

    setStructures(structuresCollection);
}

function MosaicGroutChanged(currrentGrout:IGrout)
{
    setMosaicGrout(getServerImagesUrl(currrentGrout.source))
}

    

    useEffect(() => {

    }, [colorType]);


    useEffect(() => {
        if(Singleton.getInstance().currentGrout)
        {
            Singleton.getInstance().ChangeGrout(Singleton.getInstance().currentGrout);
        }

        let currentDesignTypes = Singleton.getInstance().getDesignTypeDataManager().getAllDesignTypes() ?? [];
        setDesignTypes(currentDesignTypes);

        let currentDesignsSelected = Singleton.getInstance().GetSelectedDesigns() ?? []; 

        Singleton.getInstance().updateMosaicGroutFunc=MosaicGroutChanged;
        Singleton.getInstance().updateMosaicFunc = updateMosaic;
        Singleton.getInstance().updateFormatsFunc = UpdateFormats;
        Singleton.getInstance().updateStructuresFunc = UpdateStructures;

        if (Singleton.getInstance().currentEnvironment != null)
        {
            let maskImage = getServerImagesUrl(Singleton.getInstance().currentEnvironment?.maskImage ?? "");
            setCanvasMask(maskImage);
        }
    }, []);


    

    const updateCanvas =  () => {
         setTimeout(async() => {
            let element = document.getElementById("mosaic-element");

        if (element)
        {
            let elementSvg = await convertHtmlToImage(element);
            setCanvasImage(elementSvg ?? "");
        }
        }, 500);
        
    }

    function updateMosaic(HTMLElement:HTMLElement[]) {
        setSelectedDesigns(HTMLElement)
        let colorTypeId = Singleton.getInstance().GetCurrenColorTypeID();
        setColorType(colorTypeId);
    }
    

    useEffect(()=>{
       updateCanvas();
    },[selectedDesigns])

    
    function ChangeView(experieceView: ExperienceViews | null, value:number)
    {
        if(experieceView)
        {
            let numericalValue: number = experieceView;
            let view: ExperienceViews = numericalValue + value;
            Singleton.getInstance().ChangeExperienceView(view);
            Singleton.getInstance().UpdateViewsStatus();

            if (experieceView == ExperienceViews.Format)
                Singleton.getInstance().UpdateFormats();
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
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false} />
                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: () => {}, icon: FaSearchPlus, text: "Vista Previa", styleColor: "" },
                                                { buttonClick: () => {}, icon: FaTrashAlt, text: "Eliminar", styleColor: "red" }
                                            ]}/>
                                    </>
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.id == 2 && 
                                    <MosaicComponent
                                        mosaic={<MosaicSquare squares={selectedDesigns??[]} grout={mosaicGrout}/>}
                                        actions={true}/>
                                }

                                {
                                    Singleton.getInstance().selectedDesignType?.id == 1 && 
                                    <MosaicComponent 
                                        mosaic={<MosaicBrick brick={selectedDesigns![0] ?? null} grout={mosaicGrout}/>}
                                        actions={false}/>
                                }
                            </div>
                        </div>
                    </div> 
                }

                {
                    props.currentView==ExperienceViews.Color&&
                    // SEGUNDO CASO DE LA EXPERIENCIA

                    <div className="d-flex pt-4 h-100 justify-content-around overflow-hidden">
                        <div className="textures-selection-column col-5 h-100">
                            {colorType==2 &&<ExperienceColorPaletteSelection />}
                            <ExperienceTextureSelection colorArray={
                                Singleton.getInstance().getColorDataManager().GetAllColors(
                                    Singleton.getInstance().currentDesignList?.[0]?.fullField ?? true
                                )
                            } 
                        />
                        <ExperienceGroutSelection grouts={Singleton.getInstance().getgroutDataManager().getAllGrouts()} />
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                {
                                    Singleton.getInstance().selectedDesignType?.id === 3 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false} />
                                    </>
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.id == 2 && 
                                    <MosaicComponent
                                        mosaic={<MosaicSquare squares={selectedDesigns??[]} grout={mosaicGrout}/>}
                                        actions={true}/>

                                }
                                 {
                                    Singleton.getInstance().selectedDesignType?.id == 2 && 
                                 <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: () => {}, icon: FaSearchPlus, text: "Vista Previa", styleColor: "" },
                                                { buttonClick: () => {ChangeChessMode()}, icon: FaTrashAlt, text: "Modo Ajedrez", styleColor: "red" },
                                                { buttonClick: () => {}, icon: FaTrashAlt, text: "Eliminar", styleColor: "red" }
                                            ]}/>
                                        }

                                {
                                    Singleton.getInstance().selectedDesignType?.id == 1 && 
                                    <MosaicComponent 
                                        mosaic={<MosaicBrick brick={selectedDesigns![0]?? null} grout={mosaicGrout}/>}
                                        actions={false}/>
                                }
                            </div>
                        </div>
                    </div> 
                }

                {
                    props.currentView==ExperienceViews.Format&&
                    <div className="d-flex pt-1 h-100 justify-content-around overflow-hidden">
                        <div className="col-5 d-flex">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <ExperienceStructureSelection structures={structures ?? []}
                                />
                                {
                                    Singleton.getInstance().selectedDesignType?.id === 3 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false} />
                                    </>
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.id == 2 && 
                                    <MosaicComponent
                                        mosaic={<MosaicSquare squares={selectedDesigns??[]} grout={mosaicGrout}/>}
                                        actions={true}/>
                                }

                                {
                                    Singleton.getInstance().selectedDesignType?.id == 1 && 
                                    <MosaicComponent 
                                        mosaic={<MosaicBrick brick={selectedDesigns![0]?? null} grout={mosaicGrout}/>}
                                        actions={false}/>
                                }
                            </div>
                        </div>
                        <div className="textures-selection-column d-flex flex-column col-5 h-100">
                            <ExperienceFormatSelection formats={formats ?? []} />
                            <InitQuotationForm/>
                        </div>
                    </div>
                }

               


            </div>

            <div className="w-50 h-100">
                <ExperienceCanvas 
                    backgroundImage={canvasImage}
                    mask={canvasMask}
                    perspective={1000}
                    perspectiveOrigin={{
                        X: Singleton.getInstance().currentEnvironment?.environmentAngle.origen.x,
                        Y: Singleton.getInstance().currentEnvironment?.environmentAngle.origen.y
                    }}
                    rotationX={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatex}
                    rotationY={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatey}
                    rotationZ={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatez}
                    scale={selectedFormatScale}/>
            </div>

        </div>

    );
}