import React, { useEffect, useState } from 'react';
import './experience-format-selection.component.css';
import { ExperienceFormatThumbnail, ExperienceFormatThumbnailProps } from './experience-format-thumbnail/experience-format-thumbnail';
import Singleton from '../../../core/patterns/singleton';


interface ExperienceFormatSelectionProps {
    formats: ExperienceFormatThumbnailProps[]|[];
}


export const ExperienceFormatSelection: React.FC<ExperienceFormatSelectionProps> = (props) => {
    const [selectedFormatId, setSelectedFormatId] = useState<number | null>(null);

    useEffect(() => {

        let formatSelected=null;

        if(Singleton.getInstance().currentFormat)
        {
            const foundFormat = props.formats?.find(format => format.format.id === Singleton.getInstance().currentFormat?.id);

           

            if (foundFormat) 
            {
                formatSelected=foundFormat.format;
                foundFormat.onClick(formatSelected);
            }
            else
            {
                formatSelected=props.formats[0].format;
                props.formats[0].onClick(props.formats[0].format);
            }

           
        }
        else
        {
            formatSelected=props.formats[0].format;
            props.formats[0].onClick(props.formats[0].format);
        }
        
        setSelectedFormatId(formatSelected.id);

        Singleton.getInstance().currentFormat=formatSelected;
        
        console.log("Changing Format ",formatSelected)

    }, []);
    
    
    return(
        <div className='mw-100 overflow-hidden'>

            <div className="background-color-middle px-3 py-1 w-50 rounded-top">
                <h6 className="m-0 color-white fw-normal">Formato</h6>
            </div>

            <div className="d-flex p-2 justify-content-around w-100 align-items-center experience-format-container" style={{ height: "200px", display: "flex", flexWrap: "wrap" }}>                {
                    props.formats.map(format => {
                        return <ExperienceFormatThumbnail
                            key={`experienceFormatThumbnail${format.format.id}`}
                            format={format.format}
                            isSelected={selectedFormatId === format.format.id}
                            onClick={() => { 
                                format.onClick(format.format); // Updated here to properly call onClick
                                setSelectedFormatId(format.format.id); 
                            }} 
                        />
                    })
                }
            </div>

        </div>
    );
}