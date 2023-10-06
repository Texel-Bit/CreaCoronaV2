import { useState } from 'react';
import { IColor } from '../../../core/models/color/color.model';
import Singleton from '../../../core/patterns/singleton';
import { getServerImagesUrl } from '../../utilities/format-server-endpoints.utility';
import './experience-texture-selection.component.css';


interface ExperienceTextureSelectionProps {
    colorArray: IColor[];
    onColorClick?: (color: IColor) => void;
}

export const ExperienceTextureSelection: React.FC<ExperienceTextureSelectionProps> = ({colorArray, onColorClick}) => {

    useState(()=>{

        Singleton.getInstance().ChangeStructure(null);
        
        if(Singleton.getInstance().currentColorList!?.length==0 && Singleton.getInstance().GetCurrenColorTypeID()==1)
        {
            Singleton.getInstance().colorIndex=0
            Singleton.getInstance().ChangeSelectedColor(colorArray[0])
        }
        
    })
    
    return (
        <div className='h-md-100 mh-md-100 mw-100 textures-selection-container'>
            <div className="background-color-middle rounded-top text-center">
                <h6 className="m-0 color-white fw-normal">
                    {
                        colorArray[0].isFullField
                        ? <>{Singleton.getInstance().selectedDesignType?.name} Campo lleno</>
                        : <>{Singleton.getInstance().selectedDesignType?.name} Con Diseño</>
                    }
                
                </h6>
            </div>

            <div className="border border-1 p-2 textures-containter-grid-content">
                <div className="textures-containter-grid gap-1">
                    {colorArray.map((color, index) => (
                            <div key={index} className='cursor-pointer cursor-pointer-hover' style={{ backgroundImage: `url(${getServerImagesUrl(color.source)})`,border: '1px solid black' }} onClick={(e:any)=>{
                            const coloractual = e.target.style.backgroundImage;
                            Singleton.getInstance().ChangeSelectedColor( color);
                            const elementSelected=document.getElementById(`${sessionStorage.getItem('BumbleId')}`)
                            if(elementSelected)elementSelected.style.backgroundImage=coloractual
                        }}><div className="color-container-name">{color.name}</div></div>
                    ))}
                </div>

            </div>

        </div>
    );
}