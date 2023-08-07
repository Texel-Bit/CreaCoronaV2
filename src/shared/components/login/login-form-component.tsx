import { Link, useNavigate } from "react-router-dom";
import { Form, FormLabel, FormControl, Button } from 'react-bootstrap';
import { ExperienceRoutes, ExperienceViews } from "../../enums/routes.enum";
import React, { useEffect, useState } from "react";
import Singleton from "../../../core/patterns/singleton";
import { login } from "../../../core/services/user.service";


export const LoginForm:React.FC = () => {

    // Se inicia la navegación porque iremos a más pestañas 
    const navigate = useNavigate();

    // si el usuario ingresa al login pero ya ingreso sus datos, lo regresamos a la experiencia
    useEffect(()=>{
        if(sessionStorage.getItem('data')){navigate(ExperienceRoutes.Experience);Singleton.getInstance().ChangeExperienceView(ExperienceViews.EnvironmentType) }
    },[])
    

    //Declaramos variables necesarias 
    const [email,setEmail]  = useState('');
    const [pass, setPass]   = useState('');
    const [error, setError] = useState('');
    const [btn,setBtn]      = useState('');

    const data = {email:email,password:pass};

    // Error inicio sesión
    const handleErrorLogin = (mensaje:string) =>{
        setError(mensaje)
        setBtn('')
    };

    // Inicio de sesión
    const handleLoginIn = (response:string) => {
        sessionStorage.setItem('data',response);
        setTimeout(()=>{
            navigate(ExperienceRoutes.Experience)

            Singleton.getInstance().ChangeExperienceView(ExperienceViews.EnvironmentType)
        },2000)
       
    };

    // Consultamos HTTPS ||||| Use esta por que el servicio axios no me desencapsulaba la respuesta
    const handleLogin = async() =>{
        if (email=='' || pass=='') setError('Proporcione correo electrónico y password')
        else{
            setBtn('load')
            const response = await login(data);
            !response.status ? handleErrorLogin("Proporciona las credenciales correctas") : handleLoginIn(JSON.stringify(response))
        };        
    };

    // Actualiza el estado con el valor del input (Email - Pass)
    const handleEmailChange     = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value); 
    const handlePassword        = (e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value); 

    return (
        <Form className='d-flex flex-column gap-2 col-10 col-sm-6 col-md-5 col-lg-3'>        
            <div className="mb-3">
                <FormLabel className="form-label" htmlFor="email">
                    Correo electrónico
                </FormLabel>
                <FormControl
                    name="email"
                    autoComplete="current-password"
                    className="form-control"
                    placeholder="Escribe tu correo electrónico"
                    type="email"
                    id="email"
                    onChange={handleEmailChange}
                    />
            </div>

            <div className="mb-3">
                <FormLabel className="form-label" htmlFor="password">
                    Contraseña
                </FormLabel>
                <FormControl
                    id="password"
                    autoComplete="current-password"
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Escribe tu contraseña"
                    onChange={handlePassword}
                    />
            </div>

            <div> {error!=="" && <p className="text-danger">{error}</p>} </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="customControlInline"/>
                                Recordar mis datos
                        </label>
                    </div>
                </div>
                <div className="col-sm-6 mb-3 text-md-end">
                    <Link className="text-input" to="/forget-password"><i className="mdi mdi-lock"></i> ¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
            
            <button
                type="button" 
                className="button-background btn-corona btn-corona-primary"
                onClick={handleLogin}
                >
                {btn=='load'? <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div> 
                        : <span>Iniciar Sesión</span>}
            </button>

        </Form>
    );
}