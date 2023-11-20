import { Button, Form, FormSelect } from "react-bootstrap";
import "./init-quotation-form.component.css";
import { IState } from "../../../core/models/State/state.model";
import React, { useEffect, useState } from "react";
import { QuotationModal } from "../quotation-modal/modalCotization";
import Singleton from "../../../core/patterns/singleton";


interface InitQuotationFormProps {
    states: IState[];
}


export const InitQuotationForm: React.FC<InitQuotationFormProps> = (props) => {

    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [canOpenModalStatus, setCanOpenModalStatus] = useState(false);
    const [squareMetersSelected, setSquareMetersSelected] = useState(false);
    const [initQuotationWidth, setInitQuotationWidth] = useState("");
    const [initQuotationHeight, setInitQuotationHeight] = useState("");
    const [initQuotationArea, setInitQuotationArea] = useState("");
    const [initQuotationDepartment, setInitQuotationDepartment] = useState("");
    const [initQuotationErrorText, setInitQuotationErrorText] = useState("");
    const [showStructureMessage, setStructureMessage] = useState(false);
    const [measurementType, setMeasurementType] = useState("dimensiones"); // dimensiones or area
    const [isDisabled, setIsDisabled] = useState(true); // Initially, the select is disabled.
    const [selectedState, setSelectedState] = useState(""); // If id is string

    useEffect(() => {
        validateData();
    }, [initQuotationWidth, initQuotationHeight, initQuotationArea, initQuotationDepartment, squareMetersSelected,Singleton.getInstance().currentStructure,Singleton.getInstance().currentFormat]);

    useEffect(() => {
        if (props.states && props.states.length > 0) {
            setIsDisabled(false); // Enable the select when the states are loaded.
            setSelectedState(props.states[0].id.toString()); // Select the first state when the states are loaded.
            SetState(props.states[0].id.toString())
        }
    }, [props.states]);

    const onInitQuotationButtonClick = () => {

        validateData();
        setOpenModalStatus(canOpenModalStatus);
        
    }

    const onMeasurementTypeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMeasurementType(e.target.value);
        setInitQuotationArea("0");
        setInitQuotationWidth("0");
        setInitQuotationHeight("0");
        setSquareMetersSelected(e.target.value === 'area');
    }



    const validateData = () => {

        setInitQuotationErrorText("");

        let valid = true
        setStructureMessage(false);
    
        if (squareMetersSelected && (!initQuotationArea||initQuotationArea==="0"))
        {
            setInitQuotationErrorText("Ingresar el área en metros cuadrados");
            valid = false;
        }
        else if (!squareMetersSelected && ((!initQuotationWidth||initQuotationWidth==="0") || (!initQuotationHeight)||initQuotationHeight==="0"))
        {
            setInitQuotationErrorText("Ingresar información de metros ancho x alto");
            valid = false;
        }
        else if (!initQuotationDepartment)
        {
            setInitQuotationErrorText("Seleccionar departamento");
            valid = false;
        }
        else if (!Singleton.getInstance().currentFormat)
        {
            setInitQuotationErrorText("Selecciona un formato");
            valid = false;
        }
        else if (!Singleton.getInstance().currentStructure)
        {
            setStructureMessage(true);
            setInitQuotationErrorText("Selecciona una estructura");
            valid = false;
        }

        setCanOpenModalStatus(valid);
    }

    function SetQuotationArea(area:string)
    {
        setInitQuotationArea(area);
        setInitQuotationWidth("0");
        setInitQuotationHeight("0");
        Singleton.getInstance().quotationArea=parseFloat(area);
        Singleton.getInstance().quotationWidth=0;
        Singleton.getInstance().quotationHeight=0;
    }

    function SetQuotationWidth(Width:string)
    {
        setInitQuotationArea("0");
        setInitQuotationWidth(Width);
        Singleton.getInstance().quotationWidth=parseFloat(Width);
        Singleton.getInstance().quotationArea=0;
    }

    function SetQuotationHeigth(Heigth:string)
    {
        setInitQuotationArea("0");
        setInitQuotationHeight(Heigth);
        Singleton.getInstance().quotationHeight=parseFloat(Heigth);
        Singleton.getInstance().quotationArea=0;
    }

    function SetState(state:string)
    {
        setInitQuotationDepartment(state);
        const item = Singleton.getInstance().currentStateList!.find(item => item.id === parseInt(state));
        if(item)
            Singleton.getInstance().currentState = item;
    }

    const onInitQuotationHeightChanged = (e: React.ChangeEvent<HTMLInputElement>) => SetQuotationHeigth(e.target.value);
    const onInitQuotationWidthChanged = (e: React.ChangeEvent<HTMLInputElement>) => SetQuotationWidth(e.target.value);
    const onInitQuotationSquareMetersChanged = (e: React.ChangeEvent<HTMLInputElement>) => SetQuotationArea(e.target.value);
const onInitQuotationDepartmentChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value); // log the selected value
    SetState(e.target.value);
}

    return(
        <div className="mw-100 overflow-hidden" style={{marginTop: "5%"}}>
            <div className="background-color-middle px-3 py-1 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Medidas</h6>
            </div>
            <Form className="p-2 p-md-3 pt-xl-2 border-1 experience-format-container">

            <Form.Group controlId="measurementType">
                    <Form.Select onChange={onMeasurementTypeChanged} value={measurementType}>
                        <option value="dimensiones">Medida en Metros</option>
                        <option value="area">Área en Metros Cuadrados</option>
                    </Form.Select>
                </Form.Group>
                
                {measurementType === 'dimensiones' && <div className="d-flex gap-3 mt-3">
                    <Form.Group controlId="width">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="Ancho"
                            className="input-measure"
                            title="Ancho" 
                            name="initQuotationWidth"
                            onChange={onInitQuotationHeightChanged}
                            style={{ appearance: "none" }} 
                            required/>
                    </Form.Group>

                    <Form.Group controlId="height">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="Alto"
                            title="Alto" 
                            className="input-measure"
                            name="initQuotationHeight"
                            onChange={onInitQuotationWidthChanged}
                            required/>
                    </Form.Group>
                </div>}

                {measurementType === 'area' && <Form.Group controlId="area" className="mt-3">
                    <Form.Control
                        type="number"
                        min={1}
                        placeholder="Metros cuadrados"
                        className="input-measure"
                        name="initQuotationArea"
                        title="Area" 
                        required
                        onChange={onInitQuotationSquareMetersChanged}/>
                </Form.Group>}

                <div> {initQuotationErrorText && <p className="text-danger">{initQuotationErrorText}</p>} </div>


              
            </Form>
            <div style={{marginTop:"10px"}} >
            <button type="button"
                        className="btn-corona w-100 mt-3 init-quotation-button btn-corona-add"
                        disabled={!canOpenModalStatus}
                        onClick={
                            onInitQuotationButtonClick
                        }>Cotizar</button>


            </div>
  

            <div style={{marginTop:"10px",display:'none'}} className="background-color-middle px-3 py-1 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Departamento</h6>
            </div>

            <Form style={{display:'none'}} className="p-4 p-md-3 pt-xl-2 border-1 experience-format-container">
           
            <FormSelect
            className="mt-2 z-3"
            title="Departamento"
            name="initQuotationStates"
            required
            disabled={true} // Use isDisabled state to enable/disable the component.
            value={selectedState} // Use selectedState to control the selected value.
            onChange={onInitQuotationDepartmentChanged}
        >
            <option value="">Seleccionar departamento</option>
            {props.states.map(state => <option key={state.id} value={state.id}>{state.stateName}</option>)}
        </FormSelect>
               
                        </Form>
            { openModalStatus && <QuotationModal closeModalEvent={() => setOpenModalStatus(false)}/> }
        </div>

        
    );
}

