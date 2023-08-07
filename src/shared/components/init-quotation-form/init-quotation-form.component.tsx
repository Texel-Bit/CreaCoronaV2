import { Button, Form, FormSelect } from "react-bootstrap";
import "./init-quotation-form.component.css";

export const InitQuotationForm = () => {
  return (
    <div className="mw-100 overflow-hidden">
      <div className="background-color-middle px-3 py-1 w-50 rounded-top">
        <h6 className="m-0 color-white fw-normal">Medidas</h6>
      </div>
      <Form className="p-3 experience-format-container">
        <Form.Group controlId="optionsMeasure">
          <Form.Check
            inline
            label="Medida en Metros"
            name="group1"
            type={"radio"}
            id={`inline-radio-1`}
            defaultChecked={true}
            className="fs-6 label-corona"
          />

          <div className="d-flex gap-3">
            <Form.Group controlId="area">
              <Form.Control
                type="number"
                min={1}
                placeholder="Alto"
                className="input-measure"
              />
            </Form.Group>

            <Form.Group controlId="area">
              <Form.Control
                type="number"
                min={1}
                placeholder="Ancho"
                className="input-measure"
              />
            </Form.Group>
          </div>
        </Form.Group>

        <Form.Group controlId="optionsArea">
          <Form.Check
            inline
            label="Área en Metros Cuadrados"
            name="group1"
            type={"radio"}
            id={`inline-radio-2`}
            className="fs-6 mt-4 label-corona"
          />

          <div className="inputs__medidas">
            <Form.Group controlId="area-total">
              <Form.Control
                type="number"
                min={1}
                placeholder="Metros cuadrados"
                className="input-measure-area"
              />
            </Form.Group>
          </div>
        </Form.Group>

        <FormSelect className="mt-2 z-3" title="Departamento"></FormSelect>
        <Button className="w-100 mt-4 init-quotation-button btn-corona-add btn-corona">
          Cotizar
        </Button>
      </Form>
    </div>
  );
};
