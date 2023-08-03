import { useEffect, useState } from "react";
import { VideoTutorialCaption } from "../../../../shared/components/caption/video-tutorial/video-tutorial-caption.component";
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import "./select-surface-view.component.css";
import { getServerEndpointUrl } from "../../../../shared/utilities/format-server-endpoints.utility";
import Singleton from "../../../../core/patterns/singleton";
import { IEnvironmentType } from "../../../../core/models/EnvironmentType/environment-type.model";
import { ExperienceViews } from "../../../../shared/enums/routes.enum";

interface surface{}
export const SelectSurfaceView:React.FC<surface> = (props) => {

    const singleton = Singleton.getInstance();
    
    // Data URL 
    const consult       = getServerEndpointUrl('environmentType/getAllEnvironmentType');
    const [res,setRes]  = useState<IEnvironmentType[]>()

    useEffect(()=>{
        fetch(consult,{method:'GET',headers:{'Content-type':'application/json','Jwt': `${sessionStorage.getItem('infoUser')}` }})
        .then(d=>d.json())
        .then(d=>{
             // Get the Singleton instance
        const singleton = Singleton.getInstance();
        
        // Add each environment to the DataManager
        d.data.forEach((element: any) => {
            const currentEnvironment: IEnvironmentType = {
                id: element.idEnvironmentType,
                source: element.EnvironmentTypeImage                ,
                name: element.EnvironmentTypeName                ,
            };
            console.log(element)
            singleton.addEnvironmentType(currentEnvironment);
        });

        handlerResponse(singleton.getEnvironmentTypeDataManager().getAllEnvironmentTypeArray());

           })
        .catch(e=>console.log(e));
    },[]);

    function handlerResponse(datos:IEnvironmentType[]){setRes(datos)}
        
    return(
        <div className="h-100 d-flex">
            
            <div className="col-6 h-100 px-5 video-tutorial-container">
                <VideoTutorialCaption/>
            </div>

            <div className="col-6 px-5 d-flex align-items-center">
                <div>
                    <h4 className="mb-5 pb-5 text-center color-primary fw-bold">Selecciona la superficie en el que deseas simular la instalación de tu creación.</h4>
                    <div className="d-flex gap-4 justify-content-around">
                        {   singleton.getEnvironmentTypeDataManager().getAllEnvironmentTypeArray().map((i:IEnvironmentType)=>{
    console.log("Rendering EnvironmentThumbnail with props", i);
    return <EnvironmentThumbnail
        name={i.name}
        image={i.source}
        id={i.id}
        onEvents={[
            (e) => Singleton.getInstance().SelectEnvironmentType(i),
            (e) => Singleton.getInstance().ChangeExperienceView(ExperienceViews.Environment),
            // Add as many handlers as you need
        ]}
    />
})}

                    </div>  

                </div>

            </div>

        </div>
    );
}