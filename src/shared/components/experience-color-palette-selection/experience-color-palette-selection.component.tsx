import { FaCaretDown } from 'react-icons/fa'
import './experience-color-palette-selection.component.css'
import Singleton from '../../../core/patterns/singleton';
import { getAllDesignColorsBundle } from '../../../core/services/design.service';
import { useEffect } from "react";
import { IColorBundle } from '../../../core/models/color/color-bundle.model';
export const ExperienceColorPaletteSelection = () => {
    

    // ... rest of your component code
    
    useEffect(() => {
        const fetchColors = async () => {

            if(Singleton.getInstance().currentColorList)
            {
                if (Singleton.getInstance().currentColorList?.length??0 > 0) {
                    if (
                        Singleton.getInstance().selectedDesignType &&
                        Singleton.getInstance().currentEnvironmentType 
                    ) {
                        let colorTypeId = Singleton.getInstance().GetCurrenColorTypeID();
        
                        const CurrColorsSelected = await getAllDesignColorsBundle(
                            Singleton.getInstance().selectedDesignType?.id??1,
                            colorTypeId,
                            Singleton.getInstance().currentEnvironmentType?.id??1
                        );


                        
                    } else {
                        console.error('Required properties are not defined');
                    }
                } else {
                    console.error('currentColorList is not defined or empty');
                }
            }
            
            
        };
    
        fetchColors();
    }, []);  // <-- Don't forget the dependencies array. Update it as per your requirements.
    
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