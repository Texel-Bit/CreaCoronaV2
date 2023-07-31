import { Carousel } from "react-bootstrap";
import { TextCaption } from "../../../../shared/components/caption/text-caption/text-caption.component";
import './select-environment-view.component.css';
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";

export const SelectEnvironmentView = () => {
    return(
        <div className="h-100 d-flex">
            
            <div className="col-6 h-100 px-5 environment-text-container">
                <TextCaption/>
            </div>

            <div className="col-6 px-5 d-flex align-items-center">

                <div>

                    <h4 className="mb-5 pb-5 text-center color-primary fw-bold">
                        Selecciona el ambiente en el que deseas simular la instalación de tu creación.
                    </h4>

                    <div>

                        <Carousel
                            interval={null}
                            wrap={false}>

                            <Carousel.Item>
                                <EnvironmentThumbnail/>
                            </Carousel.Item>

                            <Carousel.Item>
                                <EnvironmentThumbnail/>
                            </Carousel.Item>

                            <Carousel.Item>
                                <EnvironmentThumbnail/>
                            </Carousel.Item>

                        </Carousel>

                    </div>

                </div>

            </div>

        </div>
    );
}