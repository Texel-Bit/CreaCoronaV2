import IColorExperienceStyle from "./IColorExperienceStyle";

class WithDesignColorStyle implements IColorExperienceStyle{

    palleteColorSelectionDisplay:string;
    experienceContainerJustifyContent:string;
    FullMosaicComponentParentScale:number;
    FullMosaicComponentMarginTop:string;

    constructor()
        {
            this.palleteColorSelectionDisplay="grid";
            this.experienceContainerJustifyContent="space-between";
            this.FullMosaicComponentParentScale=1;
            this.FullMosaicComponentMarginTop="7%";
        }

}

export default WithDesignColorStyle;