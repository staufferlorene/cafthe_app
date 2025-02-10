import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductList(props) {
    const [produits, setProduits] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/produit");
                setProduits(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits", error);
            }
        };

        void fetchProduits()
    }, []);

    return (
        <div>
            <h3>Liste des produits</h3>
                <div className="product-list">
                    {produits.map((produit) => (
                        <ProductCard key={produit.Id_produit} produit={produit} />
                    ))}
                </div>
        </div>
    );
}

export default ProductList;