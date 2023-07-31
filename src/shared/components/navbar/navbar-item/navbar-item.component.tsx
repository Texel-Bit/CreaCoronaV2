import { FormCheck } from "react-bootstrap";
import NavItemIcon from '../../../../assets/icons/background_grid_small.png'

export const NavbarItem = () => {
    return (
        <div className="p-2 border rounded navbar-item">

            <div className="d-flex justify-content-between pb-1">
                <img src={NavItemIcon} alt="navbar icon" height={35} />
                <FormCheck disabled checked/>
            </div>
            
            <div>
                <label className="navbar-item-text text-center color-primary">
                    Selecciona la superficie
                </label>
            </div>

        </div>
    );
}