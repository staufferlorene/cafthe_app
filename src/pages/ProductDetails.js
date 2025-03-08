import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../styles/Global.css"
import {CartContext} from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const [produits, setProduits] = useState([null]);
    const { addItemToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/produit/${id}`);
                setProduits(response.data);
            } catch (error){
                console.error("Erreur de chargement du détail du produit", error);
            }
        };

        void fetchProduits()
    }, [id]);

    const handleAddToCart = () => {
        addItemToCart(produits.Id_produit, produits.Nom_produit, produits.Prix_HT, produits.Prix_TTC, produits.Tva_categorie);
    };

    return (
        <div className="product-details">
                <img className="product-img" src={`/${produits.Chemin_img}`} alt="image de produit vendu par notre enseigne"/>
                <h2>{produits.Nom_produit}</h2>
                <p>Description: {produits.Description}</p>
                <p>Stock: {produits.Stock}</p>
                <p>Prix TTC: {produits.Prix_TTC}</p>
                <button className="details-btn" onClick={() => handleAddToCart(produits.Id_produit)}>
                    Ajouter au panier
                </button>
        </div>
    );
}

export default ProductDetails;