import { IColor } from '../../../core/models/color/color.model';
import Singleton from '../../../core/patterns/singleton';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import './experience-texture-selection.component.css';


interface ExperienceTextureSelectionProps {
    colorArray: IColor[];
    onColorClick?: (color: IColor) => void;
}

export const ExperienceTextureSelection: React.FC<ExperienceTextureSelectionProps> = ({colorArray, onColorClick}) => {

    Singleton.getInstance().ChangeSelectedColor( colorArray[0] , parseInt(colorArray[0].id) )
    
    return (
        <div className='h-100 mh-100 mw-100 textures-selection-container'>
            <div className="background-color-middle rounded-top text-center">
                <h6 className="m-0 color-white fw-normal">
                    {
                        colorArray[0].isFullField
                        ? <>Campo lleno</>
                        : <>Con Diseño</>
                    }
                
                </h6>
            </div>

            <div className="border border-1 p-2 textures-containter-grid-content">
                <div className="textures-containter-grid gap-1">
                    {colorArray.map((color, index) => (
                        <div key={index} style={{ backgroundImage: `url(${getServerImagesUrl(color.source)})` }} onClick={(e:any)=>{
                            const coloractual = e.target.style.backgroundImage;
                            Singleton.getInstance().ChangeSelectedColor( colorArray[0] , parseInt(colorArray[0].id));
                            const elementSelected=document.getElementById(`${sessionStorage.getItem('BumbleId')}`)
                            if(elementSelected)elementSelected.style.backgroundImage=coloractual
                        }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}