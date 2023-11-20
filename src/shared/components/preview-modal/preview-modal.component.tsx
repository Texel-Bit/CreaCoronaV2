import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import './preview-modal.css'; 

export interface PreviewModalProps {
    showState: boolean;
    closeModalEvent: () => void;
     size: "lg" | "sm" | "xl"; 
}


export const PreviewModal: React.FC<PreviewModalProps> = (props) => {

    const [child, setChild] = useState<HTMLElement>();

    
    useEffect(() => {
        const originalChild = document.getElementById("mosaic-component") as HTMLElement;
        if (!originalChild) return;
    
        // Step 1: Clone the originalChild
        const clonedChild = originalChild.cloneNode(true) as HTMLElement;    
        const mosaicComponent = clonedChild.querySelector("#mosaic-element") as HTMLElement;
    
        if (mosaicComponent) {
            clonedChild.style.minHeight="500px";
            // Get all children components with class name 'img-container'
            let imgContainers = mosaicComponent.querySelectorAll(".img-container");
        
            if (imgContainers.length === 0) {
                mosaicComponent.style.transform = "scale(2)";

                imgContainers = mosaicComponent.querySelectorAll(".hexagon");
            }
        
            imgContainers.forEach(container => {
                for (let currIndex = 0; currIndex <= 4; currIndex++) {
                    // Find the path with the current ID within each container
                    const pathElement = container.querySelector("#layer" + currIndex);
                    
                    if (pathElement) {
                        // Set a border (stroke) to the path
                        pathElement.removeAttribute("stroke");
                        pathElement.removeAttribute("stroke-width");
                    }
                }
            });
        }
    
        // Step 3: Update the state with the modified clone
        setChild(clonedChild);

    }, [props]);
    


    return (
        <div>
            <Modal className="custom-modal" style={{maxWidth:"600px !important"}} show={props.showState} size={props.size} centered={true}>
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