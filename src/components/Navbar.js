import React, {useContext} from 'react';
import "../styles/Navbar.css"
import {Link} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function Navbar(props) {

    return (
        <nav>
            <ul className="nav">
                <li><Link to={`/categorie/cafe`}>Café</Link></li>
                <li><Link to={`/categorie/the`}>Thé</Link></li>
                <li><Link to={`/categorie/accessoire`}>Accessoire</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;