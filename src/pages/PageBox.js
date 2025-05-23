import React, {useEffect, useState} from 'react';
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard";
import "../styles/Global.css";

function PageBox({search}) {
    const [box, setBox] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/coffret`);
                setBox(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits", error);
            } finally {
                setIsLoading(false); /* On arrête d'afficher le chargement (squelette) */
            }
        };

        void fetchProduits()
    }, []);

    // SearchBar
    const filtrerProduits = box.filter((produit) => {
        return produit.Nom_produit.toLowerCase().includes(search.toLowerCase());
    });

    if (isLoading){
        return (
            <div className="product-list">
                {Array.from({length : 6}).map((_,i) => (
                    <div key={i} className="product-skeleton">
                        {/*Image*/}
                        <Skeleton height={200} width="100%" />

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
        <div className="page-container">
            <h1>Liste des coffrets découvertes</h1>
            <div className="product-list">
                {filtrerProduits.length > 0 ? (
                    filtrerProduits.map((produit) => (
                        <ProductCard key={produit.Id_produit} produit={produit} />
                    ))
                ) : (
                    <p>Aucun produit trouvé pour cette recherche.</p>
                )}
            </div>
        </div>
    );
}

export default PageBox;