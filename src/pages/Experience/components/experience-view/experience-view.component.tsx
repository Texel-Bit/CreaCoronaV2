
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
import {ColorIndexSelection} from "../ColorIndexSelection/colorIndexSelection.component"
import './experience-view.component.css';
import { ReactElement, useEffect, useRef, useState } from 'react';

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
import { FaSearchPlus, FaTrashAlt,FaDelicious } from "react-icons/fa";
import { RxRotateCounterClockwise } from "react-icons/rx";
import { getServerImagesUrl } from "../../../../shared/utilities/format-server-endpoints.utility";
import { convertHtmlToImage } from "../../../../shared/utilities/html-to-image.utility";
import { idText, isStringLiteral } from "typescript";
import { IGrout } from "../../../../core/models/grout/grout.model";
import { IFormat } from "../../../../core/models/format/format.model";
import { IStructure } from "../../../../core/models/structure/structure.model";
import { ExperienceFormatThumbnailProps } from "../../../../shared/components/experience-format-selection/experience-format-thumbnail/experience-format-thumbnail";
import { StructureThumbnailProps } from "../../../../shared/components/experience-structure-selection/structure-thumbnail/structure-thumbnail.component";
import { getDesgignWithStructure } from "../../../../core/services/structure.services";
import { PreviewModal, PreviewModalProps } from "../../../../shared/components/preview-modal/preview-modal.component";
import * as lzString from 'lz-string';
import TooltipMudi from "../../../../shared/components/TooltipMudi/TooltipMudi";
import FullFieldColorStyle from "../../ExperienceStyles/FullFieldColorStyle";
import WithDesignColorStyle from "../../ExperienceStyles/WithDesignColorStyle";
import { ModalCanvasPreview } from "../../../../shared/components/quotation-modal/modalCanvasPreview";
import { Fullscreen } from "@material-ui/icons";

interface currentExperienceView
{
    currentView:ExperienceViews | null;
}

interface contentData
{
    title:string;
    icon:string;
    description:ReactElement,
    descriptionFullColor:ReactElement
    descriptionSingleMosaic:ReactElement
}

export const ExperienceView:React.FC<currentExperienceView>=(props) => {
    
    let dict = new Map<ExperienceViews, contentData>();
    const currentEnvironmentAngle = Singleton.getInstance().currentEnvironment?.environmentAngle;

    dict.set(ExperienceViews.Design, {
        title: "Diseña el revestimiento",
        icon: CozyIco,
        description: <h6>Selecciona hasta <b className="color-middle">4 opciónes</b> de grafica</h6>,
        descriptionFullColor:<h6>Seleccionaste una opción para revestimiento sin grafica</h6>,
        descriptionSingleMosaic: <h6>Selecciona <b className="color-middle">1 opción</b> de grafica</h6>,
    });
    
    dict.set(ExperienceViews.Color, {
        title: "Agrega color a tu diseño",
        icon: PalletIco,
        description: <h6>Selecciona hasta 5 colores distintos para aplicarle a tu diseño</h6>,
        descriptionFullColor:<h6>Selecciona el color de tu preferencia de acabado brillante</h6>,
        descriptionSingleMosaic: <h6>Selecciona hasta <b className="color-middle">4 opciónes</b> de grafica</h6>,
    });



    dict.set(ExperienceViews.Format, {
        title: "Define la cantidad y cotiza",
        icon: OpenIco,
        description: <h6>Selecciona el formato y estructura de tu revestimiento, <br></br>ingresa las Medidas de tu espacio y cotiza</h6>,
        descriptionFullColor:<h6></h6>,
        descriptionSingleMosaic: <h6>Selecciona hasta <b className="color-middle">4 opciónes</b> de grafica</h6>,    });


    const [designTypes, setDesignTypes] = useState<IDesignType[]>([]);
    const [selectedDesigns, setSelectedDesigns] = useState<HTMLElement[]>();
    const [canvasMask, setCanvasMask] = useState("");
    const [canvasImage, setCanvasImage] = useState("");
    const [mosaicGrout, setMosaicGrout] = useState("");
    const [formats, setFormats] = useState<ExperienceFormatThumbnailProps[]>();
    const [selectedFormatSize, setSelectedFormatSize] = useState(1);
    const [selectedPerspective, setSelectedPerspective] = useState(500);
    const [structures, setStructures] = useState<StructureThumbnailProps[]>();
    const [previewModalStatus, setPreviewModalStatus] = useState(false);
    const [bricksRotated, setBricksRotated] = useState(false);
    const [colorSelectionLoaded, setColorSelectionLoaded] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalSize, setModalSize] = useState<"lg" | "sm" | "xl">("lg");

    const [colorSelectionStyle, setColorSelectionStyle] = useState("FullFilledExperienceView");
    

    

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState<ReactElement>();
    

    const [colorType, setColorType] = useState(1);


