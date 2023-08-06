import { MosaicActionBarButton, MosaicActionBarButtonProps } from "./action-button/mosaic-action-bar-button.component";

interface MosaicActionsBarProps {
    buttons: MosaicActionBarButtonProps[];
}


export const MosaicActionsBar: React.FC<MosaicActionsBarProps> = (props) => {
    return(

        <div className="d-flex justify-content-around">
            <>
            {
                props.buttons.map(actionButton => {
                    return <MosaicActionBarButton
                        key={`mosaicActionBarButton${actionButton.text}`}
                        icon={actionButton.icon}
                        buttonClick={actionButton.buttonClick}
                        styleColor={actionButton.styleColor}
                        text={actionButton.text}/>
                })
            }
            </>
        </div>

    );
}