import { IFormat } from "../../../../core/models/format/format.model";
import "./experience-format-thumbnail.css";

export const ExperienceFormatThumbnail: React.FC<IFormat> = (props) => {
    return(
        <button className="btn button p-1 border rounded d-flex flex-column experience-format-thumbnail">
            <div className="rounded-1 m-auto" style={{ width: `${props.width}px`, height: `${props.height}px` }}/>
            <small className="fw-bold">{`${props.width}cm x ${props.height}cm`}</small>
        </button>
    );
}