import { IGrout } from '../../../core/models/grout/grout.model';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import './experience-grout-selection.component.css';


interface ExperienceGroutSelectionProps {
    grouts: IGrout[]
}


export const ExperienceGroutSelection:React.FC<ExperienceGroutSelectionProps> = (props) => {

    const groutImage = "https://corona.texelbit.com:9445/uploads/Brecha/1c4806ac-7bc6-43c2-b4ce-3f74156f7499.png";

    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Boquilla</h6>
            </div>

            <div className="border border-1 p-1 d-flex gap-1 grouts-containter">
                {
                    props.grouts.map(grout => {
                        return <div className='grout-thumbnail rounded px-3' style={{ backgroundImage: `url(${getServerImagesUrl(grout.source)})` }} />
                    })
                }
            </div>

        </div>
    );
}