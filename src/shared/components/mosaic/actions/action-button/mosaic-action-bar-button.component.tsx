// AQUI SE ESTÁ USANDO LA LIBRERÍA REACT-ICONS, EL ÍCONO SE DEBE PASAR COMO PARÁMETRO ASÍ COMO EL TEXTO DEL BOTÓN Y EL COLOR DE FONDO DE ESTE
// EL BOTÓN LLEVA UN COLOR POR DEFECTO EN CASO DE QUE NO SE LE PASE COMO PARÁMETRO
import { FaSearchPlus } from 'react-icons/fa';

export const MosaicActionBarButton = () => {

    const buttonStyle = {
        backgroundColor: "var(--color-middle)",
        borderColor: "var(--color-middle)"
    }

    return(
        <div className='d-block-inline text-center'>
            <button type="button" className="btn btn-primary" style={buttonStyle}> 
                <FaSearchPlus/>
            </button>
            <p className='m-0'>Vista Previa</p>
        </div>
    );
}