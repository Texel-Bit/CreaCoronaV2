import { useNavigate } from "react-router-dom";
import { CircularProgressbar } from 'react-circular-progressbar';
import ImageAvatar from '../../../assets/image/Avatars.png';
import ImageLogout from '../../../assets/icons/logout.svg'
import LogoCreaCorona from '../../../assets/logos/crea_corona.png';
import 'react-circular-progressbar/dist/styles.css';
import './navbar.component.css';
import { NavbarItem } from "./navbar-item/navbar-item.component";

export const BrandNavbar = () => {

    const navigate = useNavigate();

    return(

        <div className="steeps-navbar bg-light p-2 d-flex gap-4 gap-sm-4 justify-content-between">

            <img
                src={LogoCreaCorona}
                className="d-inline-block align-top logo h-100"
                alt="Crea Corona"/>

            <div className="d-flex gap-sm-3 gap-4 p-1">
                
                <NavbarItem/>
                <NavbarItem/>
                <NavbarItem/>
                <NavbarItem/>
                <NavbarItem/>

            </div>

            <div className="circular-progress-bar-continer">
                <CircularProgressbar value={50} text="50%"/>
            </div>

            <div className="h-100 d-flex gap-4">

                <div className="d-flex gap-3 align-items-center">

                    <img
                        src={ImageAvatar}
                        className="d-inline-block align-top"
                        alt="Usuario conectado"/>

                        <div>
                            <h5 className='m-0 h5'>Username</h5>
                            <p className='m-0'>user@email.com</p>
                        </div>

                    <img
                        src={ImageLogout}
                        className="d-inline-block align-top logout"
                        alt="Salir"
                        height={30}
                        onClick={(e) => navigate("/")}/>                    

                </div>

            </div>
            
        </div>

        // <Navbar bg="light" data-bs-theme="light">

        //     <Container fluid className='margin-navbar' style={{height: '112px'}}>

        //         <Navbar.Brand href="#">
        //             <img
        //                 src={LogoCreaCorona}
        //                 className="d-inline-block align-top logo"
        //                 alt="Crea Corona"
        //                 height={112}/>
        //         </Navbar.Brand>

        // 	    <Nav>

        //         </Nav>
        //         {/* <Nav ref={scrollRef} >
        //             <HorizontalItemsList updateList={itemUpdate} backList={backItem} percentage={(e)=>setProgress(e)} updateItem={(e)=>update(e)}  />
        //         </Nav> */}

        //         <Nav className="item-progress-bar">
        //             <CircularProgressbar value={50} text="50%"/>
        //         </Nav>

        //         <Navbar.Collapse className="justify-content-end">
                    
        //             <div className="d-flex gap-3 align-items-center">

        //                 <img
        //                     src={ImageAvatar}
        //                     className="d-inline-block align-top"
        //                     alt="Usuario conectado"/>

        //                     <div>
        //                         <h5 className='m-0'>Username</h5>
        //                         <p className='m-0'>user@email.com</p>
        //                     </div>

        //                 <img
        //                     src={ImageLogout}
        //                     className="d-inline-block align-top logout"
        //                     alt="Salir"
        //                     height={30}
        //                     onClick={(e) => navigate("/")}/>                    

        //             </div>

        //         </Navbar.Collapse>

        //     </Container>

        // </Navbar>
    );
}