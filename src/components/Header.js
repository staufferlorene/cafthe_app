import React from 'react';

function Header(props) {
    return (
        <div>
            <ul>
                <li><img src="/logo.png" alt="Logo du site Cafthé" width={100}/></li>
                <li>Se connecter</li>
                <li>Panier</li>
            </ul>
        </div>
    );
}

export default Header;