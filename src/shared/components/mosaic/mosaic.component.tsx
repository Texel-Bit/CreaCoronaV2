import { MosaicActionsMask } from './actions/mosaic-actions-mask/mosaic-actions-mask.component';
import './mosaic.component.css'

interface MosaicComponenProps {
    actions: boolean,
    mosaic: React.ReactNode,
    marginTop?:string|'5%'
    width?:string|'100%'
}

export const MosaicComponent: React.FC<MosaicComponenProps> = ({ actions, mosaic, marginTop = '5%',width='100%' }) => {

    return(
        <div id="mosaic-component" className='mosaic-component position-relative' style={{marginTop:marginTop,width:width,margin:"auto"}}>
            {mosaic}
            {actions && <MosaicActionsMask />}
        </div>
    );
}