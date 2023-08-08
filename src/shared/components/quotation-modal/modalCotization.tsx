import { useEffect, useRef, useState } from 'react';
import './modalCotization.css'
import { FaWindowClose } from 'react-icons/fa';
import Singleton from '../../../core/patterns/singleton';
import { createQuotation, simulateQuotation } from '../../../core/services/quotation.service';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import { IUserCustomer } from '../../../core/models/user/user.model';
import { Mail } from '@material-ui/icons';
import { convertHtmlToImage } from '../../utilities/html-to-image.utility';

interface QuotationModalProps {
    closeModalEvent: () => void;
}


export const QuotationModal:React.FC<QuotationModalProps> = (props) => {


    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [price, setPrice] = useState("0");
    const [units, setUnits] = useState(0);

    const [calculating, setCalculate] = useState(true);
    const [quoatiazing, setQuotazing] = useState(true);


    const formRef = useRef(null);
   
    const SendQuotation = async () => {

        let element = document.getElementById("Simulation-Canvas");
        if(element)
        {
            console.log("Founded canvas ")
            let elementSvg = await convertHtmlToImage(element);
            Singleton.getInstance().simulationImage=elementSvg;
        }
        

        let QuotationData = Singleton.getInstance().GetQuotationData(GetUserData(), 2); 
        setQuotazing(true);
        setCalculate(true);
        let response = await createQuotation(QuotationData);
        setQuotazing(false);
        setCalculate(false);
        if(response.status==true)
        {
            props.closeModalEvent();
        }
       

        console.log(Response)
        console.log("Data ", QuotationData)
    };

    useEffect(() => {

        setCalculate(true);

        const simulate = async () => {
            try {

                const formatter = new Intl.NumberFormat('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                  });

             let QuotationData=Singleton.getInstance().GetQuotationData(GetUserData());
             
            
                
            let response = await simulateQuotation( QuotationData);

            setCalculate(false);
            setUnits(response.data.cantidadValdosas)
            
            
              
              const formattedValue = formatter.format(response.data.quotationPrice);
setPrice(formattedValue)

            }
            catch(error) {
                console.log(error);
            }
        }

        simulate();

    },[]);


 

    function GetUserData()
    {
       let infoUser:IUserCustomer={
        name:nombre,
        lastName:apellido,
        phone:telefono,
        email:correo
       };

       return infoUser;
    }

 
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      console.log('Nombre:', nombre);
      console.log('Apellido:', apellido);
      console.log('Teléfono:', telefono);
      console.log('Correo:', correo);

      SendQuotation();
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
                <div className="priceContainer">
    <h1 className="priceCotization">{price}</h1>
    {calculating && <div className="loading-spinner"></div>}
</div>
                {/* departamentList */}
              
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
                <h4 className="subTitleDeesgin">Diseño final {Singleton.getInstance().selectedDesignType?.name}</h4>
                <div className="contentDesingFinal">

                <div style={{justifyContent:'flex-start'}} className="timeline-content timeline-content--modifier">
                    <img className="mosaicResumeImage" src={Singleton.getInstance().mosaicImage}/>
                    <div className="timeline-colors">
                        {
                            Singleton.getInstance().currentDesignList &&
                            Singleton.getInstance().currentDesignList!.map((element, index) => (
                                <p key={index}>{element.name}</p>
                            ))
                        }
                    </div>
                </div>

                </div>

                 <div className="priceContainer">
                    <h3 className="unitys">Unidades:{units}</h3>
                    {calculating &&<div className="loading-spinner"></div>}
                </div>

               
    
                <div className="details">
    
                <div className="timeline-step-mosaic">
            <span className="timeline-title">Formato:</span>
            <div className="timeline-content">
                {Singleton.getInstance().currentFormat?.name}
            </div>
        </div>

                    {Singleton.getInstance().currentColorList!?.length>0&& <div className="timeline-step">
            <span className="timeline-title">Colores: ({Singleton.getInstance().GetCurrenColorTypeID()==1?"Campo Lleno":"Con Diseño"})</span>
            <div className="timeline-content-quotation timeline-content-grid">
                {Singleton.getInstance().currentColorList!.map((color, index) => (
                    <div key={index} className="color-item-Quotation">
                        <img src={getServerImagesUrl(color.source)} alt={color.name}/>
                        {color.name}
                    </div>
                ))}
            </div>
        </div>}

        
                     <div className="timeline-step-mosaic">
                    <span className="timeline-title">Área:</span>
                    {Singleton.getInstance().quotationArea==0?(Singleton.getInstance().quotationWidth*Singleton.getInstance().quotationHeight):Singleton.getInstance().quotationArea} M<sup>2</sup>
                    </div>

                    {Singleton.getInstance().currentStructure&&
        <div className="timeline-step-mosaic">
            <span className="timeline-title ">Estructura:</span>
            <div className="timeline-content-quotation ">
                <img style={{maxWidth:"40px",border: "2px solid #213C65"}} src={getServerImagesUrl(Singleton.getInstance().currentStructure!?.source)} alt={Singleton.getInstance().currentStructure!.name}/>
                {Singleton.getInstance().currentStructure!.name}
            </div>
                </div> }
    
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
                        Enviar{calculating && <div className="loading-spinner"></div>}
                    </button>
              </div>
    
            </div>
        </div>
    
    );
}