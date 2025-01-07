import IconPlayVideo from '../../../../assets/icons/play_circle.svg';
import './video-tutorial-caption.component.css';
import {modalVideo} from './complementos/modalVideo.js'

export const VideoTutorialCaption:React.FC = () => {
    return(
        <div className="video-caption-container p-5 d-flex flex-column flex-xxl-row gap-1 align-items-center">
            <div>
                <h1 className="fw-bold">Hola Bienvenido a Crea Corona</h1>
                <label>
                    <small>Explora, diseña y prueba el estilo que prefieras para tus espacios.</small>
                </label>
                <br></br>
                <br></br>
                <button type="button" className="button-background btn btn-primary d-flex gap-2 align-items-center button-video">
                <img src={IconPlayVideo} alt="" className="icon-button-background" />
                <label className='video-button-text' onClick={modalVideo}>Ver tutorial</label>
            </button>
            </div>
           
        </div>
    );
}