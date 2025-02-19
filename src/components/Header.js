import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import "../styles/Global.css"
import "../styles/Header.css"

function Header(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
    };

    function handleMyAcc() {
        navigate("/my_account")
    }

    function handleMyOrder() {
        navigate("/my_order")
    }

    return (
        <div className="header-container">
            <ul>
                <li><Link to={`/`}><img className="logo" src="/logo.png" alt="Logo du site Cafthé"/></Link></li>
            </ul>
            <ul className="header">
                <li>
                    {isAuthenticated ? (
                        <>
                            <span>Bonjour {user.prenom} {user.nom}</span>
                            <button onClick={handleMyAcc}>Mon compte</button>
                            <button onClick={handleMyOrder}>Mes commandes</button>
                            <button onClick={handleLogout}>Se déconnecter</button>
                        </>
                    ) : (
                        <Link to={`/login`}>Se connecter</Link>
                    )}
                </li>
                <li>Panier</li>
            </ul>
        </div>
    );
}

export default Header;