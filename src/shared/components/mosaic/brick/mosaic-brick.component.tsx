export const MosaicBrick = () => {
    return(
        <div className="mosaic-brick w-100">

            {/**
             * EL CSS DEBE IR INCLUIDO EN EL HTML
             * PARA APLICAR COLOR DE BOQUILLA SE LE MODIFICA EL background-color DE .mosaic-brick 
             * CUANDO SE APLIQUE LA ROTACIÓN SE DEBE AGREGAR EL SIGUIENTE CSS A .mosaic-brick 
             * transform: rotate(90deg);
             */}
            <style>
                {`
                    .mosaic-brick {
                        display: flex;
                        flex-direction: column;
                        gap: .4rem;
                        padding: .2rem;
                        overflow: hidden;
                    }
                
                    .brick-row {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: .4rem;
                    }

                    .brick-row-offset {
                        width: 150%;
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: .4rem;
                        margin-left: -25%;
                    }
                `}
            </style>

            <div className="brick-row">
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
            </div>
            <div className="brick-row-offset">
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
            </div>
            <div className="brick-row">
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
            </div>
            <div className="brick-row-offset">
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
            </div>
            <div className="brick-row">
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
                <img src="https://corona.texelbit.com:9445/uploads/Design/126d33d9-ca1e-4915-be00-53488dda1962.svg" />
            </div>
        </div>
    );
}