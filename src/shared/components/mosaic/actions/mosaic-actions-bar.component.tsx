import { MosaicActionBarButton, MosaicActionBarButtonProps } from "./action-button/mosaic-action-bar-button.component";

interface MosaicActionsBarProps {
    buttons: MosaicActionBarButtonProps[];
}


export const MosaicActionsBar: React.FC<MosaicActionsBarProps> = (props) => {
    return(

        <div className="action__buttons" id="action__buttons">
            <>
            {
                props.buttons.map((actionButton, index) => {
                    return <MosaicActionBarButton
                        key={`mosaic-action-bar-button-key${index}`}
                        icon={actionButton.icon}
                        buttonClick={actionButton.buttonClick}
                        styleColor={actionButton.styleColor}
                        text={actionButton.text}
                        classButton={actionButton.classButton}/>
                })
            }
            </>
        </div>

    );
}