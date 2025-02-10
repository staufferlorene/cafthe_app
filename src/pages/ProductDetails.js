import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function ProductDetails(props) {
    const { id } = useParams();
    const [produits, setProduits] = useState([]);

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
                {/*image*/}
                <h2>{produits.Nom_produit}</h2>
                <p>Description: {produits.Description}</p>
                <p><strong>Prix:</strong> {produits.Prix_HT}</p>
                <p><strong>Stock:</strong> {produits.Stock}</p>
        </div>
    );
}

export default ProductDetails;