useEffect(() => {
    updateCanvas();
}, [mosaicGrout, selectedDesigns, bricksRotated]);

function closeModal() {
    setModalOpen(false);
  }

useEffect(() => {
    
    setColorSelectionStyle(colorType==1?"FullFilledExperienceView":"WithDesignExperienceView");

}, [colorType]);


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
        onClick: SelectFormat,
        isSelected:false
    }));

    setFormats(formatsCollection);
}


function UpdateStructures(currrentStructure:IStructure[])
{
    let structuresCollection = currrentStructure.map(structure => ({
        structure,
        isSelected:false,
        onClick: SelectStructure
    }));

    setStructures(structuresCollection);
}

function MosaicGroutChanged(currrentGrout:IGrout)
{
    setMosaicGrout(getServerImagesUrl(currrentGrout.source))
}

function ChangeColorIndex(currentIndex:number)
{
    const componentName="color-option"+currentIndex;
    Singleton.getInstance().colorIndex=currentIndex;
    console.log(componentName) 
}

useEffect(() => {
    try {
        // Get Singleton instance for easier access
        const instance = Singleton.getInstance();

        // Update grout if it exists
        if (instance.currentGrout) {
            instance.ChangeGrout(instance.currentGrout);
        }

        // Update design types
        const currentDesignTypes = instance.currentEnvironmentType?.designTypes ?? [];
        setDesignTypes(currentDesignTypes);

        // Assign update functions
        instance.updateMosaicGroutFunc = MosaicGroutChanged;
        instance.updateMosaicFunc = updateMosaic;
        instance.updateFormatsFunc = UpdateFormats;
        instance.updateStructuresFunc = UpdateStructures;

        // Update canvas mask if environment exists
        if (instance.currentEnvironment) {
            const maskImage = getServerImagesUrl(instance.currentEnvironment?.maskImage ?? "");
            setCanvasMask(maskImage);
        }
    } catch (error) {
        // Log any errors that occur during execution
        console.error("Error in useEffect:", error);
    }

 

}, []);


useEffect(()=>{
    console.log("Color selelction changed")
    if(colorSelectionLoaded)
    {
        var contenedor = document.getElementById("FullMosaicComponent");

        var div2 = document.getElementById("action__buttons");
        
        var nuevoDiv = document.getElementById("ColorIndexSelection");
        
        if(contenedor && nuevoDiv)
        {
            contenedor.insertBefore(nuevoDiv, div2);
        
        }  
        console.log("Loaded colors finish")
    }


},[colorSelectionLoaded])

