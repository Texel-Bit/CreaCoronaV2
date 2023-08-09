import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";


export interface PreviewModalProps {
    showState: boolean;
    closeModalEvent: () => void
}


export const PreviewModal: React.FC<PreviewModalProps> = (props) => {

    const [child, setChild] = useState<HTMLElement>();

    useEffect(() => {
        const newChild = document.getElementById("mosaic-component") as HTMLElement;
        setChild(newChild);
    }, [props]);


    return (
        <div>
            <Modal show={props.showState}>
                <Modal.Header closeButton onClick={props.closeModalEvent}>
                <Modal.Title>Vista previa</Modal.Title>
                </Modal.Header>
                <Modal.Body dangerouslySetInnerHTML={{ __html: child?.outerHTML ?? "" }}>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
 
            </div>
    );
}