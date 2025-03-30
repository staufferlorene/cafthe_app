import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/Global.css"
import "../styles/ProductCard.css";
import {CartContext} from "../context/CartContext";

function ProductCard({produit}) {
    const { addItemToCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Ajout du produit au panier en lui passant les données indiquées
    const handleAddToCart = () => {
        addItemToCart(produit.Id_produit, produit.Nom_produit, produit.Prix_HT, produit.Prix_TTC, produit.Tva_categorie, produit.Type_conditionnement);
    };

    return (
        // Récupération catégorie pour appliquer en CSS un style différent sur chaque catégorie
        <div className={`product-card product-card-${produit.Id_categorie}`}>
            <img className="product-img" src={`/${produit.Chemin_img}`} alt={"Image" + produit.Chemin_img} />
            <h3>{produit.Nom_produit}</h3>

            {/*Notion "à partir de X €" si vrac*/}
            {produit.Type_conditionnement === "vrac" ? (
                <p>A partir de {produit.Prix_TTC} €</p>
            ) : <p>{produit.Prix_TTC} €</p>}

            <button className="details-btn gap" onClick={() => navigate(`/produit/${produit.Id_produit}`)}>
                Voir détail
            </button>
            <button className="details-btn" onClick={() => handleAddToCart(produit.Id_produit)}>
                Ajouter au panier
            </button>
        </div>
    );}

export default ProductCard;