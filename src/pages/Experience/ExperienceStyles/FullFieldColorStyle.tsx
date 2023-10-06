import IColorExperienceStyle from "./IColorExperienceStyle";

class FullFieldColorStyle implements IColorExperienceStyle{

    palleteColorSelectionDisplay:string;
    experienceContainerJustifyContent:string;
    FullMosaicComponentParentScale:number;
    FullMosaicComponentMarginTop:string;

    constructor()
        {
            this.palleteColorSelectionDisplay="none";
            this.experienceContainerJustifyContent="space-evenly";
            this.FullMosaicComponentParentScale=1.4;
            this.FullMosaicComponentMarginTop="15%";
        }

}

export default FullFieldColorStyle;