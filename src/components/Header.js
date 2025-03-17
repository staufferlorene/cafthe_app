import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {CartContext} from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faListUl,

    faBars,   // Ajout de l'icône burger
    faTimes   // Icône pour fermer le menu

} from '@fortawesome/free-solid-svg-icons';
import "../styles/Global.css";
import "../styles/Header.css";
import Navbar from "./Navbar";
// import SearchBar from "./SearchBar";

// NEW props {searchInput, setSearchInput}
function Header() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { items} = useContext(CartContext);
    const navigate = useNavigate();

    // Pour le menu burger
    // Gérer son état, false par défaut pour qu'il soit masqué
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    const handleLogout = () => {
        logout();
        navigate("/");
    };

    function handleMyAcc() {
        navigate("/my_account");
    }

    function handleMyOrder() {
        navigate("/commande/client/:id");
    }

    return (
        <div className="header-container">
            <ul>
                <li><Link to={`/`} aria-label="Accueil"><img className="logo" src="/logo.png" alt=""/></Link></li>
            </ul>
            <ul><Navbar /></ul>

            {/*NEW*/}
            <button className="burger-menu" onClick={toggleMenu} aria-label="Menu">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="burger-icon" />
            </button>

            {/*NEW*/}
            {/*<ul className="header">*/}
            <ul className={`header ${isMenuOpen ? "open" : ""}`}>

                <li>
                    {isAuthenticated ? (
                        <>

                            {/*<span>Bonjour {user.prenom} {user.nom}</span>*/}
                            <button onClick={handleMyAcc} aria-label="Mon compte"><FontAwesomeIcon icon={faUser} className="header-icon"/></button>
                            <button onClick={handleMyOrder} aria-label="Mes commandes"><FontAwesomeIcon icon={faListUl} className="header-icon"/></button>
                            <button onClick={handleLogout} aria-label="Se déconnecter"><FontAwesomeIcon icon={faRightFromBracket} className="header-icon"/></button>
                        </>
                    ) : (
                        <button><Link to={`/login`} aria-label="Se connecter"><FontAwesomeIcon icon={faRightToBracket} className="header-icon"/></Link></button>
                    )}
                    <button><Link to={`/cart`} aria-label="Panier"><FontAwesomeIcon icon={faCartShopping} className="header-icon"/> {items.length > 0 ? `(${items.length})` : ""}</Link>
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Header;