import { IGrout } from '../../../core/models/grout/grout.model';
import Singleton from '../../../core/patterns/singleton';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import './experience-grout-selection.component.css';


interface ExperienceGroutSelectionProps {
    grouts: IGrout[]
}


export const ExperienceGroutSelection:React.FC<ExperienceGroutSelectionProps> = (props) => {


    console.log(props.grouts)
    
    return(
        <div className='mw-100 overflow-hidden' >

            <div className="background-color-middle px-3 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Boquilla</h6>
            </div>

            <div className="border p-2 d-flex gap-3 grouts-containter">
                {
                    props.grouts.map(grout => {
                        return <div className='grout-thumbnail px-3 cursor-pointer cursor-pointer-hover' onClick={()=>Singleton.getInstance().ChangeGrout(grout)} style={{ backgroundImage: `url(${getServerImagesUrl(grout.source)})` }} />
                    })
                }
            </div>

        </div>
    );
}