import ColorDataManager from "../managers/color-data.manager";
import DesignDataManager from "../managers/desig-data.manager";
import DesignTypeDataManager from "../managers/design-type.data-manager";
import EnvironmentDataManager from "../managers/environment.data.manager";
import EnvironmentTypeDataManager from "../managers/environment.type-data.manager";
import FormatDataManager from "../managers/format-data.manager";
import StructureDataManager from "../managers/structure-data.manager";
import groutDataManager from "../managers/grout-data.manager";
import { IEnvironment } from "../models/environment/environment.model";
import { IEnvironmentType } from "../models/EnvironmentType/environment-type.model";
import { IDesignType } from "../models/designType/design-type.model";
import { IDesign } from "../models/design/design.model";
import { IColor } from "../models/color/color.model";
import { IGrout } from "../models/grout/grout.model";
import { IStructure } from "../models/structure/structure.model";
import { IFormat } from "../models/format/format.model";
import { ExperienceViews } from "../../shared/enums/routes.enum";
import { INumberData } from "../models/NumberData/number-data.model";
import { ElementFlags } from "typescript";
import { IColorBundle } from "../models/color/color-bundle.model";
import SvgTexturizer, { TexturizeSvgOptions } from "../../shared/utilities/svg-texturizer.utility";
import { getServerImagesUrl } from "../../shared/utilities/format-server-endpoints.utility";

class Singleton {
  private static instance: Singleton;


  public currentEnvironmentType: IEnvironmentType | null = null;
  public currentEnvironment: IEnvironment | null = null;
  public currentDesignList:IDesign[]| null = null;
  public currentColorList:IColor[]| null = [];
  public colorBundleList:IColorBundle[]| null = null;
  public currentStructure: IStructure | null = null;
  public currentGrout: IGrout | null = null;
  public currentFormat: IFormat | null = null;
  public simulationArea:INumberData| null = null;
  public simulationWidht:INumberData| null = null
  public simulationHeight:INumberData| null = null
  

  public selectedDesignType:IDesignType| null = null
  public currentMosaicIndexSelected:number = -1

  
  public chessMode:boolean| null = null;


  public currentExperienceView:ExperienceViews| null = ExperienceViews.EnvironmentType;
setContentFunc: ((view: ExperienceViews) => void) | null = null;
evaluatePercentageFunc: ((percentage:number) => void) | null = null;
updateMosaicFunc: ((HTMLElement:HTMLElement[]) => void) | null = null;
updateViewStatusFunc: Array<() => void> = [];

  private environmentDataManager: EnvironmentDataManager = new EnvironmentDataManager();
  private environmentTypeDataManager: EnvironmentTypeDataManager = new EnvironmentTypeDataManager();
  private designTypeDataManager: DesignTypeDataManager = new DesignTypeDataManager();
  private designDataManager: DesignDataManager = new DesignDataManager();
  private colorDataManager: ColorDataManager = new ColorDataManager();
  private groutDataManager: groutDataManager = new groutDataManager();
  private structureDataManager: StructureDataManager = new StructureDataManager();
  private formatDataManager: FormatDataManager = new FormatDataManager();

  private constructor() { }

  public static getInstance(): Singleton {
      if (!Singleton.instance) {
          Singleton.instance = new Singleton();
      }
      return Singleton.instance;
  }


  public ChangeMosaicIndex(newIndex:number)
  {
      this.currentMosaicIndexSelected=newIndex;
      console.log("Change Index");
  }


  public GetCurrenColorTypeID()
  {
      if(this.currentDesignList)
      {
        if(this.currentDesignList.length>0)
        {
            return this.currentDesignList[0].fullField?1:2;
        }
      }

      return 1
  }

  public SwapMosaicItems(fromIndex: number, toIndex: number) {
    if(this.currentDesignList)
        [this.currentDesignList[fromIndex], this.currentDesignList[toIndex]] = [this.currentDesignList[toIndex], this.currentDesignList[fromIndex]];
    
        this.TexturizeMosaic();
}
  
  public SelectEnvironmentType(environmentType:IEnvironmentType) {
    console.log("SelectEnvironmentType called with environmentType", environmentType);
    this.currentEnvironmentType=environmentType;
    this.EvaluatePercentage();
  }


