import React from 'react';
import { Link } from "react-router-dom";
import "../styles/Global.css"
import "../styles/ProductCard.css";
import CalculateTtc from "./CalculateTTC";

function ProductCard({produit}) {
    return (
        <div className="product-card">
            <img className="product-img" src={`/${produit.Chemin_img}`} alt="image de produit vendu par notre enseigne"/>
            <h3>{produit.Nom_produit}</h3>
            <p><CalculateTtc produit={produit} /></p>
                <Link to={`/produit/${produit.Id_produit}`} className="details-btn">
                    Voir détails
                </Link>
        </div>
    );
}

export default ProductCard;