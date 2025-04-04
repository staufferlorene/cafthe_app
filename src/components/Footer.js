import React from 'react';
import {Link} from "react-router-dom";
import "../styles/Footer.css";

function Footer(props) {
    return (
        <footer className="footer">
            <div>
                <ul><p>Plan du site :</p></ul>
                <ul><Link to={`/`}>Tous nos produits</Link></ul>
                <ul><Link to={`/categorie/the`}>Nos thés</Link></ul>
                <ul><Link to={`/categorie/cafe`}>Nos cafés</Link></ul>
                <ul><Link to={`/categorie/accessoire`}>Nos accessoires</Link></ul>
                <ul><Link to={`/coffret`}>Nos coffrets découverte</Link></ul>
                <ul><Link to={`/selection`}>Notre sélection</Link></ul>
                <ul><Link to={`/login`}>Se connecter</Link></ul>
                <ul><Link to={`/inscription`}>S'inscrire</Link></ul>
            </div>
            <div className="liens">
                <ul><Link to={`/privacy_policy`}>Politique de confidentialité</Link></ul>
                <ul><Link to={`/legal_notices`}>Mentions légales</Link></ul>
                <ul><Link to={`/cgv`}>CGV</Link></ul>
            </div>
        </footer>
    );
}

export default Footer;