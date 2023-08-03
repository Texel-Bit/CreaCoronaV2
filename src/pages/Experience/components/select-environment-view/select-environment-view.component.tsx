import { Carousel } from "react-bootstrap";
import { TextCaption } from "../../../../shared/components/caption/text-caption/text-caption.component";
import './select-environment-view.component.css';
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import { useEffect, useState } from "react";
import { getServerEndpointUrl } from "../../../../shared/utilities/format-server-endpoints.utility";

interface enviroment{toParent:(data:string)=>void , toProgress:(data:number)=>void}
export const SelectEnvironmentView:React.FC<enviroment> = (props) => {

    const consult       = getServerEndpointUrl('environment/getAllEnvironment');
    const [res,setRes]  = useState(Object)
    const enviroment = sessionStorage.getItem('ambiente')

    useEffect(()=>{
        fetch(consult,{method:'GET',headers:{'Content-type':'application/json','Jwt': `${sessionStorage.getItem('infoUser')}` }})
        .then(d=>d.json())
        .then(d=>{handlerResponse(d.data) ; console.log(d)})
        .catch(e=>console.log(e));
    },[]);

    function handlerResponse(datos:[]){setRes(datos)}

    return(
        <div className="h-100 d-flex">
            
            <div className="col-6 h-100 px-5 environment-text-container">
                <TextCaption/>
            </div>

            <div className="col-6 px-5 d-flex align-items-center">

                <div>
                    <h4 className="mb-5 pb-5 text-center color-primary fw-bold">
                        Selecciona el ambiente en el que deseas simular la instalación de tu creación.
                    </h4>
                    <div>

                        <Carousel
                            interval={null}
                            wrap={false}>
                                { res.length>0 && res.map((i:any)=>{
                                    if(i.EnvironmentType_idEnvironmentType==enviroment){
                                        return<>
                                        <Carousel.Item>
                                            <EnvironmentThumbnail
                                                nombre={i.EnvironmentTypeName}
                                                imagen={i.EnvironmentTypeImage}
                                                ambiente={i.idEnvironmentType}
                                                toParent={(props.toParent)}
                                                toProgress={props.toProgress}
                                            />
                                        </Carousel.Item> 
                                        </>
                                    }
                                })}                                                      
                        </Carousel>

                        
                    </div>
                </div>
            </div>

        </div>
    );
}

