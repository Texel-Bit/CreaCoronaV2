
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
import { idText, isStringLiteral } from "typescript";
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
    description:ReactElement,
    descriptionFull:ReactElement
}

export const ExperienceView:React.FC<currentExperienceView>=(props) => {
    
    let dict = new Map<ExperienceViews, contentData>();

    dict.set(ExperienceViews.Design, {
        title: "Diseña el revestimiento",
        icon: CozyIco,
        description: <h6>Selecciona hasta <b className="color-middle">4 opciónes</b> de grafica</h6>,
        descriptionFull:<h6>Seleccionaste una opción para revestimiento sin grafica</h6>
    });
    
    dict.set(ExperienceViews.Color, {
        title: "Agrega color a tu diseño",
        icon: PalletIco,
        description: <h6>Selecciona hasta 5 colores distintos para aplicarle a tu diseño</h6>,
        descriptionFull:<h6>Selecciona el color de tu preferencia de acabado brillante</h6>
    });



    dict.set(ExperienceViews.Format, {
        title: "Define la cantidad y cotiza",
        icon: OpenIco,
        description: <h6>Selecciona el formato y estructura de tu revestimiento, <br></br>ingresa las Medidas de tu espacio y cotiza</h6>,
        descriptionFull:<h6></h6>    });


    const [designTypes, setDesignTypes] = useState<IDesignType[]>([]);
    const [selectedDesigns, setSelectedDesigns] = useState<HTMLElement[]>();
    const [canvasMask, setCanvasMask] = useState("");
    const [canvasImage, setCanvasImage] = useState("");
    const [mosaicGrout, setMosaicGrout] = useState("");
    const [formats, setFormats] = useState<ExperienceFormatThumbnailProps[]>();
    const [selectedFormatSize, setSelectedFormatSize] = useState(1);
    const [selectedPerspective, setSelectedPerspective] = useState(500);
    const [structures, setStructures] = useState<StructureThumbnailProps[]>();
    
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<ReactElement>();
    

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
    updateCanvas();
}


function SelectStructure (newStructure: IStructure)
{
    Singleton.getInstance().SelectStructure(newStructure);
    updateCanvas();
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
                let formatWidth = Singleton.getInstance().currentFormat?.width ?? 1;
                let formatHeight = Singleton.getInstance().currentFormat?.height ?? 1;
                let imageSize = Math.sqrt(formatWidth ** 2 + formatHeight ** 2);

                let newSize = (Singleton.getInstance().currentEnvironment?.environmentAngle.size + Singleton.getInstance().currentFormat?.scale) * imageSize;
                setSelectedFormatSize(newSize);
                
                let newPerspective = Singleton.getInstance().currentEnvironment?.environmentAngle.perspective;
                setSelectedPerspective(newPerspective);

                let elementSvg = await convertHtmlToImage(element);
                setCanvasImage(elementSvg ?? "");

                
            }

        }, 500);

        SetupsTitles();
    }

    function updateMosaic(mosaicElements:HTMLElement[]) {
        let colorTypeId = Singleton.getInstance().GetCurrenColorTypeID();
        setColorType(colorTypeId);
        setSelectedDesigns(mosaicElements)
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

            SetupsTitles();
           
        }
    }