const defineCanvasSize = () => {
    try {
      // Destructure for easier access
      const { currentFormat, currentEnvironment } = Singleton.getInstance();
  
      // Use nullish coalescing to provide default values
      const formatWidth = currentFormat?.width ?? 1;
      const formatHeight = currentFormat?.height ?? 1;
      const formatScale = parseFloat(currentFormat?.scale?.toString() ?? "1");
  
      // Calculate image size using Pythagorean theorem
      const imageSize = Math.sqrt(formatWidth ** 2 + formatHeight ** 2);
  
      // Log current format and image size for debugging
      console.log(currentFormat, " img size ", imageSize, currentFormat?.scale);
  
      // Calculate new size
      const environmentSize = currentEnvironment?.environmentAngle.size ?? 0;
      const newSize = (environmentSize + formatScale) * imageSize;
  
      // Log new size for debugging
      console.log("New Size ", newSize);
  
      // Set the new size
      setSelectedFormatSize(newSize);
    } catch (error) {
      // Log any errors
      console.error("Error defining canvas size:", error);
    }
  };
  

    const defineCanvasPerspective = () => {
        let newPerspective = Singleton.getInstance().currentEnvironment?.environmentAngle.perspective;
        setSelectedPerspective(newPerspective);
    }

    const getDesignByServer = async (element: HTMLElement): Promise<string> => {
        try {

            const compressedSvg = lzString.compressToBase64(element.outerHTML);
          // Prepare the request body
          const requestBody = {
            svgsContent: compressedSvg, // No need for nullish coalescing since 'element' is defined
            width: element.clientWidth,
            height: element.clientHeight,
          };
      
          // Make the API call
          const response = await getDesgignWithStructure(requestBody);
      
          // Destructure the response object
          const { status, data } = response;
      
          // Log the complete response for debugging
          console.log(response);
      
          // Return the data if the request was successful
          if (status) {
            return data as string;
          }
      
          // Return an empty string if the request was not successful
          return '';
        } catch (error) {
          // Log any errors
          console.error('Error fetching design:', error);
      
          // Return an empty string in case of an error
          return '';
        }
      };
      

    const updateCanvas = async () => {

        const singleton = Singleton.getInstance();
        let element = document.getElementById("mosaic-element") as HTMLElement;
    
        if (!element) return;
    
        if (singleton.currentExperienceView !== ExperienceViews.Format) {
            singleton.currentStructure = null;
        }
    
        await new Promise(resolve => setTimeout(resolve, 500));
    
        // Checking once and storing to avoid multiple calls to getInstance
        const currentExperienceView = singleton.currentExperienceView;
        const selectedDesignTypeId = singleton.selectedDesignType?.id;
    
        defineCanvasSize();
        defineCanvasPerspective();
    
        let elementSvg: string = "";
    
        if (currentExperienceView === ExperienceViews.Format && selectedDesignTypeId !== 3) {
            elementSvg = await getDesignByServer(element);
        } else {
            elementSvg = await convertHtmlToImage(element);
        }
    

        switch(Singleton.getInstance().selectedDesignType?.mosaicId)
        {
            case 1:
                setModalSize("lg")
                break;
                case 3:
                    setModalSize("lg")
                    break;
                    case 4:
                        setModalSize("lg")
                        break;
                        default:
                            setModalSize("lg")
                            break;
        }

        setCanvasImage(elementSvg ?? "");
        singleton.mosaicImage = elementSvg;
    
        SetupsTitles();
    }
    

    function updateMosaic(mosaicElements:HTMLElement[]) {
        let colorTypeId = Singleton.getInstance().GetCurrenColorTypeID();
        setColorType(colorTypeId);
        setSelectedDesigns(mosaicElements)
    }

    
    function ChangeView(experienceView: ExperienceViews | null, value: number) {
        // Early return if experienceView is null
        if (!experienceView) return;
    
        const singleton = Singleton.getInstance();
    
        // Calculate the new view based on the current one and the passed value
        const newView: ExperienceViews = experienceView + value;
    
        // Update the experience view in the Singleton instance
        singleton.ChangeExperienceView(newView);
    
        // Clear the current structure if the new view is not "Format"
        if (newView !== ExperienceViews.Format) {
            singleton.currentStructure = null;
        }
    
        // Update the views status in the Singleton instance
        singleton.UpdateViewsStatus();
    
        // Special handling for the "Format" view
        if (experienceView === ExperienceViews.Format) {
            singleton.UpdateFormats();
        }
    
        // Update the titles (assuming this function sets up titles based on the new view)
        SetupsTitles();
    }
    

    function SetupsTitles() {
        const singleton = Singleton.getInstance();
        const experienceView = singleton.currentExperienceView ?? ExperienceViews.Environment;
        const dictEntry = dict.get(experienceView);
      
        setTitle(dictEntry?.title ?? "");
      
        const descriptionKey = (() => {
          const currentColorTypeID = singleton.GetCurrenColorTypeID();
          console.log(currentColorTypeID," ",singleton.selectedDesignType?.mosaicId)
          if (experienceView === ExperienceViews.Design) {
            if (singleton.selectedDesignType?.mosaicValue === 1 && currentColorTypeID !== 1) {
              return 'descriptionSingleMosaic';
            }
            return currentColorTypeID === 1 ? 'descriptionFullColor' : 'description';
          }
      
          if (experienceView === ExperienceViews.Color) {
            return currentColorTypeID === 1 ? 'descriptionFullColor' : 'description';
          }
      
          if (experienceView === ExperienceViews.Format) {
            return 'description';
          }
      
          return null;
        })();
      
        if(descriptionKey)
        {
            setDescription(dictEntry?.[descriptionKey] ?? <></>);

        }
      }
      
     

      const PreviewMosaic = () => setPreviewModalStatus(true);
      
      const closeMosaicModal = () => setPreviewModalStatus(false);
      
      const RotateMosaic = () => setBricksRotated(prev => !prev);
      



    return(

        <div className="ExperienceParentContent">

            <div className="experience-behavior-container">

                <div className="d-flex align-items-start header-view" style={{position: "relative"}} >
                    <div className="col-2 btnControlsCustomCSS" style={{marginLeft: "35%",marginTop: "2%", position: "absolute"}}>
                        <button type="button" onClick={()=>ChangeView((props.currentView || null), -1)} className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">← Volver</button>
                    </div>
                    
                    <div className="col-8 titleCustomCssSteepTitle " style={{left: "45%",marginTop: "2%", position: "absolute"}}>
                        <ExperienceSteepTitle 
                            title={title}
                            description={description ?? <></>}
                            icon={dict.get(props.currentView ?? ExperienceViews.Design)?.icon ?? ""}
                        />
                    </div>


                    <div className="col-2 text-end btnControlsCustomCSS">
                        {props.currentView!==ExperienceViews.Format&& <button type="button" onClick={()=>ChangeView((props.currentView || null), 1)} className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button nextButtonCustomCss" style={{right: "-20%",marginTop: "2%", position: "absolute"}}>Siguiente →</button>}
                    </div>
                </div>

                {
                    props.currentView==ExperienceViews.Design&&
                    // PRIMER CASO DE LA EXPERIENCIA
                   
                    <div className="d-flex flex-column flex-md-row pt-xxl-5 pt-2 h-100 justify-content-xl-between align-items-start overflow-hidden gap-3 gap-xl-3 pb-4 pb-md-0 customFirstGrid" style={{padding:"0px 20px",marginTop:"7%"}}>
                        <div className="h-md-100 w-100 w-md-50 optionsCustomCss">
                        
                            <ExperienceDesignSelection designTypes={designTypes} designs={Singleton.getInstance().getDesignDataManager().getAllDesigns()??[]}/>
                        </div>
                        <div className="col-5 d-flex align-items-start mx-auto mx-md-0">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId === 4 && selectedDesigns &&
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false}
                                            width="65%" />
                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" },
                                            ]}/>
                                    </>
                                }
                                
                                {
    Singleton.getInstance().selectedDesignType?.mosaicId == 3 && 
    <>
        {
            colorType===2   &&
            <TooltipMudi content='Selecciona un cuadro para cambiar el diseño' visible={true} position='top'>
                <MosaicComponent
                    mosaic={<MosaicSquare squares={selectedDesigns ?? []} grout={mosaicGrout}/>}
                    actions={true}/>
                <MosaicActionsBar 
                    buttons={[
                        { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" }
                    ]}/>
            </TooltipMudi>
        }

        {
           colorType !== 2 &&
            <>
                <MosaicComponent
                    mosaic={<MosaicSquare squares={selectedDesigns ?? []} grout={mosaicGrout}/>}
                    actions={true}/>
                <MosaicActionsBar 
                    buttons={[
                        { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" }
                    ]}/>
            </>
        }
    </>
}


                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId == 1 && selectedDesigns&&
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicBrick brick={selectedDesigns![0] ?? null} grout={mosaicGrout} rotated={bricksRotated}/> }
                                            actions={false}/>
                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" },
                                                // { buttonClick: RotateMosaic, icon: RxRotateCounterClockwise, text: "Rotar", styleColor: "", classButton: "btn-corona-primary" }
                                            ]}/>
                                    </>
                                }
                            </div>
                        </div>
                    </div> 
                }

                {
                    props.currentView==ExperienceViews.Color&&
                    // SEGUNDO CASO DE LA EXPERIENCIA

                    <div className={`experienceContainer experienceContainerSecondCase ${colorSelectionStyle}`} >
                        
                        <div className="pallete-Colors-Selection-column  position-relative"   >
                            {colorType==2 &&<ExperienceColorPaletteSelection />}
                            
                        {/* <p className="text-muted small mt-1">Las fotografías de productos y ambientes son ilustrativas, algunos atributos de color y textura pueden variar de acuerdo a la resolución de tu pantalla y diferir de la realidad.</p> */}
                        </div>

                        <div className="FullMosaicComponentParent" style={{marginTop:"7%",width:"50%"}}>
                      
                            <div className="" id="FullMosaicComponent">
                            <h3 className="color-middle fw-bold subtitle tuObraDeArte" style={{margin:"auto", zIndex: 20,top: "-10%",marginBottom:"3%",textAlign:"left",width:"60%"}}>Tu Obra de Arte</h3>

                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId === 4 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false} 
                                            width={colorType==2?"80%":"65%"}
                                            />

