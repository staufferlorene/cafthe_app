import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {CartContext} from "../context/CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,     // icône du panier
    faRightFromBracket, // icône déconnexion
    faRightToBracket,   // icône connexion
    faUser,             // icône informations personnelles
    faListUl,           // icône des commandes
    faBars,             // icône du menu burger
    faTimes             // croix pour fermer le menu burger
} from '@fortawesome/free-solid-svg-icons';
import "../styles/Global.css";
import "../styles/Header.css";
import Navbar from "./Navbar";

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { items} = useContext(CartContext);
    const navigate = useNavigate();

    // Pour le menu burger
    // Gérer son état, false par défaut pour qu'il soit masqué
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Changer icône affiché (trait ou croix)
    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    // Déconnexion et redirection vers page d'accueil
    function handleLogout() {
        logout();
        navigate("/");
    }

    // Redirection vers informations personnelles
    function handleMyAcc() {
        navigate("/my_account");
    }

    // Redirection vers les commandes
    function handleMyOrder() {
        navigate("/commande/client/:id");
    }

    return (
        <header className="header-container">
            {/*logo*/}
            <ul>
                <li><Link to={`/`} aria-label="Voir page d'accueil"><img className="logo" src="/logo.png" alt=""/></Link></li>
            </ul>

            <nav>
            <ul><Navbar /></ul>
            </nav>

            {/*Menu burger*/}
            <button className="burger-menu" onClick={toggleMenu} aria-label="Voir menu">
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="burger-icon" />
            </button>

            <ul className={`header ${isMenuOpen ? "open" : ""}`}>

                <li>
                    {isAuthenticated ? (
                        <>
                            {/*Affichage si connecté*/}
                            <button onClick={handleMyAcc} aria-label="Voir mes informations personnelles"><FontAwesomeIcon icon={faUser} className="header-icon"/></button>
                            <button onClick={handleMyOrder} aria-label="Voir mes commandes"><FontAwesomeIcon icon={faListUl} className="header-icon"/></button>
                            <button onClick={handleLogout} aria-label="Se déconnecter"><FontAwesomeIcon icon={faRightFromBracket} className="header-icon"/></button>
                        </>
                    ) : (
                        <button><Link to={`/login`} aria-label="Se connecter"><FontAwesomeIcon icon={faRightToBracket} className="header-icon"/></Link></button>
                    )}

                    {/*Connecté ou non afficher panier*/}
                    <button>
                        <Link to={`/cart`} aria-label="Voir le panier"><FontAwesomeIcon icon={faCartShopping} className="header-icon"/>
                        {/*Afficher nombre produit dans le panier*/}
                        {items.length > 0 ? `(${items.length})` : ""}</Link>
                    </button>
                </li>
            </ul>
        </header>
    );
}

export default Header;