import PreviewButtonImage from '../../../../assets/icons/lupa.png';

export const MosaicActionsBar = () => {
    return(

        <div className="d-flex">
            <span className="">
                <img 
                    src={PreviewButtonImage} alt=""
                    className="icon-button-toolbox"/>
                <span className="name-item-toolbox">Vista previa</span>
            </span>
        </div>

    );
}