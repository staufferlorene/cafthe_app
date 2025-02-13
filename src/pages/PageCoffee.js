import React, {useEffect, useState} from 'react';
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard";
import "../styles/Global.css"

function PageCoffee(props) {
    const [coffee, setCoffee] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/categorie/cafe");
                setCoffee(response.data);
            } catch (error){
                console.error("Erreur de chargement des produits", error);
            } finally {
                setIsLoading(false); /* On arrête d'afficher le chargement (squelette) */
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

    return (
        <div>
            <h3>Liste des cafés</h3>
            <div className="product-list">
                {coffee.map((produit) => (
                    <ProductCard key={produit.Id_produit} produit={produit} />
                ))}
            </div>
        </div>
    );
}


export default PageCoffee;