import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {CartContext, useCart} from "../context/CartContext";
import "../styles/Global.css"
import "../styles/Header.css"


function Header(props) {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const { items} = useContext(CartContext);
    const navigate = useNavigate();
    //const { cartItems } = useCart();

    const handleLogout = () => {
        logout();
    };

    function handleMyAcc() {
        navigate("/my_account")
    }

    function handleMyOrder() {
        navigate("/commande/client/:id")
    }

    function handleCart() {
        if (isAuthenticated) {
            navigate("/cart");
        } else {
            alert("Veuillez vous connecter pour accéder à votre panier");
            navigate("/login");
        }
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
                    <button onClick={handleCart}>Panier {items.length > 0 ? `(${items.length})` : ""}</button>
                </li>
            </ul>
        </div>
    );
}

export default Header;