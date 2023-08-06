import { IStructure } from '../../../../core/models/structure/structure.model';
import { getServerImagesUrl } from '../../../utilities/format-server-endpoints.utility';
import './structure-thumbnail.component.css';


export interface StructureThumbnailProps {
    structure: IStructure;
    onClick: (structure: IStructure) => void
}


export const StructureThumbnail:React.FC<StructureThumbnailProps> = (props) => {

    return(
        <div className="structure-thumbnail text-center" onClick={() => props.onClick(props.structure)}>
            <div className="rounded m-auto" style={{ backgroundImage: `url(${getServerImagesUrl(props.structure.source)})` }}/>
            <small>{props.structure.name}</small>
        </div>
    );
}