import { Button, Form, FormSelect } from "react-bootstrap";
import "./init-quotation-form.component.css";

export const InitQuotationForm = () => {
    return(
        <Form className="p-3 mt-3 border rounded-2">

            <Form.Group controlId="optionsMeasure">

                <Form.Check
                    inline
                    label="Medida en Metros"
                    name="group1"
                    type={'radio'}
                    id={`inline-radio-1`}
                    defaultChecked={true}
                    className="fs-6 fw-bold color-middle"/>

                <div className="d-flex gap-3">

                    <Form.Group controlId="area">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="Metros"
                            className="input-measure"/>
                    </Form.Group>

                    <Form.Group controlId="area">
                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="Metros"
                            className="input-measure"/>
                    </Form.Group>
                </div>

            </Form.Group>

            <Form.Group controlId="optionsArea">

                <Form.Check
                    inline
                    label="Area en Metros Cuadrados"
                    name="group1"
                    type={'radio'}
                    id={`inline-radio-2`}
                    className="fs-6 fw-bold color-middle mt-3"/>

                <div className="inputs__medidas">

                    <Form.Group controlId="area-total" >

                        <Form.Control
                            type="number"
                            min={1}
                            placeholder="Metros cuadrados"
                            className="input-measure-area"/>

                    </Form.Group>

                </div>

            </Form.Group>

            <FormSelect className="mt-2 z-3" title="Departamento">
            </FormSelect>
            <Button className="w-100 color-white mt-3 color-green init-quotation-button">Cotizar</Button>
        </Form>
    );
}