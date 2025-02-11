import React from 'react';
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div>
            <ul>
                <li><Link to={`/`}><img src="/logo.png" alt="Logo du site Cafthé" width={100}/></Link></li>
                <li><Link to={`/login`}>Se connecter</Link></li>
                <li>Panier</li>
            </ul>
        </div>
    );
}

export default Header;