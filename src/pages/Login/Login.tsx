import LogoCreaCorona from '../../assets/logos/crea_corona.png';
import { LoginForm } from '../../shared/components/login/login-form-component';


export const Login:React.FC = () => {
     
    return (
        <div className="container">
            <div className="vh-100 d-flex gap-5 flex-column align-items-center justify-content-center">
                <img
                    className='col-6 col-md-4 col-lg-2'
                    alt="logo crea corona"
                    src={LogoCreaCorona}/>
                <h2 className="fw-bold">Ingresa</h2>
                <LoginForm />
            </div>
        </div>
    );
}