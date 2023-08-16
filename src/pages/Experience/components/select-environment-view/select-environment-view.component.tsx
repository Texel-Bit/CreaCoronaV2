import { Carousel as ReactCarousel } from "react-bootstrap";
import { CoronaCarousel } from "../../../../shared/components/carousel/carousel.component";
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
        fetch(consult,{method:'GET',headers:{'Content-type':'application/json','Jwt': `${sessionStorage.getItem('infoUser')}` }})
        .then(d=>d.json())
        .then(d=>{handlerResponse(d.data); 
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
                        environmentAngle:JSON.parse(element.EnvironmentAngle),
                        environmentIcon:element.EnvironmentTypeIcon
                    };
            
                    // Adding the environment to Singleton's EnvironmentDataManager
                    singleton.getEnvironmentDataManager().addEnvironment(currentEnvironment);
                } else {
                }
            });

           })

        .catch(e=>console.log(e));
    },[]);

    function handlerResponse(datos:[]){setRes(datos)}

    return(
        <div className="h-100 d-flex flex-column oveflow-auto flex-md-row">
            
            <div className="h-100 px-md-5 px-4 environment-text-container">
                <TextCaption/>
            </div>

            <div className="px-md-5 py-4 py-md-0 d-flex align-items-center">

                <div className="w-100">

                    <h4 style={{fontFamily: 'Inter', fontSize: "2rem", paddingLeft: '5%', paddingRight: '5%', color: 'var(--color-middle)'}} className="mb-2 pb-5 text-center fw-bold">
                        Selecciona el ambiente en el que aplicarás tu diseño
                    </h4>

                    {/* <div>

                        <ReactCarousel interval={null} wrap={false} indicators={false} >
                            { 
                                Singleton.getInstance().getEnvironmentDataManager().GetAllEnvironment().map((i:IEnvironment)=>{
                                    if(i.environmentType.id==Singleton.getInstance().currentEnvironmentType?.id){
                                        return <ReactCarousel.Item>
                                                <div className="environment-item">
                                                    <EnvironmentThumbnail
                                                        name={i.name}
                                                        image={i.source}
                                                        id={parseInt(i.id)}
                                                        onEvents={[
                                                            (e) => Singleton.getInstance().SelectEnvironment(i),
                                                            (e) => Singleton.getInstance().ChangeExperienceView(ExperienceViews.Design),
                                                        ]}/>
                                                </div>
                                            </ReactCarousel.Item> 

                                    }
                                })
                            }                                                      
                        </ReactCarousel>
                        
                    </div> */}

                    <div>
                            <CoronaCarousel thumbnails={
                                Singleton.getInstance().getEnvironmentDataManager().GetAllEnvironment().map((environment: IEnvironment)=>{
                                    return {
                                        id: parseInt(environment.id),
                                        image: environment.source,
                                        name: environment.name,
                                        onEvents: [
                                            (e) => Singleton.getInstance().SelectEnvironment(environment),
                                            (e) => Singleton.getInstance().ChangeExperienceView(ExperienceViews.Design)
                                        ]
                                    }
                                })
                            }/>
                    </div>

                </div>
            </div>

        </div>
    );
}

