import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Global.css";
import "../styles/Navbar.css";

function Navbar(props) {

    return (
        <nav>
            <ul className="nav">
                <li><Link to={`/categorie/cafe`}>Café</Link></li>
                <li><Link to={`/categorie/the`}>Thé</Link></li>
                <li><Link to={`/categorie/accessoire`}>Accessoires</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;