import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {CartContext} from "../context/CartContext";
import "../styles/Global.css";
import "../styles/ProductDetail.css";

function ProductDetails() {
    const { id } = useParams();
    const [produits, setProduits] = useState([null]);
    const { addItemToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/produit/${id}`);
                setProduits(response.data);
            } catch (error){
                console.error("Erreur de chargement du détail du produit", error);
            }
        };

        void fetchProduits()
    }, [id]);

    // Ajout du produit au panier en lui passant les données indiquées
    const handleAddToCart = () => {
        addItemToCart(produits.Id_produit, produits.Nom_produit, produits.Prix_HT, produits.Prix_TTC, produits.Tva_categorie, produits.Type_conditionnement);
    };

    return (
            <section className={`product-details product-details-${produits.Id_categorie}`}>
                <div className="product-img-details">
                    <img className="img-details" src={`/${produits.Chemin_img}`} alt={"Image " + produits.Chemin_img}/>
                </div>
                <div className="product-text-details">
                    <h1 className="text-title">{produits.Nom_produit}</h1>
                    <p className="text-description">{produits.Description}</p>
                    <p className="text-stock">En stock: {produits.Stock}</p>

                    {/*Notion "à partir de X €" si vrac*/}
                    {produits.Type_conditionnement === "vrac" ? (
                    <p className="text-price">A partir de {produits.Prix_TTC} €</p>
                    ) : <p>{produits.Prix_TTC} €</p>}

                    <button className="details-btn mb" onClick={() => handleAddToCart(produits.Id_produit)}>
                        Ajouter au panier
                    </button>
                </div>
            </section>
    );
}

export default ProductDetails;