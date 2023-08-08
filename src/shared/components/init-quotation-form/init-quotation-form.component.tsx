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


    useEffect(() => {
        validateData();
    }, [initQuotationWidth, initQuotationHeight, initQuotationArea, initQuotationDepartment, squareMetersSelected]);


    const onInitQuotationButtonClick = () => {

        validateData();
        setOpenModalStatus(canOpenModalStatus);
    }



    const validateData = () => {

        setInitQuotationErrorText("");

        let valid = true

        if (squareMetersSelected && !initQuotationArea)
        {
            setInitQuotationErrorText("Ingresar el área en metros cuadrados");
            valid = false;
        }
        else if (!squareMetersSelected && (!initQuotationWidth || !initQuotationHeight))
        {
            setInitQuotationErrorText("Ingresar información de metros y área");
            valid = false;
        }
        else if (!initQuotationDepartment)
        {
            setInitQuotationErrorText("Seleccionar departamento");
            valid = false;
        }

        setCanOpenModalStatus(valid);
    }

    function SetQuotationArea(area:string)
    {
        setInitQuotationArea(area);
        setInitQuotationWidth("0");
        setInitQuotationHeight("0");
        Singleton.getInstance().quotationArea=parseInt(area);
        Singleton.getInstance().quotationWidth=0;
        Singleton.getInstance().quotationHeight=0;
    }

    function SetQuotationWidth(Width:string)
    {
        setInitQuotationArea("0");
        setInitQuotationWidth(Width);
        Singleton.getInstance().quotationWidth=parseInt(Width);
        Singleton.getInstance().quotationArea=0;
    }

    function SetQuotationHeigth(Heigth:string)
    {
        setInitQuotationArea("0");
        setInitQuotationHeight(Heigth);
        Singleton.getInstance().quotationHeight=parseInt(Heigth);
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
    const onInitQuotationDepartmentChanged = (e: React.ChangeEvent<HTMLSelectElement>) => SetState(e.target.value);


    return(
        <>
        
            <Form className="p-3 mt-3 border rounded-2">

                <Form.Group controlId="optionsMeasure">

                    <Form.Check
                        inline
                        label="Medida en Metros"
                        name="initQuotationFormCheck"
                        type={'radio'}
                        id={`inline-radio-1`}
                        defaultChecked={true}
                        onChange={(e) => e.isTrusted && setSquareMetersSelected(false)}
                        className="fs-6 fw-bold color-middle"/>

                    <div className="d-flex gap-3">

                        <Form.Group controlId="area">
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Ancho"
                                className="input-measure"
                                name="initQuotationArea"
                                disabled={squareMetersSelected}
                                onChange={onInitQuotationHeightChanged}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="area">
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Alto"
                                className="input-measure"
                                name="initQuotationMeters"
                                disabled={squareMetersSelected}
                                onChange={onInitQuotationWidthChanged}
                                required/>
                        </Form.Group>
                    </div>

                </Form.Group>

                <Form.Group controlId="optionsArea">

                    <Form.Check
                        inline
                        label="Area en Metros Cuadrados"
                        name="initQuotationFormCheck"
                        type={'radio'}
                        id={`inline-radio-2`}
                        onChange={(e) => e.isTrusted && setSquareMetersSelected(true)}
                        className="fs-6 fw-bold color-middle mt-3"/>

                    <div className="inputs__medidas">

                        <Form.Group controlId="area-total" >

                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Metros cuadrados"
                                className="input-measure-area"
                                disabled={!squareMetersSelected}
                                name="initQuotationSquareMeters"
                                required
                                onChange={onInitQuotationSquareMetersChanged}/>

                        </Form.Group>

                    </div>

                </Form.Group>

                <div> {initQuotationErrorText && <p className="text-danger">{initQuotationErrorText}</p>} </div>
                <hr />

                <FormSelect
                    className="mt-2 z-3"
                    title="Departamento"
                    name="initQuotationStates"
                    required
                    onChange={onInitQuotationDepartmentChanged}>
                        <option value="">Seleccionar departamento</option>
                        {props.states.map(state => <option value={state.id}>{state.stateName}</option>)}
                </FormSelect>

                <Button type="button"
                        className="w-100 color-white mt-3 color-green init-quotation-button"
                        disabled={!canOpenModalStatus}
                        onClick={onInitQuotationButtonClick}>Cotizar</Button>
            </Form>

            { openModalStatus && <QuotationModal closeModalEvent={() => setOpenModalStatus(false)}/> }
        </>
    );
}

