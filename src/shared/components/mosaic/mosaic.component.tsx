import './mosaic.component.css'

interface MosaicComponenProps {
    mosaic: React.ReactNode
}

export const MosaicComponent: React.FC<MosaicComponenProps> = ({ mosaic }) => {

    return(
        <div className='mosaic-component'>
            {mosaic}
        </div>
    );
}