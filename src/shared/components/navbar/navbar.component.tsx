import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import { NavbarItem } from "./navbar-item/navbar-item.component";
import { useEffect, useState } from "react";
import { ExperienceRoutes, ExperienceViews } from "../../enums/routes.enum";
import { dataResponse, dataUserREsponse } from "../../../core/models/response/model-responsedata";

// estilos 
import 'react-circular-progressbar/dist/styles.css';
import './navbar.component.css';

// imágenes 
import ImageAvatar from '../../../assets/image/Avatars.svg';
import ImageLogout from '../../../assets/icons/logout.svg'
import LogoCreaCorona from '../../../assets/logos/crea_corona.png';
import superficie from '../../../assets/icons/Superficie.svg';
import ambiente from '../../../assets/icons/Ambiente.svg';
import revestimiento from '../../../assets/icons/Revestimiento.svg';
import color from '../../../assets/icons/Color.svg';
import calcula from '../../../assets/icons/Calcular.svg';
import Singleton from "../../../core/patterns/singleton";
import { Height } from "@material-ui/icons";


interface propValue {number:number; sendDataParent:(data:number)=>void }

export const BrandNavbar:React.FC<propValue> = (props) => {


    // Confirmamos que los datos del usuario si se encuentren en la aplicación 
    const navigate = useNavigate();
    
    if( sessionStorage.getItem('data')==null )
        navigate(ExperienceRoutes.Login);

    const [ userdata , setUserData ] = useState(Object);
    const [ value , setValue ] = useState(props.number)

    Singleton.getInstance().evaluatePercentageFunc = setValue;

    useEffect(() => {
        const d = sessionStorage.getItem('data');
        if (d) {
          const data: dataResponse = JSON.parse(d);   
          sessionStorage.setItem('infoUser',data.token)  
          setUserData(data.user)   
        }
    },[]);

    useEffect(()=>{props.sendDataParent(value)},[value])

    // Salimos de la experiencia al darle click al boton salida.
    const outExperience = () =>{
        sessionStorage.clear()
        navigate(ExperienceRoutes.Login)
    };
    

    return(

        <div className="steeps-navbar bg-light p-2 d-flex gap-4 gap-sm-4 justify-content-between">

            <img
                src={LogoCreaCorona}
                className="d-inline-block align-top logo h-100 corona-logo"
                alt="Crea Corona"/>

            <div className="d-flex gap-sm-3 gap-4 p-1">
                
                <NavbarItem
                    key={`navbarItem${1}`}
                    text='Selecciona la superficie'
                    imagen={superficie}
                    experienceView={ExperienceViews.EnvironmentType}/>

                <NavbarItem
                    key={`navbarItem${2}`}
                    text='Selecciona el ambiente'
                    imagen={ambiente}
                    experienceView={ExperienceViews.Environment}/>

                <NavbarItem
                    key={`navbarItem${3}`}
                    text='Diseña el revestimiento'
                    imagen={revestimiento}
                    experienceView={ExperienceViews.Design}/>

                <NavbarItem
                    key={`navbarItem${4}`}
                    text='Agrega color a tu diseño'
                    imagen={color}
                    experienceView={ExperienceViews.Color}/>

                <NavbarItem
                    key={`navbarItem${5}`}
                    text='Define la cantidad y cotiza'
                    imagen={calcula}
                    experienceView={ExperienceViews.Format}/>

            </div>

            <div className="circular-progress-bar-continer">
                <CircularProgressbar value={value} text={`${value}%`}/>
            </div>

            <div className="h-100 d-flex gap-4">

                <div className="d-flex gap-3 align-items-center">

                    <img
                        style={{height: "24px"}}
                        src={ImageAvatar}
                        className="d-inline-block align-top h-1"
                        alt="Usuario conectado"/>

                        <div>
                            <h5 style={{color:"#213C65",fontFamily: 'Roboto'}} className='m-0 h5'>{userdata.userName}</h5>
                            <p style={{color:"#213C65",fontFamily: 'Roboto'}} className='m-0'>{userdata.email}</p>
                        </div>

                    <img
                        src={ImageLogout}
                        className="d-inline-block align-top logout"
                        alt="Salir"
                        height={30}
                        onClick={ outExperience }/>                    

                </div>

            </div>
            
        </div>
    );
}