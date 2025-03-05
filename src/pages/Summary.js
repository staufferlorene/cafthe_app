import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useLocation} from "react-router-dom";

function Summary(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart)
    const [infos, setInfos] = useState({});

    const location = useLocation();
    const delivery = location.state?.delivery;  // On récupère la valeur de delivery passé via state


    // Calcul montant total TTC
    const totalAmount = cart.reduce((acc, cart)=> (acc+cart.amount_TTC * cart.quantity), 0);

    // useEffect(() => {
    //     const fetchProduits = async () => {
    //         try {
    //             const response = await axios.get(`http://localhost:3000/api/client/${user.id}`);
    //             setInfos(response.data);
    //         } catch (error) {
    //             console.error("Erreur de chargement", error);
    //         }
    //     };
    //
    //     if (user) {
    //         void fetchProduits();
    //     }
    // }, [user.id]);

    return (
        <div>
            <h2>Récapitulatif de votre commande</h2>
            <h3>Votre panier</h3>

            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (

                <ul>
                    {cart.map((product) => {
                        // Calcul TTC pour chaque produit
                        const unityTTC = product.amount_TTC * product.quantity;
                        return (
                            <li key={product.id}>
                                <div>
                                    <p>{product.name}</p>
                                    <p>{product.quantity}</p>
                                    <p>Prix unitaire: {product.amount_TTC} €</p>
                                    <p>Prix TTC: {unityTTC.toFixed(2)} €</p>
                                </div>
                            </li>

                        );
                    })}
                </ul>
            )}

            {cart.length > 0 && (
            <div><p>Total TTC: {totalAmount.toFixed(2)} €</p></div>
            )}

            {/*/!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\*/}
            {/*/!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\*/}
            {/*/!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\*/}
            {/*/!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\*/}
            {/* affichage mode de livraison en condition aussi, seulement si formulaire soumis avec "id" en paramètre*/}

            <h3>Votre mode de livraison</h3>

            <p>{delivery ? (delivery === "home" ? `À votre domicile situé ${user.adresse}` : "Au magasin situé 1 Rue Cafthe, 41000 Blois") : "Non sélectionné"}</p>


            <Link to={`/delivery_method`} className={"details-btn"}>
                Retour
            </Link>
        </div>
    )
};



export default Summary;