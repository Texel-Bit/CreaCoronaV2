import { Button, Form, FormSelect } from "react-bootstrap";
import "./init-quotation-form.component.css";
import { IState } from "../../../core/models/State/state.model";
import React, { useEffect, useState } from "react";
import { QuotationModal } from "../quotation-modal/modalCotization";


interface InitQuotationFormProps {
    states: IState[];
}


export const InitQuotationForm: React.FC<InitQuotationFormProps> = (props) => {

    const [openModalStatus, setOpenModalStatus] = useState(false);
    const [canOpenModalStatus, setCanOpenModalStatus] = useState(false);
    const [squareMetersSelected, setSquareMetersSelected] = useState(false);
    const [initQuotationArea, setInitQuotationArea] = useState("");
    const [initQuotationMeters, setInitQuotationMeters] = useState("");
    const [initQuotationSquareMeters, setInitQuotationSquareMeters] = useState("");
    const [initQuotationDepartment, setInitQuotationDepartment] = useState("");
    const [initQuotationErrorText, setInitQuotationErrorText] = useState("");


    useEffect(() => {
        validateData();
    }, [initQuotationArea, initQuotationMeters, initQuotationSquareMeters, initQuotationDepartment, squareMetersSelected]);


    const onInitQuotationButtonClick = () => {

        validateData();
        setOpenModalStatus(canOpenModalStatus);
    }


    const validateData = () => {

        setInitQuotationErrorText("");

        let valid = true

        if (squareMetersSelected && !initQuotationSquareMeters)
        {
            setInitQuotationErrorText("Ingresar el área en metros cuadrados");
            valid = false;
        }
        else if (!initQuotationArea || !initQuotationMeters)
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


    const onInitQuotationAreaChanged = (e: React.ChangeEvent<HTMLInputElement>) => setInitQuotationArea(e.target.value);
    const onInitQuotationMetersChanged = (e: React.ChangeEvent<HTMLInputElement>) => setInitQuotationMeters(e.target.value);
    const onInitQuotationSquareMetersChanged = (e: React.ChangeEvent<HTMLInputElement>) => setInitQuotationSquareMeters(e.target.value);
    const onInitQuotationDepartmentChanged = (e: React.ChangeEvent<HTMLSelectElement>) => setInitQuotationDepartment(e.target.value);


    return(
        <div className="mw-100 overflow-hidden">
            <div className="background-color-middle px-3 py-1 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Medidas</h6>
            </div>
            <Form className="p-4 pt-xl-2 border-1 experience-format-container">

                <Form.Group controlId="optionsMeasure">

                    <Form.Check
                        inline
                        label="Medida en Metros"
                        name="initQuotationFormCheck"
                        type={'radio'}
                        id={`inline-radio-1`}
                        defaultChecked={true}
                        onChange={(e) => e.isTrusted && setSquareMetersSelected(false)}
                        className="fs-6 color-middle"/>

                    <div className="d-flex gap-3">

                        <Form.Group controlId="area">
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Metros"
                                className="input-measure"
                                name="initQuotationArea"
                                disabled={squareMetersSelected}
                                onChange={onInitQuotationAreaChanged}
                                required/>
                        </Form.Group>

                        <Form.Group controlId="area">
                            <Form.Control
                                type="number"
                                min={1}
                                placeholder="Metros"
                                className="input-measure"
                                name="initQuotationMeters"
                                disabled={squareMetersSelected}
                                onChange={onInitQuotationMetersChanged}
                                required/>
                        </Form.Group>
                    </div>

                </Form.Group>

                <Form.Group controlId="optionsArea">

                    <Form.Check
                        inline
                        label="Área en Metros Cuadrados"
                        name="initQuotationFormCheck"
                        type={'radio'}
                        id={`inline-radio-2`}
                        onChange={(e) => e.isTrusted && setSquareMetersSelected(true)}
                        className="fs-6 color-middle mt-3"/>

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

                <button type="button"
                        className="btn-corona w-100 mt-3 init-quotation-button btn-corona-add"
                        disabled={!canOpenModalStatus}
                        onClick={onInitQuotationButtonClick}>Cotizar</button>
            </Form>

            { openModalStatus && <QuotationModal closeModalEvent={() => setOpenModalStatus(false)}/> }
        </div>
    );
}

