import { IFormat } from "../../../../core/models/format/format.model";
import "./experience-format-thumbnail.css";

export interface ExperienceFormatThumbnailProps {
    format: IFormat,
    onClick: (format:IFormat) => void
}

export const ExperienceFormatThumbnail: React.FC<ExperienceFormatThumbnailProps> = (props) => {
    return(
        <button className="btn button p-1 border rounded d-flex flex-column experience-format-thumbnail" onClick={()=>props.onClick(props.format)}>
            <div className="rounded-1 m-auto" style={{ width: `${props.format.width}px`, height: `${props.format.height}px` }}/>
            <small className="fw-bold">{`${props.format.width}cm x ${props.format.height}cm`}</small>
        </button>
    );
}