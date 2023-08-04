import { Carousel } from "react-bootstrap";
import { TextCaption } from "../../../../shared/components/caption/text-caption/text-caption.component";
import './select-environment-view.component.css';
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import { useEffect, useState } from "react";
import { getServerEndpointUrl } from "../../../../shared/utilities/format-server-endpoints.utility";
import Singleton from '../../../../core/patterns/singleton'
import { IEnvironment } from "../../../../core/models/environment/environment.model";
import { ExperienceViews } from "../../../../shared/enums/routes.enum";
import { Console } from "console";

interface enviroment{}
export const SelectEnvironmentView:React.FC<enviroment> = (props) => {



    const consult       = getServerEndpointUrl('environment/getAllEnvironment');
    const [res,setRes]  = useState(Object)

    useEffect(()=>{
        console.log("consulta ");
        fetch(consult,{method:'GET',headers:{'Content-type':'application/json','Jwt': `${sessionStorage.getItem('infoUser')}` }})
        .then(d=>d.json())
        .then(d=>{handlerResponse(d.data); 
            console.log("Response ",d.data);
            const singleton = Singleton.getInstance();
        
           
            // Add each environment to the DataManager
            d.data.forEach((element: any) => {
                const currentEnvironmentType = singleton.getEnvironmentTypeDataManager().getEnvironmentTypeById(element.EnvironmentType_idEnvironmentType);
   
                if (currentEnvironmentType) {
                    const currentEnvironment: IEnvironment = {
                        id: element.idEnvironment,
                        source: element.EnvironmentProfileImage,
                        maskImage: element.EnvironmentMaksImage,
                        name: element.EnvironmentName,
                        environmentType: currentEnvironmentType,
                        environmentAngle:JSON.parse(element.EnvironmentAngle)
                    };
            
                    // Adding the environment to Singleton's EnvironmentDataManager
                    singleton.getEnvironmentDataManager().addEnvironment(currentEnvironment);
                } else {
                    console.log(`No EnvironmentType found for id ${element.EnvironmentType_idEnvironmentType}`);
                }
            });

           })

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
                                { 
                                Singleton.getInstance().getEnvironmentDataManager().GetAllEnvironment().map((i:IEnvironment)=>{
                                    if(i.environmentType.id==Singleton.getInstance().currentEnvironmentType?.id){
                                        return <Carousel.Item>
                                        <EnvironmentThumbnail
                                            name={i.name}
                                            image={i.source}
                                            id={parseInt(i.id)}
                                            onEvents={[
                                                (e) => Singleton.getInstance().SelectEnvironment(i),
                                                (e) => Singleton.getInstance().ChangeExperienceView(ExperienceViews.Design),
                                                // Add as many handlers as you need
                                            ]}
                                        />
                                    </Carousel.Item> 

                                    }
                                })}                                                      
                        </Carousel>

                        
                    </div>
                </div>
            </div>

        </div>
    );
}

