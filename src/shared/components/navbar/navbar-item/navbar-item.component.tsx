import { FormCheck } from "react-bootstrap";
import {navbarItemsProps} from '../../../../core/models/navBarItems/service-navBar';


export const NavbarItem:React.FC<navbarItemsProps> = (props) => {
    return (
        <div className="p-2 border rounded navbar-item" >

            <div className="d-flex justify-content-between pb-1" >
                <img src={props.imagen} alt="navbar icon" height={35} />
                < FormCheck disabled={false} />
            </div>
            
            <div>
                <label className="navbar-item-text text-center color-primary">
                    {props.text}
                </label>
            </div>

        </div>
    );
}