import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom'
import "./modalCotization.css";
import { FaWindowClose } from "react-icons/fa";
import Singleton from "../../../core/patterns/singleton";
import {
  createQuotation,
  simulateQuotation,
} from "../../../core/services/quotation.service";
import { getServerImagesUrl } from "../../utilities/format-server-endpoints.utility";
import { IUserCustomer } from "../../../core/models/user/user.model";
import { Mail } from "@material-ui/icons";
import { convertHtmlToImage } from "../../utilities/html-to-image.utility";
import {FaWallet} from "react-icons/fa";
import { FormSelect } from "react-bootstrap";
import Select from 'react-select';
import { dataResponse } from "../../../core/models/response/model-responsedata";
import { getCounselors } from "../../../core/services/user.service";
import NotificationManager from "../../utilities/NotificationManager";

interface QuotationModalProps {
  closeModalEvent: () => void;
}

interface ICounselor {
  idUser: number;
  userName: string;
}

interface OptionType {
  label: string;
  value: number;
}




export const QuotationModal: React.FC<QuotationModalProps> = (props) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [price, setPrice] = useState("0");
  const [units, setUnits] = useState(0);
  const [aceptaCondiciones, setAceptaCondiciones] = useState(false);
 const [aceptaTratamientoDatos, setAceptaTratamientoDatos] = useState(false);
 const [selectedCounselor, setSelectedCounselor] = useState(""); // If id is string
 const [counselors, setCounselors] = useState<ICounselor[]>([]);


  const [calculating, setCalculate] = useState(true);
  const [quoatiazing, setQuotazing] = useState(true);
  const [quotationArea, setQuotationArea] = useState("");

  const formRef = useRef(null);

  const SendQuotation = async () => {

    Singleton.getInstance().quotationSended=true;
    Singleton.getInstance().EvaluatePercentage();
    
    let element = document.getElementById("Simulation-Canvas");
    if (element) {
      console.log("Founded canvas ");
      let elementSvg = await convertHtmlToImage(element);
      Singleton.getInstance().simulationImage = elementSvg;
    }

    let QuotationData = Singleton.getInstance().GetQuotationData(
      GetUserData(),
      2
    );
    console.log(QuotationData)
    setQuotazing(true);
    setCalculate(true);
    let response = await createQuotation(QuotationData);
    setQuotazing(false);
    setCalculate(false);
    if (response.status == "success") {
        NotificationManager.showAlert({
          icon: 'success',
          title: 'Cotizacion Enviada',
          text: 'Se ha enviado la cotizacion a: '+correo,
          showCancelButton: true,
          confirmButtonText: 'Volver a empezar',
          cancelButtonText: 'Cerrar'
      }).then((result) => {
        if (result.isConfirmed) {
           window.location.reload()
        }
        else{
          Singleton.getInstance().quotationSended=false;
          Singleton.getInstance().EvaluatePercentage();
        }
    });
    }
    else{
      Singleton.getInstance().quotationSended=false;
      Singleton.getInstance().EvaluatePercentage();
      
      NotificationManager.showAlert({
        icon: 'error',
        title: 'Cotizacion No Enviada',
        text: 'No se pudo enviar la cotizacion',
        confirmButtonText: 'Cerrar',
    })

    }

  };

  useEffect(() => {

    const singleton=Singleton.getInstance();

    let QuotationData = singleton.GetQuotationData(
      GetUserData(),
      2
    );

    let currentArea="";

    if(QuotationData.quatitionArea == 0) {
      let calculatedArea = QuotationData.quotationHeight * QuotationData.quotationWidth;
      let roundedArea = calculatedArea.toFixed(2); // This will round the area calculation to two decimal places
    
      currentArea = "L: " + QuotationData.quotationHeight + "m x A: " + QuotationData.quotationWidth + "m = Area: " + roundedArea;
    } else {
      currentArea = QuotationData.quatitionArea.toFixed(2); // This converts the number to a string with 2 decimal places
    }
    

    setQuotationArea(currentArea);

    setCalculate(true);

    const simulate = async () => {
      try {
       

        const formatter = new Intl.NumberFormat("es-CO", {
          style: "currency",
          currency: "COP",
        });

        let QuotationData = Singleton.getInstance().GetQuotationData(
          GetUserData()
        );

        let response = await simulateQuotation(QuotationData);
        console.log(QuotationData);
        setCalculate(false);
        setUnits(response.data.tileAmmount);

        const formattedValue = formatter.format(response.data.quotationPrice);
        setPrice(formattedValue);
      } catch (error) {

        console.log(error);
      }
    };

    simulate();

    const GetConsuelors = async () => {
      try {
        let response = await getCounselors();
        
        // Mapping the response to ICounselor array
        let counselors: ICounselor[] = response.data.map((element: any) => ({
          idUser: element.idsysuser, // mapping idsysuser to idUser
          userName: element.name, // mapping name to userName
        }));
        
        setCounselors(counselors)
    
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    }

    const d = sessionStorage.getItem('data');
    if (d) {
      const data: dataResponse = JSON.parse(d);   
  
      if(data.user.userRole_iduserRole==4)
      {
        GetConsuelors();
      }
    }


  }, []);

  const onChangeCounselor  = (selectedOption:any) => {
    if (selectedOption) {
        setSelectedCounselor(selectedOption.value.toString());
    } else {
        setSelectedCounselor("");
    }
};

  function GetUserData() {
    let infoUser: IUserCustomer = {
      name: nombre,
      lastName: apellido,
      phone: telefono,
      email: correo,
    };

    return infoUser;
  }

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();


    SendQuotation();
  };

  return ReactDOM.createPortal(

    <div className="modalCotizationContainer">
      <div className="modalCotizationContent">
        <div className="topContent">
        <div className="titlesContainer">
             
              <div className="titleText">
                <h2 className="titleCotizacion">Cotización</h2>

                <p className="paragraphCotizacion">
                  Verifica el detalle de la cotización
                </p>
              </div>
             
            
            </div>
        <div className="secondContent">
           
            <div className="contentDesingFinal">
            <h5 className="subTitleDeesgin">
              Diseño final {Singleton.getInstance().selectedDesignType?.name}
            </h5>
              <div
                style={{ justifyContent: "flex-start" }}
                className="timeline-content timeline-content--modifier"
              >
                <img
                  className="mosaicResumeImage"
                  src={Singleton.getInstance().mosaicImage}
                />
                <div className="timeline-colors">
                  {Singleton.getInstance().currentDesignList &&
                    Singleton.getInstance().currentDesignList!.map(
                      (element, index) => <p key={index}>{element.name}</p>
                    )}
                </div>
              </div>
              <div >              
                <p className="units" style={{fontSize:"10", color:"var(--color-primary)"}}>Unidades: {units}</p>
              {calculating && <div className="loading-spinner"></div>}
              <p className="units" style={{fontSize:"20px",color:"var(--color-primary)"}}>Dimensiones:</p>
              <p className="units" style={{fontSize:"15px",color:"var(--color-primary)"}}> {quotationArea} m²</p>
</div>

            </div>

         
            {Singleton.getInstance().currentColorList!?.length > 0 && (
                <div className="timeline-step">
                  <span className="timeline-title">
                    Colores: (
                    {Singleton.getInstance().GetCurrenColorTypeID() == 1
                      ? "Campo Lleno"
                      : "Con Diseño"}
                    )
                  </span>
                  {/* <div className="timeline-content-colors">
                {Singleton.getInstance().currentColorList!.map((color, index) => (
                  <div key={index} className="color-item">
                  <img src={getServerImagesUrl(color.source)} alt={color.name}/>
                  <div className="color-label">
                    {color.name}
                  </div>
                </div>
                  
                ))}
            </div> */}
                  <div className="timeline-content-quota">
                    {Singleton.getInstance().currentColorList!.map(
                      (color, index) => (
                        <div key={index} className="color-item">
                          <img
                            src={getServerImagesUrl(color.source)}
                            alt={color.name}
                          />
                           <div className="color-label">
                    {color.name}
                  </div>
                        </div>
                        
                      )
                    )}
                  </div>
                </div>
              )}

<div className="timeline-step-mosaic">
                <span className="timeline-title">Formato:</span>
                <div className="timeline-content">
                  {Singleton.getInstance().currentFormat?.name}
                </div>
                <span className="timeline-title">Boquilla</span>
                <div  className="color-item" style={{border:"1px solid var(--color-middle) !important"}}>
                          <img
                            src={getServerImagesUrl(Singleton.getInstance().currentGrout?.source||"")}
                          />
                           <div className="color-label" style={{fontSize:"8px"}}>
                    {Singleton.getInstance().currentGrout?.name}
                  </div>
                        </div>
              </div>

              {Singleton.getInstance().currentStructure && (
                <div className="timeline-step-mosaic">
                  <span className="timeline-title ">Estructura:</span>
                  
                  <div className="timeline-content-quotation ">
                   
                    {Singleton.getInstance().currentStructure!.name}
                  </div>
                </div>
              )}


          </div>

          <div className="fristContent">
            {/* Close Modal */}
            {/* <h2 className='closeModal' onClick={props.closeModalEvent}>X</h2> */}
            <button
              type="button"
              className="closeModal border-0 btn button btn-lg"
              onClick={props.closeModalEvent}
            >
              <FaWindowClose size={30} />
            </button>

            {/* Titles&Image */}
           
            {/* price */}
            <div className="priceContainer">
              <h1 className="priceCotization">Total: {price}</h1>
              {calculating && <div className="loading-spinner"></div>}
             {counselors.length>0&& <Select <OptionType>
                className="mt-2 z-2"
                name="initQuotationStates"
                isSearchable
                onChange={onChangeCounselor}
                options={counselors.map(consuelor => ({ value: consuelor.idUser, label: consuelor.userName }))}
                placeholder="Asesor"
                styles={{ 
                  menu: base => ({ ...base, maxHeight: '500px', overflowY: 'scroll',   marginTop: '-30px' }),
                  control: base => ({ ...base, width: '200px' }),
                  option: base => ({ ...base, padding: '10px 15px' }),
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }), 
                }} // Adjust width as per your need }}
            />}
            </div>
            {/* departamentList */}

            {/* Negociemos */}
            <div className="business">
              <h4 className="businessTitle">Ingresa tus datos</h4>
              
            </div>
            {/* formularios */}
            <div>
              <form className="formModalCotization" ref={formRef}>
                <div className="contentLabelForm">
                  <label className="cotizationLabel" htmlFor="nombre">
                    Nombre:
                  </label>
                  <input
                    className="inputCotization"
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Escribe tu nombre"
                    required
                  />
                </div>
                <div className="contentLabelForm">
                  <label className="cotizationLabel" htmlFor="apellido">
                    Apellido:
                  </label>
                  <input
                    className="inputCotization"
                    type="text"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    placeholder="Escribe tu apellido"
                    required
                  />
                </div>
                <div className="contentLabelForm">
                  <label className="cotizationLabel" htmlFor="telefono">
                    Teléfono:
                  </label>
                  <input
                    className="inputCotization"
                    type="tel"
                    id="telefono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="Escribe tu teléfono"
                    required
                  />
                </div>
                <div className="contentLabelForm">
                  <label className="cotizationLabel" htmlFor="correo">
                    Correo:
                  </label>
                  <input
                    className="inputCotization"
                    type="email"
                    id="correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="Escribe tu correo"
                    required
                  />
                </div>
               
              </form>
              <div style={{marginTop:"1%", display:"flex",gap:"1rem"}}>
              <label className="aceptConditions">
                  
                  <input
                    className="checkBoxCotization"
                    type="checkbox"
                    checked={aceptaCondiciones}
                    onChange={(e) => setAceptaCondiciones(e.target.checked)}
                    required
                  />
                  Acepto <a href="https://corona.co/terminos-condiciones" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a></label>
                
                <label className="aceptConditions">
                  <input
                    className="checkBoxCotization"
                    type="checkbox"
                    checked={aceptaTratamientoDatos}
                    onChange={(e) => setAceptaTratamientoDatos(e.target.checked)}
                    required
                  />
                Acepto <a href="https://corona.co/medias/Politica-Tratamiento-de-Datos-Personales-V6-1.pdf?context=bWFzdGVyfGRvY3VtZW50c3wyNjE3OTd8YXBwbGljYXRpb24vcGRmfGFERTVMMmhtTVM4NU1UUTFOVFU0TkRBeE1EVTBMMUJ2YkdsMGFXTmhMVlJ5WVhSaGJXbGxiblJ2TFdSbExVUmhkRzl6TFZCbGNuTnZibUZzWlhNdFZqWXRNUzV3WkdZfDY1OTFhOGQzNTY1ZDNhZDMzOGFkZmE1ZjE3NjYzNzI3OGM2ZjE2MmM4MDY5ODZlMmEzYjVjYTBjOGQ5MmE4MjY" target="_blank" rel="noopener noreferrer">Tratamiento de Datos</a></label>
                
              </div>
             
            </div>
            {/* fin */}
           
          </div>

          
        </div>


        <div className="bottomContent">
          
        <div className="bottomItem">


<button
className="buttonsCotizar btn-corona btn-corona-add"
type="button"
onClick={handleSubmit}
disabled={
calculating||
!aceptaCondiciones ||
!aceptaTratamientoDatos ||
!nombre ||
!apellido ||
!telefono ||
!correo
}
>
Enviar{calculating && <div className="loading-spinner"></div>}
</button>
</div>




        </div>
      </div>
    </div>,document.body
  );


};
