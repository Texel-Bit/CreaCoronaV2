import { IStructure } from '../../../../core/models/structure/structure.model';
import './structure-thumbnail.component.css';


interface ExperienceStructureSelectionProps {
    structure: IStructure
}


export const StructureThumbnail:React.FC<ExperienceStructureSelectionProps> = (props) => {

    const structureImage = "https://corona.texelbit.com:9445/uploads/FormatSizeTexture/323f9529-d86f-4845-a269-abf05b98799c.png";

    return(
        <div className="structure-thumbnail">
            <div className="rounded m-auto" style={{ backgroundImage: `url(${props.structure.source})` }}/>
            <small>{props.structure.name}</small>
        </div>
    );
}