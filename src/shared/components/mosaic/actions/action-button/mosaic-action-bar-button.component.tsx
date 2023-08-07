import { IconType } from 'react-icons';


export interface MosaicActionBarButtonProps {
    buttonClick: () => void;
    icon: IconType;
    text: string;
    styleColor: string;
    classButton: string;
}


export const MosaicActionBarButton: React.FC<MosaicActionBarButtonProps> = (props) => {

    const buttonStyle = {
        backgroundColor: props.styleColor ?? "var(--color-middle)",
        borderColor: props.styleColor ?? "var(--color-middle)"
    }

    return(
        <div className='d-block-inline text-center'>
            <button type="button" className={'btn-corona btn-corona-icon '+props.classButton} onClick={props.buttonClick} style={buttonStyle}> 
                <props.icon />
            </button>
            <p className='m-0'>{props.text}</p>
        </div>
    );
}