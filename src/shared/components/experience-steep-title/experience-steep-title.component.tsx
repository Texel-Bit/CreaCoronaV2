import DesignIcon from '../../../assets/icons/view_cozy_ico.png';

export const ExperienceSteepTitle = () => {
    return(
        <div className="text-center">
            <div className='d-inline-block p-2 shadow rounded-4'>
                <img src={DesignIcon} alt="Design Icon"/>
            </div>
            <h3 className="color-primary fw-bold m-0">Diseña tu revestimiento</h3>
            <h6>Selecciona <b className="color-middle">1 opción</b> de mosaico</h6>
        </div>
    );
}