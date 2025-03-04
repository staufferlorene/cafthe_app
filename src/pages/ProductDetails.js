import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import "../styles/Global.css"

function ProductDetails() {
    const { id } = useParams();
    const [produits, setProduits] = useState([null]);

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

    return (
        <div className="product-details">
                <img className="product-img" src={`/${produits.Chemin_img}`} alt="image de produit vendu par notre enseigne"/>
                <h2>{produits.Nom_produit}</h2>
                <p>Description: {produits.Description}</p>
                <p>Stock: {produits.Stock}</p>
                <p>Prix TTC: {produits.Prix_TTC}</p>
        </div>
    );
}

export default ProductDetails;