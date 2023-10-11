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
import * as Icons from "react-icons/gi";
import Tooltip from "../../../../shared/components/Tooltip/Tooltip";

import IconPlayVideo from '../../../../assets/icons/play_circle.svg';
import { relative } from "path";
import { modalVideo } from "../../../../shared/components/caption/video-tutorial/complementos/modalVideo";
import "../../../../shared/components/caption/video-tutorial/video-tutorial-caption.component.css"
import FullscreenForeground from "./FullscreenForeground";


interface surface{}
export const SelectSurfaceView:React.FC<surface> = (props) => {


    const singleton = Singleton.getInstance();
    
    // Data URL 
    const consult       = getServerEndpointUrl('environmentType/getAllEnvironmentType');
    const [res,setRes]  = useState<IEnvironmentType[]>()

    useEffect(() => {
        const getEnvironmentTypes = async () => {
            try {
                
               if(Singleton.getInstance().getDesignTypeDataManager().getAllDesignTypes().length==0)
               {
                    const designTypes=await getAllDesignType();
                    designTypes.data.forEach((element2: any) => {
                    console.log(element2)
                    let currentDesignType: IDesignType = {
                        name:element2.DesignTypeName,
                        id:element2.idDesignType,
                        source:element2.DesignTypeIconPath,
                        mosaicValue:element2.MosaicType.MosaicTypeValue,
                        mosaicId:element2.MosaicType_idMosaicType
                    };
                    singleton.addDesignType(currentDesignType);
                
                    });
               }


               if(Singleton.getInstance().getEnvironmentTypeDataManager().getAllEnvironmentTypeArray().length===0)
               {
                let response = await getAllEnvironmentType();

                console.log(response);
                response.data.forEach((element: any) => {
                    
                    let designTypeList:number[]; 
                    let idDesignType:IDesignType[]; 
                    designTypeList=[]
                    idDesignType=[]

                    const designTypes= element.DesignType_EnvironmentType.map((item:any) => {
                       
                        return Singleton.getInstance().getDesignTypeDataManager().getDesignTypeById(item.DesignType_idDesignType);
                    });

        

                    const currentEnvironment: IEnvironmentType = {
                        id: element.idEnvironmentType,
                        source: element.EnvironmentTypeImage,
                        name: element.EnvironmentTypeName,
                        designTypes:designTypes
                    };
                    

                    singleton.addEnvironmentType(currentEnvironment);
               
                });
               }

                handlerResponse(singleton.getEnvironmentTypeDataManager().getAllEnvironmentTypeArray());
            
              
                if(Singleton.getInstance().currentStateList!.length==0)
                {
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
                }
               

                if(Singleton.getInstance().getgroutDataManager().getAllGrouts().length==0)
                {
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
  
               
            }
            catch(error) {
                console.log(error);
            }
        }

        getEnvironmentTypes();

    },[]);

    function handlerResponse(datos:IEnvironmentType[]){setRes(datos)}
        
    return(
        <div className="h-2 d-flex flex-column flex-md-row vw-1 " style={{position:"relative"}}>
            
            <div className="px-md- pl-10 pt-6 " style={{flex: 2}}>
                <div className="d-flex align-items-center w-100 h-100">
                    <div className="w-100">
                <h4 style={{fontFamily: 'Inter', fontSize: "2rem", paddingLeft: '5%', paddingRight: '5%'}} className="mb-2 pb-5 text-center color-middle fw-bold">
                Selecciona la superficie en la que aplicarás tu diseño
    </h4>
    <div className="select-surface" >
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

            <button type="button" className="button-background btn btn-primary d-flex gap-2 align-items-center button-video" style={{position:"absolute",left:"2%",bottom:"5%"}}>
                <img src={IconPlayVideo} alt="" className="icon-button-background" />
                <label className='video-button-text'  onClick={modalVideo}  >Ver tutorial</label>
            </button>
            

        </div>
    );
}