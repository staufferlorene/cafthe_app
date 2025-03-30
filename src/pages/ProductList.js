import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "../styles/Global.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/ProductList.css";
import {useNavigate} from "react-router-dom";

function ProductList({search}) {
    const [produits, setProduits] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchProduits = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/produit`, {
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

    // SearchBar
    const filtrerProduits = produits.filter((produit) => {
        return produit.Nom_produit.toLowerCase().includes(search.toLowerCase());
    });


    return (
        <div className="product-list-container">
        <div className="banniere">
            <div className="coffret" onClick={() => navigate('/coffret')}>
                <p>Coffret découverte</p>
            </div>
            <div className="selection" onClick={() => navigate('/selection')}>
                <p>Notre sélection</p>
            </div>
        </div>

        <h1>Liste des produits</h1>

        <div className="product-list">
            {filtrerProduits.length > 0 ? (
                filtrerProduits.map((produit) => (
                    <ProductCard key={produit.Id_produit} produit={produit}/>
                ))
            ) : (
                <p>Aucun produit trouvé pour cette recherche.</p>
            )}
        </div>
    </div>
    );
}

export default ProductList;