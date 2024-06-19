import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import ffLogo from '../assets/ffLogo.png';
import { useCurrentUser, useSetCurrentUser } from '../context/CurrentUserContext';
import axios from 'axios';
import { removeTokenTimestamp } from '../utils/Utils';
import { useSetGlobalSuccessMessage, useSetShowGlobalSuccess } from '../context/GlobalMessageContext';
import { Navbar, Nav } from 'react-bootstrap';
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';


const NavBar = () => {

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const setShowGlobalSuccess = useSetShowGlobalSuccess();
    const setGlobalSuccessMessage = useSetGlobalSuccessMessage();

    const handleSignout = async () => {
        try {
            await axios.post(`dj-rest-auth/logout/`);
            setGlobalSuccessMessage("Successfully Signed out..");
            setShowGlobalSuccess(true);
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch(err) {
            console.log(err)
        }
    }

    const loggedOutLinks = (
        <>
        <NavLink className={styles.Link} to="/signup">Sign Up</NavLink>
        <NavLink className={styles.Link} to="/signin"> Sign In</NavLink>
        </>
    );

    const loggedInLinks = (
        <>
        <NavLink className={styles.Link} to="/refine">Refine Yourself</NavLink>
        <NavLink className={styles.Link}to="/organise">Organise</NavLink>
        <NavLink className={styles.Link}onClick={handleSignout} to="/"> Sign Out</NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} expand="md" fixed="top" className={styles.Header}>
            <NavLink to="/">
            <div className={styles.LogoContainer}>
                <img
                    src={ffLogo}
                    alt="Forge Focus"
                    className={styles.Logo}/>
                <div>
                <h2 className={styles.LogoName}>Forge Focus</h2>
                </div>
            </div>
            </NavLink>
            <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
            />
            <Navbar.Collapse id="basic-navbar-nav" className={styles.DesktopLinks}>
            <Nav className={styles.NavLinks}>
            {currentUser ? (loggedInLinks) : (loggedOutLinks)}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default NavBar