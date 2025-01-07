import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./modalCotization.css";
import { FaWindowClose } from "react-icons/fa"; // This import might be unused unless you plan to use the icon.
import { convertHtmlToImage } from "../../utilities/html-to-image.utility";

interface ModalCanvasPreviewProps {
    closeModalEvent: () => void;
}

export const ModalCanvasPreview: React.FC<ModalCanvasPreviewProps> = (props) => {
    const [elementSvg, setElementSvg] = useState<string | null>(null);

    useEffect(() => {
        drawQuotation();
    }, []);

    const drawQuotation = async () => {
        let element = document.getElementById("Simulation-Canvas");
        if (element) {
            console.log("Founded canvas ");
            let elementSvg = await convertHtmlToImage(element);
            setElementSvg(elementSvg);
        }
    };

    return (
        <Modal show={true} onHide={props.closeModalEvent} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Previsualización del espacio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {elementSvg && <img src={elementSvg} alt="Canvas Preview" style={{ width: "100%", height: "100%", borderRadius: "8px" }} />}
            </Modal.Body>
            <Modal.Footer>
              
            </Modal.Footer>
        </Modal>
    );
};
