import { IStructure } from '../../../../core/models/structure/structure.model';
import { getServerImagesUrl } from '../../../utilities/format-server-endpoints.utility';
import './structure-thumbnail.component.css';


export interface StructureThumbnailProps {
    structure: IStructure;
    isSelected: boolean; // <-- Add this
    onClick: (structure: IStructure) => void
}


export const StructureThumbnail:React.FC<StructureThumbnailProps> = (props) => {

    return(
        <div 
        className={`structure-thumbnail text-center btn button p-1 border rounded ${props.isSelected ? 'structure-selected' : 'structure-Unselected'}`} // <-- Update this line
        onClick={() => props.onClick(props.structure)}
    >
        <div className="rounded m-auto" style={{ backgroundImage: `url(${getServerImagesUrl(props.structure.source)})` }}/>
        <small>{props.structure.name}</small>
    </div>
    );
}