{colorType==2&& <TooltipMudi content='Esta es tu seleccion de colores' visible={true} position='top'>
                        <h3 className="color-middle fw-bold subtitle" style={{marginLeft:"10%",zIndex: 20,top: "-10%"}}>Colores Seleccionados</h3>
                            </TooltipMudi>}

                                    {colorType==2 &&<ColorIndexSelection onColorSelected={ChangeColorIndex} />}

                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" }
                                            ]}/>
                                    </>
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId == 3 && 
                                    <>
                                        <MosaicComponent
                                            mosaic={<MosaicSquare squares={selectedDesigns ?? []} grout={mosaicGrout}/>}
                                            actions={true}
                                            width={colorType==2?"77%":"65%"}
                                            />
                                            {colorType==2&& <TooltipMudi content='Esta es tu seleccion de colores' visible={true} position='top'>
                        <h3 className="color-middle fw-bold subtitle coloresSeleccionados" style={{marginLeft:"10%",zIndex: 20,marginTop: "10%"}}>Colores Seleccionados</h3>
                            </TooltipMudi>}
                                    {colorType==2 &&<ColorIndexSelection onColorSelected={ChangeColorIndex} />}

                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" },
                                                ...(Singleton.getInstance().GetCurrenColorTypeID() == 2 ? [{ buttonClick: ChangeChessMode, icon: FaDelicious, text: "Modo Ajedrez", styleColor: "", classButton: "btn-corona-primary" }] : []),
                                                { buttonClick: () => {Singleton.getInstance().currentColorList=[];Singleton.getInstance().TexturizeMosaic()}, icon: FaTrashAlt, text: "Eliminar", styleColor: "red",classButton: "btn-corona-destructive"  }
                                            ]}/>
                                    </>
                                }

                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId == 1 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicBrick brick={selectedDesigns![0] ?? null} grout={mosaicGrout} rotated={bricksRotated}/>}
                                            actions={false}
                                            width="69%"/>
                                            
                                                  {colorType==2&& <TooltipMudi content='Esta es tu seleccion de colores' visible={true} position='top'>
                        <h3 className="color-middle fw-bold" style={{marginLeft:"10%", zIndex: 20,position: "absolute",top: "-10%"}}>Colores Seleccionados</h3>
                            </TooltipMudi>}                         {colorType==2 &&<ColorIndexSelection onColorSelected={ChangeColorIndex} />}

                                        <MosaicActionsBar 
                                            buttons={[
                                                { buttonClick: PreviewMosaic, icon: FaSearchPlus, text: "Vista Previa", styleColor: "", classButton: "btn-corona-primary" },
                                                // { buttonClick: RotateMosaic, icon: RxRotateCounterClockwise, text: "Rotar", styleColor: "", classButton: "btn-corona-primary" }
                                            ]}/>
                                    </>
                                }

                            </div>
                        
                        </div>
                       
                        <div className="textures-selection-column col-1 col-md-1 col-xl-6 h-md-100 position-relative" style={{marginTop:"7%",marginLeft:"0%"}}>
                            
                        {<TooltipMudi content='Podras cambiar el color seleccionado' visible={true} position='top'>
                        <h3 className="color-middle fw-bold subtitle" style={{zIndex: 20,top: "-11%"}}>Elige tu color</h3>
                            </TooltipMudi>}

                            <ExperienceTextureSelection colorArray={
                                Singleton.getInstance().getColorDataManager().GetAllColors(
                                    Singleton.getInstance().currentDesignList?.[0]?.fullField ?? true
                                )
                            } 
                        />
                        <div style={{zIndex: 20,marginTop: "0%"}}> {<TooltipMudi content='No olvides escoger tu boquilla' visible={true} position='top'>
                        <h3 className="color-middle fw-bold subtitle" style={{zIndex: 20,marginTop: "3%"}}>Elige tu boquilla</h3>
                            </TooltipMudi>}</div>
                        
                        <ExperienceGroutSelection grouts={Singleton.getInstance().getgroutDataManager().getAllGrouts()} />
                        </div>


                    </div> 
                }

                {
                    props.currentView==ExperienceViews.Format&&
                    // TERCER CASO DE LA EXPERIENCIA
                    <div className="d-flex   justify-content-md-evenly overflow-hidden flex-column flex-md-row cotizacion-view containerCotizationPreview" style={{marginTop:"15%",marginLeft:"7%",marginRight:"7%",paddingTop:"9.25rem !important"}}>
                                  
                        <div className="col-12 col-md-5 d-flex mx-auto">
                            <div className="d-flex flex-column  w-100 position-relative gap-2">
                                <ExperienceStructureSelection structures={structures ?? []}
                                />
                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId === 4 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicHexagon hexagon={selectedDesigns![0] ?? null} grout={mosaicGrout}/>} 
                                            actions={false}
                                            width="80%"
                                            marginTop="0%" />
                                       
                                    </>
                                }
                                
                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId == 3 && 
                                    <>
                                        <MosaicComponent
                                            mosaic={<MosaicSquare squares={selectedDesigns ?? []} grout={mosaicGrout}/>}
                                            actions={true}
                                            marginTop="2%"/>
                                       
                                    </>
                                }

                                {
                                    Singleton.getInstance().selectedDesignType?.mosaicId == 1 && 
                                    <>
                                        <MosaicComponent 
                                            mosaic={<MosaicBrick brick={selectedDesigns![0] ?? null} grout={mosaicGrout} rotated={bricksRotated}/>}
                                            actions={false}
                                            marginTop="0%"/>
                                       
                                    </>
                                }
                            </div>
                        </div>
                        <div className="textures-selection-column d-flex flex-column col-12 col-md-6 mx-auto h-md-100 pt-4 pt-md-0" style={{marginLeft: "5%"}}>
                            <ExperienceFormatSelection formats={formats ?? []} />
                            <InitQuotationForm states={Singleton.getInstance().currentStateList ?? []}/>
                        </div>
                    </div>
                }

               


            </div>

            <div className="canvas-content">
    <ExperienceCanvas 
        onOpenModal={()=>setModalOpen(true)}
        backgroundImage={canvasImage}
        mask={canvasMask}
        perspective={selectedPerspective}
        perspectiveOrigin={{
            X: currentEnvironmentAngle?.origin.x || 0,  // Provide fallback values
            Y: currentEnvironmentAngle?.origin.y || 0
        }}
        rotationX={currentEnvironmentAngle?.rotatex || 0}
        rotationY={currentEnvironmentAngle?.rotatey || 0}
        rotationZ={currentEnvironmentAngle?.rotatez || 0}
        size={selectedFormatSize}
    />



      < div style={{display:"none"}} className="timeline">

        <div className="timeline-step">
            {Singleton.getInstance().currentDesignList!?.length>0&&<span className="timeline-title">Diseño: {Singleton.getInstance().selectedDesignType?.name}</span>}
            <div className="timeline-content timeline-content--modifier">
            {Singleton.getInstance().currentDesignList!?.length>0&&<img className="mosaicResumeImage" src={canvasImage}/>}
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
            <span className="timeline-title">Colores: </span>
            <div className="timeline-content-colors">
                {Singleton.getInstance().currentColorList!.map((color, index) => (
                  <div key={index} className="color-item">
                  <img src={getServerImagesUrl(color.source)} alt={color.name}/>
                  <div className="color-label">
                    {color.name}
                  </div>
                </div>
                  
                ))}
            </div>
        </div>}

        <div className="timeline-step">
        {Singleton.getInstance().currentFormat?.name&&<span className="timeline-title">Formato:</span>}
            <div className="timeline-content">
                {Singleton.getInstance().currentFormat?.name}
            </div>
        </div>
        {Singleton.getInstance().currentStructure&&
        <div className="timeline-step">
            <span className="timeline-title">Estructura:</span>
           
            <div className="timeline-content">
                <img className="timeline-ImageContent" style={{maxWidth:"80px"}} src={getServerImagesUrl(Singleton.getInstance().currentStructure!?.source)} alt={Singleton.getInstance().currentStructure!.name}/>
                {Singleton.getInstance().currentStructure!.name}
            </div>
                </div> }

        </div>
            
            
        {isModalOpen && < ModalCanvasPreview closeModalEvent={closeModal} />}

        </div>
            
            <PreviewModal showState={previewModalStatus} closeModalEvent={closeMosaicModal} size={modalSize}/>

        </div>

    );
}
