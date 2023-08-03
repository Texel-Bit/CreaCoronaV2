import "./experience-format-thumbnail.css";

export const ExperienceFormatThumbnail = () => {
    return(
        <button className="btn button p-1 border rounded d-flex flex-column experience-format-thumbnail">
            <div className="rounded-1 m-auto" style={{ width: "30.5px", height: "15.6px" }}/>
            <small className="fw-bold">30.5cm x 15.6cm</small>
        </button>
    );
}