  public ValidateViewCompleteStatus(currentView:ExperienceViews) {
    let viewComplete =false;

    if(currentView==ExperienceViews.EnvironmentType)
    {
        if(this.currentEnvironmentType)
        {
            return true;
        }
    }

    if(currentView==ExperienceViews.Environment)
    {
        if(this.currentEnvironment)
        {
            return true;
        }
    }

    if(currentView==ExperienceViews.Design)
    {

        if(this.currentDesignList )
        {
            if(this.currentDesignList.length>0 )
            {
                return true;
            }
           
        }
    }

    if(currentView==ExperienceViews.Color)
    {
        if(this.currentColorList&& this.currentGrout)
        {
            return true;
        }
    }

    if(currentView==ExperienceViews.Format)
    {
        if(this.currentFormat && this.currentStructure && (this.simulationArea||(this.simulationWidht && this.simulationHeight)))
        {
            return true
        }
    }
   
 
    return viewComplete;


  }

  


  public AddDesignToMosaic(design: IDesign) {

    console.log("Add deign to mosaic selected");
    const currentDesigns = this.GetSelectedDesigns();

    if (currentDesigns && currentDesigns.length > 0) {
        // Check if the design is already in the list

        if(currentDesigns[0].fullField!==design.fullField)
        {
            console.log("Add deign to mosaic selected 2");
            this.currentDesignList=[]
            let maxDesignSelected = this.selectedDesignType?.mosaicValue ?? 1;
            for (let i = 0; i < maxDesignSelected; i++) {
                this.currentDesignList.push(design);
            }

            this.TexturizeMosaic();
            
        }
        else if(this.currentMosaicIndexSelected>= 0 &&this.currentDesignList){
            console.log("Add deign to mosaic selected 2");
            this.currentDesignList[this.currentMosaicIndexSelected] = design;
            this.TexturizeMosaic();
        }
        else
        {
            if(this.selectedDesignType?.mosaicValue==1)
            {
                this.currentDesignList=[]
                this.currentDesignList.push(design);
                this.TexturizeMosaic();
            }
            console.log("Add deign to mosaic selected 3");
        }
       
    } else  {
        console.log("Add deign to mosaic selected 2");
        this.currentDesignList=[]
        let maxDesignSelected = this.selectedDesignType?.mosaicValue ?? 1;
        
        for (let i = 0; i < maxDesignSelected; i++) {
            this.currentDesignList.push(design);
        }

        this.TexturizeMosaic();
    }
}


public AddBundle(bundle:IColorBundle)
{
    // Initialize the list if it's not already initialized
    if(!this.colorBundleList)
    {
        this.colorBundleList = [];
    }

    // Check if a bundle with the same id already exists in the list
    const bundleExists = this.colorBundleList.some(existingBundle => existingBundle.id === bundle.id);

    // Only add the new bundle to the list if a bundle with the same id doesn't already exist
    if (!bundleExists) {
        this.colorBundleList.push(bundle);
    }
}


public ClearBundles()
{
    this.colorBundleList=[]

}
    public ChangeExperienceView(view: ExperienceViews) {
        if (this.setContentFunc) {
            this.currentExperienceView=view;
            this.setContentFunc(view);
        }

        this.UpdateViewsStatus();
    }

    public EvaluatePercentage() {
        if (this.evaluatePercentageFunc) {
            
            const maxPercentageValue=5;

            let currProggressDone=0;

            if(this.currentEnvironment)
            {
                currProggressDone+=1;
            }
            if(this.currentEnvironmentType)
            {
                currProggressDone+=1;
            }
            if(this.currentDesignList)
            {
                currProggressDone+=1;
            }
            if(this.currentColorList && this.currentGrout)
            {
                currProggressDone+=1;
            }
            
            let AreaComplete=false;

            if(this.simulationArea)
            {
                AreaComplete=true;
            }
            else if(this.simulationWidht && this.simulationHeight)
            {
                AreaComplete=true;
            }

            if(this.currentFormat && this.currentStructure &&AreaComplete)
            {
                currProggressDone+=1;
            }
           
           
           

            let Percentage=currProggressDone*100/maxPercentageValue;
            if(Percentage>100)
            {
                Percentage=100;
            }
            this.evaluatePercentageFunc(Percentage);
        }
    }

