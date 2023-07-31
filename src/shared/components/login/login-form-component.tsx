import { Link, useNavigate } from "react-router-dom";
import { Form, FormLabel, FormControl, Button, Alert } from 'react-bootstrap';
import { ExperienceRoutes } from "../../enums/routes.enum";

export const LoginForm = () => {

    const navigate = useNavigate();

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
                    required/>
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
                    required/>
            </div>

            {/* <div>
                {error!=="" && <p className="text-danger">{error}</p>}
                {success!=="" && (
                    <Alert variant="success">{success}</Alert>
                )}
            </div> */}

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
            
            <Button 
                type="button" 
                className="button-background"
                onClick={() => navigate(ExperienceRoutes.Experience)}>
                Iniciar Sesión
            </Button>

        </Form>
    );
}