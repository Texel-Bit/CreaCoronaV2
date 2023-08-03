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
        <div className="text-center">
            <div className='d-inline-block p-2 shadow rounded-4'>
                <img src={icon} alt="Design Icon"/>
            </div>
            <h3 className="color-primary fw-bold m-0">{title}</h3>
            {description}
        </div>
    );
}