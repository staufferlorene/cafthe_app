import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import "../styles/Global.css"
import "../styles/ProductCard.css";
import {CartContext, useCart} from "../context/CartContext";

function ProductCard({produit}) {
    const { addItemToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addItemToCart(produit.Id_produit, produit.Nom_produit, produit.Prix_HT, produit.Prix_TTC, produit.Tva_categorie);
    };

    return (
        <div className={`product-card product-card-${produit.Id_categorie}`}>
            <img className="product-img" src={`/${produit.Chemin_img}`} alt="image de produit vendu par notre enseigne"/>
            <h3>{produit.Nom_produit}</h3>
            <p>Prix TTC: {produit.Prix_TTC}</p>
            <button><Link to={`/produit/${produit.Id_produit}`} className="details-btn">
                    Voir détails
                </Link></button>
            {/*<a><button></button></a>*/}
                <button className="details-btn" onClick={() => handleAddToCart(produit.Id_produit)}>
                    Ajouter au panier
                </button>
        </div>
    );}

export default ProductCard;