import './mosaic.component.css'
import { MosaicoSquare } from './square/mosaic-square.component';

export const MosaicComponent = () => {
    return(
        <div className='mosaic-component'>
            <MosaicoSquare/>
        </div>
    );
}