import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {CartContext} from "../context/CartContext";
import "../styles/Global.css";
import "../styles/Summary.css";
import axios from "axios";

function Summary(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);

    // Calcul montant total TTC
    const totalAmount = cart.reduce((acc, item) => {
        let unityTTC;
        if (item.type_conditionnement === "vrac") {
            unityTTC = (item.amount_TTC * item.quantity) / 50;
        } else if (item.type_conditionnement === "unitaire") {
            unityTTC = item.amount_TTC * item.quantity;
        } else {
            unityTTC = 0;
        }
        return acc + unityTTC;
    }, 0);

    // Calcul montant total HT
    const totalAmountHT = cart.reduce((acc, item) => {
    let unityHT;
    if (item.type_conditionnement === "vrac") {
        unityHT = (item.amount * item.quantity) / 50;
    } else if (item.type_conditionnement === "unitaire") {
        unityHT = item.amount * item.quantity;
    } else {
        unityHT = 0;
    }
    return acc + unityHT;
}, 0);

    // Calcul montant total TVA
    const totalTVA = totalAmount - totalAmountHT


    // Accès à la donnée stockée dans location (la méthode de livraison choisie)
    const location = useLocation();
    // Récupération de la valeur de delivery passé via useState
    const delivery = location.state?.delivery;
    // Stockage du choix du mode de paiement
    const [methodPayment, setMethodPayment] = useState(null);

    async function handlePayment(method) {
        setMethodPayment(method)

        // Intégration de la commande en BDD
        try {
            // Envoi informations saisies à l'API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/order/register`,
                {
                    Statut_commande: "en préparation",
                    Adresse_livraison: delivery,
                    Id_vendeur: 1,
                    Id_client: user.id,
                    Montant_commande_HT: totalAmountHT,
                    Montant_TVA: totalTVA,
                    Montant_commande_TTC: totalAmount,
                    ligne_commande: {cart},
                });
            if (response.status === 201) {
                // Utilisation de useState pour faire passer les choix livraison + paiement sur la page confirm grâce à navigate
                navigate("/confirm", {state: {delivery, methodPayment: method}})

                // Vider le localStorage
                clearCart();
            }
        } catch (error) {
            console.error("Erreur Axios :", error)
        }
    }

    return (
        <div className="summary-container">
            <h1>Récapitulatif de la commande</h1>
            <h2>Votre panier</h2>

            {cart.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (

                <table className="summary-table">
                    <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire / 50g</th>
                        <th>Prix TTC</th>
                    </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => {

                            // Calcul TTC pour chaque produit
                            let unityTTC;

                            // Calcul du prix TTC pour les produits en vrac
                            if (product.type_conditionnement === "vrac") {
                                unityTTC = (product.amount_TTC * product.quantity) / 50;
                            }

                            // Calcul du prix TTC pour les produits unitaire
                            if (product.type_conditionnement === "unitaire") {
                                unityTTC = product.amount_TTC * product.quantity;
                            }

                            return (
                                <tr key={product.id}>
                                    <td>{product.name}</td>

                                        {/* Afficher la notion de "gramme" pour produit vendu en vrac */}
                                        {product.type_conditionnement === "vrac" && (
                                        <td>{product.quantity}g</td>)
                                        }

                                        {/* Si produit conditionnement unitaire n'afficher que la quantité */}
                                        {product.type_conditionnement === "unitaire" && (
                                            <td>{product.quantity}</td>)
                                        }

                                    <td>{product.amount_TTC} €</td>
                                    <td>{unityTTC.toFixed(2)} €</td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="Total-TTC">Total TTC: {totalAmount.toFixed(2)} €</td>
                        </tr>
                    </tbody>
                </table>
            )}

            {/*{cart.length > 0 && (*/}
            {/*<div><p className="Total-TTC">Total TTC: {totalAmount.toFixed(2)} €</p></div>*/}
            {/*)}*/}

            <h2>Votre mode de livraison</h2>

            <p>{delivery ? (delivery === "home" ? `À votre domicile situé ${user.adresse}` : "Au magasin situé 1 Rue CafThé, 41000 Blois") : null}</p>

            <button className="details-btn gap" onClick={() => navigate("/delivery_method")} >
                Retour
            </button>

            <button className="details-btn gap" onClick={() => handlePayment("online")}>Payer en ligne</button>

            {/* Afficher le bouton uniquement si la livraison est en magasin */}
            {delivery === "store" && (
                <button className="details-btn" onClick={() => handlePayment("inStore")}>Payer en magasin</button>
            )}
        </div>
    )
}

export default Summary;