import { useEffect, useState } from "react";
import { VideoTutorialCaption } from "../../../../shared/components/caption/video-tutorial/video-tutorial-caption.component";
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import "./select-surface-view.component.css";
import { getServerEndpointUrl } from "../../../../shared/utilities/format-server-endpoints.utility";
import Singleton from "../../../../core/patterns/singleton";
import { IEnvironmentType } from "../../../../core/models/EnvironmentType/environment-type.model";
import { ExperienceViews } from "../../../../shared/enums/routes.enum";
import { getAllEnvironmentType } from "../../../../core/services/environment.service";
import { getAllDesignType, getAllGrouts } from "../../../../core/services/design.service";
import {IDesignType} from "../../../../core/models/designType/design-type.model";
import { IGrout } from "../../../../core/models/grout/grout.model";
import { getAllState } from "../../../../core/services/localization.service";
import { IState } from "../../../../core/models/State/state.model";

interface surface{}
export const SelectSurfaceView:React.FC<surface> = (props) => {

    const singleton = Singleton.getInstance();
    
    // Data URL 
    const consult       = getServerEndpointUrl('environmentType/getAllEnvironmentType');
    const [res,setRes]  = useState<IEnvironmentType[]>()

    useEffect(() => {
        const getEnvironmentTypes = async () => {
            try {
                
                Singleton.getInstance().getDesignDataManager().ClearDesigns();
                
                let response = await getAllEnvironmentType();

                response.data.forEach((element: any) => {

                    let designTypeList:number[]; 
                    let idDesignType:IDesignType[]; 
                    designTypeList=[]
                    idDesignType=[]
             
                    

                    const currentEnvironment: IEnvironmentType = {
                        id: element.idEnvironmentType,
                        source: element.EnvironmentTypeImage,
                        name: element.EnvironmentTypeName,
                        designTypesIDS:element.DesignType_EnvironmentType,
                        designTypes:idDesignType
                    };
                    

                    singleton.addEnvironmentType(currentEnvironment);
               
                });

                handlerResponse(singleton.getEnvironmentTypeDataManager().getAllEnvironmentTypeArray());
            
               const designTypes=await getAllDesignType();
               designTypes.data.forEach((element2: any) => {
                let currentDesignType: IDesignType = {
                    name:element2.DesignTypeName,
                    id:element2.idDesignType,
                    source:element2.DesignTypeIconPath,
                    mosaicValue:element2.MosaicType_idMosaicType==3?4:1
                  };

                  singleton.addDesignType(currentDesignType);
            
                });

                const states=await getAllState();

               

                states.data.forEach((element2: any) => {
                 let currentState: IState = {
                     stateName:element2.stateName,
                     id:element2.idstate,
                    
                   };
                   
                   if ( singleton.currentStateList && ! singleton.currentStateList.some(item => item.id === currentState.id)) {
                    singleton.currentStateList?.push(currentState)
                  }

                 });

  
                const grouts=await getAllGrouts();

                grouts.data.forEach((grout: any) => {
                 let currentDesignType: IGrout = {
                     name:grout.brechaName,                     
                     id:grout.idbrecha,                     
                     source:grout.brechaColorPath                     
                   };
 
                   singleton.addGrout(currentDesignType);
             
                 });
            }
            catch(error) {
                console.log(error);
            }
        }

        getEnvironmentTypes();

    },[]);

    function handlerResponse(datos:IEnvironmentType[]){setRes(datos)}
        
    return(
        <div className="h-100 d-md-flex d-grid vw-100">
            
            <div className="col-6 h-100 px-5 video-tutorial-container">
                <VideoTutorialCaption/>
            </div>

            <div className="col-6 px-5">
                <div className="d-flex align-items-center w-100 h-100">
                    <div className="w-100">
                <h4 style={{fontFamily: 'Inter', fontSize: "2rem", paddingLeft: '5%', paddingRight: '5%'}} className="mb-2 pb-5 text-center color-middle fw-bold">
                Selecciona la superficie en la que aplicarás tu diseño
    </h4>
    <div className="d-flex gap-4 w-100 justify-content-around">
        {
            singleton.getEnvironmentTypeDataManager().getAllEnvironmentTypeArray().map((i:IEnvironmentType)=>{
                return <EnvironmentThumbnail
                    key={`selectSurfaceThumbnail${i.id}`}
                    name={i.name}
                    image={i.source}
                    id={i.id}
                    onEvents={[
                        (e) => Singleton.getInstance().SelectEnvironmentType(i),
                        (e) => Singleton.getInstance().ChangeExperienceView(ExperienceViews.Environment)
                    ]}/>
        })}
    </div>  

</div> 

                </div>

            </div>

        </div>
    );
}