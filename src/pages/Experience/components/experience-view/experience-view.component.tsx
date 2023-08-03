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
import './experience-view.component.css';

export const ExperienceView = () => {
    return(

        <div className="d-flex mh-100 overflow-hidden">

            <div className="w-50 p-3 h-100 experience-behavior-container">

                <div className="d-flex align-items-start">
                    <div className="col-2">
                        <button type="button" className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">← Volver</button>
                    </div>
                    
                    <div className="col-8">
                        <ExperienceSteepTitle/>
                    </div>                    

                    <div className="col-2 text-end">
                        <button type="button" className="btn btn-sm rounded-3 btn-outline-primary experience-steeps-button">Siguiente →</button>
                    </div>
                </div>

                {
                    // PRIMER CASO DE LA EXPERIENCIA
                    
                    /* <div className="d-flex pt-4 pb-2 h-100 justify-content-around overflow-hidden">
                        <div className="h-100 col-5">
                            <ExperienceDesignSelection />
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <MosaicComponent mosaic={<MosaicSquare/>}/>
                                <MosaicActionsBar/>
                            </div>
                        </div>
                    </div> */
                }

                {
                    // SEGUNDO CASO DE LA EXPERIENCIA

                    /* <div className="d-flex pt-4 pb-2 h-100 justify-content-around overflow-hidden">
                        <div className="textures-selection-column col-5 h-100">
                            <ExperienceColorPaletteSelection />
                            <ExperienceTextureSelection />
                            <ExperienceGroutSelection />
                        </div>
                        <div className="col-5 d-flex align-items-center">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <MosaicComponent mosaic={<MosaicBrick/>}/>
                                <MosaicActionsBar/>
                            </div>
                        </div>
                    </div> */
                }

                {/* <div className="d-flex pt-4 pb-2 h-100 justify-content-around overflow-hidden">
                        <div className="col-5 d-flex">
                            <div className="d-flex flex-column gap-3 w-100 position-relative">
                                <MosaicComponent mosaic={<MosaicHexagon/>}/>
                            </div>
                        </div>
                        <div className="textures-selection-column col-5 h-100">
                        <ExperienceColorPaletteSelection />
                            <ExperienceTextureSelection />
                            <ExperienceGroutSelection />
                        </div>
                    </div> */}

                <div className="d-flex pt-4 pb-2 h-100 justify-content-around overflow-hidden">
                    <div className="col-5 d-flex">
                        <div className="d-flex flex-column gap-3 w-100 position-relative">
                            <MosaicComponent mosaic={<MosaicHexagon/>}/>
                        </div>
                    </div>
                    <div className="textures-selection-column col-5 h-100">
                    {/* <ExperienceColorPaletteSelection />
                        <ExperienceTextureSelection />
                        <ExperienceGroutSelection /> */}
                    </div>
                </div> 


            </div>

            <div className="w-50 position-relative">
                <div className="design-canvas h-100 w-100"></div>
                <img
                    src="https://corona.texelbit.com:9445/uploads/Environment/7d3a1f12-b656-4c1c-8576-36c4a4b1c4a3.png"
                    className="position-absolute h-100 w-100 object-fit-cover top-0"
                    alt="Environment Image"/>
            </div>

        </div>

    );
}