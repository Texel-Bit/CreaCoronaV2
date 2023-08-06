import icon from "../../../assets/icons/background_grid_small.png";
import './environment-thumbnail.component.css';


export interface EnvironmentThumbnailProps{
    name:string
    image:string
    id:number
    onEvents: Array<(event: React.SyntheticEvent) => void>;
}


export const EnvironmentThumbnail:React.FC<EnvironmentThumbnailProps> = (props) => {

    const handleEvent = (event: React.SyntheticEvent) => {
        props.onEvents.forEach(handler => handler(event));
    };
    
    return (
        <div className="border rounded-3 overflow-hidden d-inline-block" onClick={handleEvent}>
            <div
                className='environment-thumbnail-image'
                style={{ backgroundImage: `url("https://corona.texelbit.com:9445/${props.image}")` }}>
            </div>

            <div className='p-1 d-flex align-items-center justify-content-center gap-3'>
                <img src={icon} alt="navbar icon" height={35} />
                <label className="color-primary fw-bold color-middle">{props.name}</label>
            </div>
        </div>
    );
}