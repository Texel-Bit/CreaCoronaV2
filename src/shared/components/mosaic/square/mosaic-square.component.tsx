export const MosaicSquare = () => {
    return(
        <div className='mosaic-square w-100'>

            {/**
             * EL ESTILO DEBE IR INCLUIDO EN EL HTML PARA QUE AL ENVIAR EL CÓDIGO PARA CONVERTIRLO EN IMAGEN TOME EL ESTILO
             * PARA APLICAR COLOR DE BOQUILLA SE LE MODIFICA EL background-color DE .mosaic-square
             */}
            <style>
                {
                    `.mosaic-square {
                        display: grid;
                        gap: .4rem;
                        grid-template-rows: repeat(2, 1fr);
                        grid-template-columns: repeat(2, 1fr);
                        padding: .2rem;
                    }`
                }
            </style>

            <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
            <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
            <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
            <img src='https://corona.texelbit.com:9445/uploads/Design/758a561e-46fe-4b2b-a983-6ca6b7dd58c8.svg'/>
        </div>
    );
}