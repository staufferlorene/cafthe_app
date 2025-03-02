import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import "../styles/Global.css"
import "../styles/ProductCard.css";
import CalculateTtc from "./CalculateTTC";
import {CartContext, useCart} from "../context/CartContext";

function ProductCard({produit}) {
    const { addItemToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addItemToCart(produit.Id_produit, produit.Nom_produit, produit.Prix_HT, produit.Tva_categorie);
    };

    return (
        <div className="product-card">
            <img className="product-img" src={`/${produit.Chemin_img}`} alt="image de produit vendu par notre enseigne"/>
            <h3>{produit.Nom_produit}</h3>
            <p>Prix TTC: <CalculateTtc produit={produit} /></p>
                <Link to={`/produit/${produit.Id_produit}`} className="details-btn">
                    Voir détails
                </Link>
                <button className="" onClick={() => handleAddToCart(produit.Id_produit)}>
                    Ajouter au panier
                </button>
        </div>
    );}

export default ProductCard;