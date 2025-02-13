import React, {use, useContext, useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "../styles/Global.css"
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/ProductList.css"

function ProductList(props) {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    const fetchProduits = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/produit", {
                headers: { Authorization: "Bearer " + token },
            });
            setProduits(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des produits :", error);
        } finally {
            setIsLoading(false); // On arrête d'afficher les squelettes
        }
    };
        void fetchProduits()
    }, []);

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token manquant, impossible de charger les produits.");
        return <div>Veuillez vous connecter pour voir les produits.</div>;
    }

    if (isLoading){
        return (
            <div className="product-list">
                {Array.from({length : 6}).map((_,i) => (
                    <div key={i} className="product-skeleton">
                        {/*Image*/}
                        <Skeleton height={200} width={300} />

                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={20} width="70%" />
                        </div>

                        <div style={{marginTop: "10px"}}>
                            <Skeleton height={20} width="40%" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

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