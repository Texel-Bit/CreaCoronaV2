import { MosaicActionBarButton } from './action-button/mosaic-action-bar-button.component';

export const MosaicActionsBar = () => {
    return(

        <div className="d-flex justify-content-around">
            <span className="">
                <MosaicActionBarButton/>
            </span>
        </div>

    );
}