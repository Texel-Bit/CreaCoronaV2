import { useRef, useState } from 'react';
import './modalCotization.css'
import { FaWindowClose } from 'react-icons/fa';


interface QuotationModalProps {
    closeModalEvent: () => void;
}


export const QuotationModal:React.FC<QuotationModalProps> = (props) => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const formRef = useRef(null);
  
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      console.log('Nombre:', nombre);
      console.log('Apellido:', apellido);
      console.log('Teléfono:', telefono);
      console.log('Correo:', correo);
    };
     
    return(

        <div className="modalCotizationContainer">
            <div className="modalCotizationContent">
              <div className='fristContent'>
                {/* Close Modal */}
                {/* <h2 className='closeModal' onClick={props.closeModalEvent}>X</h2> */}
                <button type="button" className='closeModal border-0 btn button btn-lg' onClick={props.closeModalEvent}>
                    <FaWindowClose size={30}/>
                </button>

                {/* Titles&Image */}
                <div className='titlesContainer'>
                    <img className='titleImage'></img>
                    <div className='titleText'>
                        <h2 className='titleCotizacion'>Cotización</h2>
                        <p className='paragraphCotizacion'>Verifica el detalle de la cotización</p>
                    </div>
                </div>
                {/* price */}
                <h1 className="priceCotization">6'000.000 COP</h1>
                {/* departamentList */}
                <div className="containerDepartaments">
                    <label className='labelDepartament' htmlFor="departamento">Departamento*</label>
                    {/* Lista desplegable de departamentos */}
                    <select className='selectDepartament' id="departamento" value={'j'} onChange={()=>console.log()}>
                        <option value="">Selecciona un departamento</option>
                        {/* {departamentos.map((dept) => (
                        <option key={dept} value={dept}>
                            {dept}
                        </option>
                        ))} */}
                    </select>
                </div>
                {/* Negociemos */}
                <div className="business">
                    <h4 className="businessTitle">¡Claro que puedes negociar!</h4>
                    <p className="businessParagraph">Ingresa tus datos y uno de nuestros asesores le contactará para que puedas acceder a descuentos y promociones</p>
                </div>
                    {/* formularios */}
                <div>
                    <form className='formModalCotization' ref={formRef}>
                        <div className='contentLabelForm'>
                        <label className='cotizationLabel' htmlFor="nombre">Nombre:</label>
                        <input
                            className='inputCotization'
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder='Escribe tu nombre'
                            required
                        />
                        </div>
                        <div className='contentLabelForm'>
                        <label className='cotizationLabel' htmlFor="apellido">Apellido:</label>
                        <input
                            className='inputCotization'
                            type="text"
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            placeholder='Escribe tu apellido'
                            required
                        />
                        </div>
                        <div className='contentLabelForm'>
                        <label className='cotizationLabel' htmlFor="telefono">Teléfono:</label>
                        <input
                            className='inputCotization'
                            type="tel"
                            id="telefono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder='Escribe tu teléfono'
                            required
                        />
                        </div>
                        <div className='contentLabelForm'>
                        <label className='cotizationLabel' htmlFor="correo">Correo:</label>
                        <input
                            className='inputCotization'
                            type="email"
                            id="correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder='Escribe tu correo'
                            required
                        />
                        </div>
                    </form>

                </div>
              {/* fin */}
              </div>
    
              <div className="secondContent">
                <h4 className="subTitleDeesgin">Diseño final</h4>
                <div className="contentDesingFinal">
                    {/* iamgen de diseño final */}
                </div>
                <h3 className="unitys">Unidades:xxxxx</h3>
    
                <div className="details">
    
                    <h3 className="detailsFormat">Formato:</h3>
                    <p className="textFormat">Lorem ipsum dolor</p>
                    <h3 className="detailsAria">Área:</h3>
                    <p className="textAria">Lorem ipsum dolor</p>
                    <h3 className="detailsStyle">Estilo:</h3>
                    <p className="textStyle">Lorem ipsum dolor</p>
                    <h3 className="detailsColors">Colores:</h3>
                    <p className="textColors">Lorem ipsum dolor</p>
    
                </div>
              </div>
    
              <div className="bottomContent">

                    <label className='aceptConditions'>
                        <input
                            className='checkBoxCotization'
                            type="checkbox"
                            // checked={aceptaCondiciones}
                            // onChange={(e) => setAceptaCondiciones(e.target.checked)}
                            required
                        />
                        Acepta todas las condiciones
                    </label>

                    <label className='aceptConditions'>
                        <input
                            className='checkBoxCotization'
                            type="checkbox"
                            // checked={aceptaCondiciones}
                            // onChange={(e) => setAceptaCondiciones(e.target.checked)}
                            required
                        />
                        Acepta todas las condiciones
                    </label>

                    <button className='buttonsCotizar cancelCoti' type="button" onClick={props.closeModalEvent}>
                        Cancelar
                    </button>

                    <button className='buttonsCotizar acetpCoti' type="button" onClick={handleSubmit}>
                        Enviar
                    </button>
              </div>
    
            </div>
        </div>
    
    );
}