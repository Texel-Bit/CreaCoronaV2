import React, { useState } from 'react';
import LogoCreaCorona from '../../../../assets/logos/crea_corona.png';

const ForegroundWithMessage: React.FC = () => {

  const [isVisible,setIsVisible]= useState(true);
  const [fadeOut, setFadeOut] = useState(false);


  const handleButtonClick = () => {
    setFadeOut(true); // Trigger the fade-out effect

    // After the animation duration (1s in this case), hide the component
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  };

  const imageStyle = {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9998,
    objectFit: 'cover'
  } as React.CSSProperties;

  const messageContainerStyle = {
    position: 'absolute',
    top: '63%',  // Adjust accordingly to position the message
    left: '4%', // Adjust accordingly to position the message
    zIndex: 9999,
    WebkitBackdropFilter: 'blur(15px)',
    backdropFilter: 'blur(15px)',
    background: 'rgba(87,85,85,0.49)',
    borderRadius: '7px',
    boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
    color: 'white',  // Assuming you have a CSS variable named --color-white set to 'white'. If not, adjust this value.
    gap: '4rem',
    mixBlendMode: 'normal',
    width: '30%',  // The last width value will be the one applied. Adjust as necessary.
    textAlign: 'center',
    padding: '20px'
  } as React.CSSProperties;

  return (
    <div>
      {isVisible && (
        <div>
           <div className={fadeOut ? 'fade-out' : ''}>
          <img src="https://corona.texelbit.com:9445/uploads/Environment/f41712ab-8ede-4dfd-b84e-142fc84d1187.jpg" style={imageStyle} alt="Fullscreen" />
          <div style={messageContainerStyle}>
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
