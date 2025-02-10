import React from 'react';
import "../styles/Navbar.css"
import {Link} from "react-router-dom";

function Navbar(props) {
    return (
        <div>
            <ul className="nav">
                <li><Link to={`/categorie/cafe`}>Café</Link></li>
                <li><Link to={`/categorie/the`}>Thé</Link></li>
                <li><Link to={`/categorie/accessoire`}>Accesoire</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;