import icon from "../../../assets/icons/background_grid_small.png";
import './environment-thumbnail.component.css'

export const EnvironmentThumbnail = () => {
    return (

        <div className="border rounded-3 overflow-hidden d-inline-block">

            <div
                className='environment-thumbnail-image'
                style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/EnvironmentType/08b4f039-7076-4637-a5e3-b3f776a164e2.png)" }}>
            </div>

            <div className='p-1 d-flex align-items-center justify-content-center gap-3'>

                <img src={icon} alt="navbar icon" height={35} />
                <label className="color-primary fw-bold color-middle">Piso</label>

            </div>

        </div>

    );
}