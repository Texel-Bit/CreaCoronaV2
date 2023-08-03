import { useEffect, useState } from "react";
import { VideoTutorialCaption } from "../../../../shared/components/caption/video-tutorial/video-tutorial-caption.component";
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import "./select-surface-view.component.css";
import { getServerEndpointUrl } from "../../../../shared/utilities/format-server-endpoints.utility";

interface surface{toParent:(data:string)=>void , toProgress:(data:number)=>void}
export const SelectSurfaceView:React.FC<surface> = (props) => {

    // Data URL 
    const consult       = getServerEndpointUrl('environmentType/getAllEnvironmentType');
    const [res,setRes]  = useState(Object)

    useEffect(()=>{
        fetch(consult,{method:'GET',headers:{'Content-type':'application/json','Jwt': `${sessionStorage.getItem('infoUser')}` }})
        .then(d=>d.json())
        .then(d=>handlerResponse(d.data))
        .catch(e=>console.log(e));
    },[]);

    function handlerResponse(datos:[]){setRes(datos)}
        
    return(
        <div className="h-100 d-flex">
            
            <div className="col-6 h-100 px-5 video-tutorial-container">
                <VideoTutorialCaption/>
            </div>

            <div className="col-6 px-5 d-flex align-items-center">
                <div>
                    <h4 className="mb-5 pb-5 text-center color-primary fw-bold">Selecciona la superficie en el que deseas simular la instalación de tu creación.</h4>
                    <div className="d-flex gap-4 justify-content-around">
                        { res.length>0 && res.map((i:any)=>{
                            return <EnvironmentThumbnail
                            nombre={i.EnvironmentTypeName}
                            imagen={i.EnvironmentTypeImage}
                            ambiente={i.idEnvironmentType}
                            toParent={props.toParent}
                            toProgress={props.toProgress}
                            />
                        })}

                    </div>  

                </div>

            </div>

        </div>
    );
}