function SetupsTitles()
{
   const experieceView=Singleton.getInstance().currentExperienceView??ExperienceViews.Environment;

    setTitle(dict.get(experieceView)?.title??"")

    if(experieceView==ExperienceViews.Design)
    {
        if(Singleton.getInstance().GetCurrenColorTypeID()==1)
        {
            setDescription(dict.get(experieceView)?.descriptionFull??<></>)
        }
        else{
            setDescription(dict.get(experieceView)?.description??<></>)
        }
    }
    else if(experieceView==ExperienceViews.Color)
    {
        if(Singleton.getInstance().GetCurrenColorTypeID()==1)
        {
            setDescription(dict.get(experieceView)?.descriptionFull??<></>)
        }
        else{
            setDescription(dict.get(experieceView)?.description??<></>)
        }
    }
}

    return(

        <div className="d-flex mh-100 flex-column flex-md-row pt-4 pt-md-0 px-2 px-md-0">

            <div className="w-100 w-md-50 p-md-3 px-xl-5 h-100 experience-behavior-container pb-4 pb-md-0 pt-xl-1">

                <div className="d-flex align-items-start header-view">
                    <div className="col-2">
                        <button type="button" onClick={()=>ChangeView((props.currentView || null), -1)} className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">← Volver</button>
                    </div>
                    
                    <div className="col-8">
                        <ExperienceSteepTitle 
                            title={title}
                            description={description ?? <></>}
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
                    
                    <div className="d-flex flex-column flex-md-row pt-xxl-5 pt-2 h-100 justify-content-xl-between align-items-start overflow-hidden gap-3 gap-xl-3 pb-4 pb-md-0">
                        <div className="h-md-100 w-100 w-md-50">
                            
                            <ExperienceDesignSelection designTypes={designTypes} designs={Singleton.getInstance().getDesignDataManager().getAllDesigns()??[]}/>
                        </div>
                        <div className="col-5 d-flex align-items-start mx-auto mx-md-0">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                {
                                    Singleton.getInstance().selectedDesignType?.id === 3 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false} />
                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: () => {}, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" },
                                                { buttonClick: () => {}, icon: FaTrashAlt, text: "Eliminar", styleColor: "", classButton: "btn-corona-destructive" }
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
                                    Singleton.getInstance().selectedDesignType?.id == 1 && selectedDesigns&&
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

                    <div className="d-flex flex-column flex-md-row pt-2 pt-xxl-5 h-100 justify-content-md-between overflow-hidden gap-4 gap-md-0">
                        <div className="textures-selection-column col-12 col-md-7 h-md-100 position-relative">
                            {colorType==2 &&<ExperienceColorPaletteSelection />}
                            <ExperienceTextureSelection colorArray={
                                Singleton.getInstance().getColorDataManager().GetAllColors(
                                    Singleton.getInstance().currentDesignList?.[0]?.fullField ?? true
                                )
                            } 
                        />
                        <ExperienceGroutSelection grouts={Singleton.getInstance().getgroutDataManager().getAllGrouts()} />
                        </div>
                        <div className="col-5 col-md-4 d-flex align-items-start mx-auto mx-md-0">
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
                                                { buttonClick: () => {}, icon: FaSearchPlus, text: "Vista Previa", styleColor: "",classButton: "btn-corona-primary" },
                                               /* { buttonClick: () => {ChangeChessMode()}, icon: FaTrashAlt, text: "Modo Ajedrez", styleColor: "red" },*/
                                                { buttonClick: () => {}, icon: FaTrashAlt, text: "Eliminar", styleColor: "red",classButton: "btn-corona-destructive"  }
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
                    <div className="d-flex pt-4 pt-md-2 pt-xxl-5 h-100 justify-content-md-between overflow-hidden flex-column flex-md-row">
                        <div className="col-12 col-md-5 d-flex mx-auto mx-md-0">
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
                        <div className="textures-selection-column d-flex flex-column col-12 col-md-6 mx-auto mx-md-0 h-md-100 pt-4 pt-md-0">
                            <ExperienceFormatSelection formats={formats ?? []} />
                            <InitQuotationForm states={Singleton.getInstance().currentStateList ?? []}/>
                        </div>
                    </div>
                }

               


            </div>

            <div className="w-100 w-md-50 h-md-100">
    <ExperienceCanvas 
        backgroundImage={canvasImage}
        mask={canvasMask}
        perspective={selectedPerspective}
        perspectiveOrigin={{
            X: Singleton.getInstance().currentEnvironment?.environmentAngle.origin.x,
            Y: Singleton.getInstance().currentEnvironment?.environmentAngle.origin.y
        }}
        rotationX={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatex}
        rotationY={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatey}
        rotationZ={Singleton.getInstance().currentEnvironment?.environmentAngle.rotatez}
        size={selectedFormatSize}
    />
      <div className="timeline">

        <div className="timeline-step">
            <span className="timeline-title">Diseño: {Singleton.getInstance().selectedDesignType?.name}</span>
            <div className="timeline-content timeline-content--modifier">
                <img className="mosaicResumeImage" src={canvasImage}/>
                <div className="timeline-colors">
                    {
                        Singleton.getInstance().currentDesignList &&
                        Singleton.getInstance().currentDesignList!.map((element, index) => (
                            <p key={index}>{element.name}</p>
                        ))
                    }
                </div>
            </div>
        </div>

        {Singleton.getInstance().currentColorList!?.length>0&& <div className="timeline-step">
            <span className="timeline-title">Colores: ({Singleton.getInstance().GetCurrenColorTypeID()==1?"Campo Lleno":"Con Diseño"})</span>
            <div className="timeline-content">
                {Singleton.getInstance().currentColorList!.map((color, index) => (
                    <div key={index} className="color-item">
                        <img src={getServerImagesUrl(color.source)} alt={color.name}/>
                        {color.name}
                    </div>
                ))}
            </div>
        </div>}

        <div className="timeline-step">
            <span className="timeline-title">Formato:</span>
            <div className="timeline-content">
                {Singleton.getInstance().currentFormat?.name}
            </div>
        </div>
        {Singleton.getInstance().currentStructure&&
        <div className="timeline-step">
            <span className="timeline-title">Estructura:</span>
            <div className="timeline-content">
                <img style={{maxWidth:"80px"}} src={getServerImagesUrl(Singleton.getInstance().currentStructure!?.source)} alt={Singleton.getInstance().currentStructure!.name}/>
                {Singleton.getInstance().currentStructure!.name}
            </div>
                </div> }

        </div>
            
        </div>

            
            

        </div>

    );
}