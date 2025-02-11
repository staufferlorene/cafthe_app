import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Header.css"

function Header(props) {
    return (
        <div className="header">
            <ul className="img">
                <li><Link to={`/`}><img src="/logo.png" alt="Logo du site Cafthé" width={100}/></Link></li>
            </ul>
            <ul className="header">
                <li><Link to={`/login`}>Se connecter</Link></li>
                <li>Panier</li>
            </ul>
        </div>
    );
}

export default Header;