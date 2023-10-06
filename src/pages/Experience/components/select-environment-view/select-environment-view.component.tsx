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
import background from "../../../../assets/image/Background.png"
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
<div style={{ 

  backgroundSize: 'cover',
  width: '100vw', // or another value that suits your design
  height: '100vh', // or another value that suits your design
}}>

<div className="d-flex flex-column align-items-center" style={{gap: '20px'}}>

    <h4 style={{fontFamily: 'Inter', fontSize: "2rem", color: 'var(--color-middle)'}} className="mb-2 pt-5 pb-1 text-center fw-bold">
        Selecciona el ambiente en el que aplicarás tu diseño
    </h4>

    <div className="w-100">
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

    );
}

