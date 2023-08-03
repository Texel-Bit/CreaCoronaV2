import icon from "../../../assets/icons/background_grid_small.png";
import './environment-thumbnail.component.css';

interface propiedades{
    nombre:string
    imagen:string
    ambiente:number
    toParent: (data:string)=>void
    toProgress:(data:number)=>void
}


export const EnvironmentThumbnail:React.FC<propiedades> = (props) => {

    const seterAmbiente = () => { sessionStorage.setItem('ambiente',`${props.ambiente}`) }
    
    return (
        <div className="border rounded-3 overflow-hidden d-inline-block" onClick={()=>{seterAmbiente(); props.toParent('ambiente'); props.toProgress(20)}}>
            <div
                className='environment-thumbnail-image'
                style={{ backgroundImage: `url("https://corona.texelbit.com:9445/${props.imagen}")` }}>
            </div>
            <div className='p-1 d-flex align-items-center justify-content-center gap-3'>

                <img src={icon} alt="navbar icon" height={35} />
                <label className="color-primary fw-bold color-middle">{props.nombre}</label>

            </div>

        </div>

    );
}