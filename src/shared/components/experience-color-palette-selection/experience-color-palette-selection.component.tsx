import { FaCaretDown } from 'react-icons/fa'
import './experience-color-palette-selection.component.css'

export const ExperienceColorPaletteSelection = () => {
    return(
        <div className="p-1 w-100 d-flex align-items-center justify-content-between experience-color-palette-selection-container">
            <small>Selección</small>
            <div className='color-palette-row'>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
                <div className='color-palette-item rounded-circle' style={{ backgroundImage: "url(https://corona.texelbit.com:9445/uploads/DesignColors/c028.png)" }}></div>
            </div>
            <button type='button' className='btn btn-sm btn-primary select-color-palette-btn py-0 px-1'>
                <FaCaretDown />
            </button>
        </div>
    );
}