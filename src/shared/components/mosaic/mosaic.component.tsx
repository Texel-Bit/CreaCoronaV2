import { MosaicActionsMask } from './actions/mosaic-actions-mask/mosaic-actions-mask.component';
import './mosaic.component.css'

interface MosaicComponenProps {
    actions: boolean,
    mosaic: React.ReactNode
}

export const MosaicComponent: React.FC<MosaicComponenProps> = (props) => {

    return(
        <div className='mosaic-component position-relative'>
            {props.mosaic}
            {props.actions && <MosaicActionsMask />}
        </div>
    );
}