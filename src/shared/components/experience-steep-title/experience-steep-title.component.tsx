import { ReactElement } from 'react';
import DesignIcon from '../../../assets/icons/view_cozy_ico.png';

interface stepDataProps
{
    title:string|null;
    icon:string|"";
    description:ReactElement
}

export const ExperienceSteepTitle: React.FC<stepDataProps> = ({title, icon, description}) => {
    return (
        <div className="text-center text-nowrap ">
            <div className='d-flex gap-2 justify-content-center align-items-center'>
                <div className='d-inline-block p-1 shadow-sm rounded-2'>
                    <img src={icon} alt="Design Icon"/>
                </div>
                <h3 className="color-middle fw-bold m-0 mb-3 titleCustomCss">{title}</h3>
            </div>
            {description}
        </div>
    );
}