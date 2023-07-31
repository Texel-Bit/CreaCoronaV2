import './text-caption.component.css';

export const TextCaption = () => {
    return (
        <div className="text-caption-container p-5 d-flex flex-column gap-3 align-items-center">
            <h1 className="fw-bold">Diseña las paredes de tu espacio preferido</h1>
            <label>
                <small>Explora, diseña y prueba el estilo que prefieras para tus espacios.</small>
            </label>
        </div>
    );
}