    private async TexturizeMosaic() {
        let TexturizedOptions: TexturizeSvgOptions[];
    
        if(this.currentColorList) {
            let texturizer = new SvgTexturizer();
    
            TexturizedOptions = this.currentColorList.map((color,index) => {
                return {layerId: `layer${index}`,textureUrl: getServerImagesUrl(color.source),tile: 1}
            });
    
            if(this.currentDesignList)
            {
                let designPromises = this.currentDesignList.map(async(design) => {
                    let texturizedDesign = await texturizer.texturize(getServerImagesUrl(design.source), TexturizedOptions);
                    return texturizedDesign;
                });
                let TexturizedDesigns: HTMLElement[] = await Promise.all(designPromises); // wait for all promises to resolve
                
                if(this.updateMosaicFunc)
                {
                    this.updateMosaicFunc(TexturizedDesigns);
                }
                
            }
           
        }
    }

    public InitializeColors(colors:IColor[])
    {
        this.currentColorList=colors;
        this.TexturizeMosaic();
    }
  
    public ChangeSelectedColor(color:IColor,index:number)
    {
          if(!this.currentColorList)
          {
              this.currentColorList=[]
          }
  
          if(this.currentColorList?.length<index)
          {
              this.currentColorList[index]=color
          }

          //this.TexturizeMosaic();

          return this.currentColorList[index]=color
    }
  

  public SelectEnvironment(environment:IEnvironment)
  {
     this.currentEnvironment=environment;
     this.EvaluatePercentage();
  }
  // Add getters for each DataManager
  public getEnvironmentDataManager(): EnvironmentDataManager {
      return this.environmentDataManager;
  }

  public UpdateViewsStatus()
  {

    console.log("Updating view status ",this.updateViewStatusFunc)
    this.updateViewStatusFunc.forEach(element => {
       
       element();
    });
  }

  public getEnvironmentTypeDataManager(): EnvironmentTypeDataManager {
      return this.environmentTypeDataManager;
  }

  public getDesignTypeDataManager(): DesignTypeDataManager {
      return this.designTypeDataManager;
  }

  public getDesignDataManager(): DesignDataManager {
      return this.designDataManager;
  }

  public getColorDataManager(): ColorDataManager {
      return this.colorDataManager;
  }





  public getgroutDataManager(): groutDataManager {
      return this.groutDataManager;
  }

  public getStructureDataManager(): StructureDataManager {
      return this.structureDataManager;
  }

  public getFormatDataManager(): FormatDataManager {
      return this.formatDataManager;
  }

  public addEnvironment(environment: IEnvironment): void {
    this.environmentDataManager.addEnvironment(environment);
}

public addEnvironmentType(environmentType: IEnvironmentType): void {
    
    console.log("Attemping to add environment type ",environmentType)
    this.environmentTypeDataManager.addEnvironmentType(environmentType);
}

public addDesignType(designType: IDesignType): void {

    this.designTypeDataManager.addDesignType(designType);

    

    let environmentTypeArray = this.environmentTypeDataManager.getAllEnvironmentTypeArray();

    environmentTypeArray.forEach(element => {
        if(element.designTypesIDS.some(e => e === designType.id)) {
            // The designType.id exists in the designTypesIDS array of the current element.
            // Perform the necessary operations here.
        }
        else{
            element.designTypes?.push(designType);
        }
    });

}

public addDesign(design: IDesign): void {
   
    this.designDataManager.addDesign(design);
}

public GetSelectedDesigns()
{
   
    if(this.currentDesignList)
    {
        return this.currentDesignList.slice();
    }
    
    return this.GenerateDefaultDesignsSelected();
}

public GenerateDefaultDesignsSelected() {
    let maxDesignSelected = this.selectedDesignType?.mosaicValue ?? 1;
    const currentDesigns = this.getDesignDataManager().getAllDesigns();

    this.currentDesignList = []
   

    if(currentDesigns.length>0)
    {
        if(currentDesigns[0].fullField)
        {
            for (let i = 0; i < maxDesignSelected; i++) {
                this.currentDesignList.push(currentDesigns[0]);
            }
        }
        else
        {
            for (let i = 0; i < maxDesignSelected; i++) {
                if (currentDesigns[i]) {
                    this.currentDesignList.push(currentDesigns[i]);
                } else {
                    break; // exit the loop if there are no more designs
                }
            }
        }
    }
    
    this.TexturizeMosaic();

}

public addColor(color: IColor): void {
    this.colorDataManager.addColor(color);
}

public removeALlColors(): void {
    this.colorDataManager.removeALlColors();
}

public addGrout(grout: IGrout): void {
    this.groutDataManager.addGrout(grout);
}

public addStructure(structure: IStructure): void {
    this.structureDataManager.addStructure(structure);
}

public addFormat(format: IFormat): void {
    this.formatDataManager.addFormat(format);
}
}

export default Singleton;
