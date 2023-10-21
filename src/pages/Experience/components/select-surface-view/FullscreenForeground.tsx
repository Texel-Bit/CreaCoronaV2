import React, { useRef, useState } from 'react';
import LogoCreaCorona from '../../../../assets/logos/crea_corona.png';

import './FullscreenForeground.css'

const ForegroundWithMessage: React.FC = () => {

  const [isVisible,setIsVisible]= useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const videoRef = useRef(null);


  const handleButtonClick = () => {
    setFadeOut(true); // Trigger the fade-out effect

    // After the animation duration (1s in this case), hide the component
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };


  return (
    <div>
      {isVisible && (
        <div>
          <div className={fadeOut ? 'fade-out' : ''}>
          <video ref={videoRef} autoPlay muted loop className='image-style'>
            <source src="/assets/media/CoronaIntro.mp4" type="video/mp4" />
          </video>
            {/* <img src="https://corona.texelbit.com:9445/uploads/Environment/f41712ab-8ede-4dfd-b84e-142fc84d1187.jpg" className='image-style' alt="Fullscreen" /> */}
            <div className='message-container-style '>
              <h1 className='fw-bold'>Hola</h1>
              <h2 className='fw-bold'>Bienvenido a Crea Corona</h2>
              <p>Explora, diseña y prueba el estilo que prefieras para tus espacios.</p>
              <button style={{marginLeft:"30%"}} onClick={handleButtonClick} type="button" className="button-background btn btn-primary d-flex gap-2 align-items-center button-video">
                <img src="/static/media/play_circle.ea58a9c294b74f4f495400ee93a5f630.svg" alt="" className="icon-button-background"></img>
                <label className="video-button-text">Iniciar Experiencia</label>
              </button>
            </div>
            <img style={{position:"absolute",top:"5%",right:"5%", zIndex:10000,maxHeight:"100px"}} src={LogoCreaCorona}/>
          </div>
        </div>
      )}
     
    </div>
  );
}


export default ForegroundWithMessage;
