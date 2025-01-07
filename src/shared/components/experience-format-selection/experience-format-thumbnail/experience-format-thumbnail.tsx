import { IFormat } from "../../../../core/models/format/format.model";
import "./experience-format-thumbnail.css";

export interface ExperienceFormatThumbnailProps {
    format: IFormat,
    onClick: (format:IFormat) => void
    isSelected: boolean, // Added new prop
}

export const ExperienceFormatThumbnail: React.FC<ExperienceFormatThumbnailProps> = (props) => {
    const marginLeft = props.isSelected ? "10px" : "10px"; 
    const marginRight = props.isSelected ? "10px" : "10px";

    return (
        <button 
            className={`btn button p-1 border rounded d-flex flex-column experience-format-thumbnail ${props.isSelected ? "structure-selected" : "structure-Unselected"}` }
            onClick={() => props.onClick(props.format)}
            style={{ scale: "1", flex: "1 1 calc(50% - 10px)", marginLeft, marginRight,maxWidth:"100px",height:"50px" }}
        >
            <div 
                className="rounded-1 m-auto" 
                style={{ width: `${props.format.width}px`, height: `${props.format.height}px` }}
            />
            <small className="fw-bold">{`${props.format.width}cm x ${props.format.height}cm`}</small>
        </button>
    );
}
