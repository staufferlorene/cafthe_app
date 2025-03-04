import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import "../styles/Global.css"
import "../styles/ProductCard.css";
import CalculateTtc from "./CalculateTTC";
import {CartContext, useCart} from "../context/CartContext";

function ProductCard({produit}) {
    const { addItemToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        //
        // REFAIRE LE CALCUL ICI ET JE REUTILISE LA VARIABLE DECLAREE POUR ADDITEMTOCART
        // const prixTTC = {(produit.Prix_HT * (1 + (produit.Tva_categorie / 100))).toFixed(2)} €;
        //
        // addItemToCart(produit.Id_produit, produit.Nom_produit, prixTTC, produit.Tva_categorie);

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