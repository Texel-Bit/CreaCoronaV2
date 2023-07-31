import { VideoTutorialCaption } from "../../../../shared/components/caption/video-tutorial/video-tutorial-caption.component";
import { EnvironmentThumbnail } from "../../../../shared/components/environment-thumbnail/environment-thumbnail.component";
import "./select-surface-view.component.css";

export const SelectSurfaceView = () => {
    return(
        <div className="h-100 d-flex">
            
            <div className="col-6 h-100 px-5 video-tutorial-container">
                <VideoTutorialCaption/>
            </div>

            <div className="col-6 px-5 d-flex align-items-center">

                <div>

                    <h4 className="mb-5 pb-5 text-center color-primary fw-bold">
                        Selecciona la superficie en el que deseas simular la instalación de tu creación.
                    </h4>

                    <div className="d-flex gap-4 justify-content-around">

                        <EnvironmentThumbnail/>
                        <EnvironmentThumbnail/>

                    </div>

                </div>

            </div>

        </div>
    );
}