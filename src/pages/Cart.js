import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import "../styles/Global.css";


function Cart() {
    const {items, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    console.log(items)
    const navigate = useNavigate();

    // Blocage accès panier si pas connecté
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token manquant, impossible de charger le panier.");
        return <div>Veuillez vous connecter pour accéder au panier.</div>;
    }

    // Calcul montant total TTC
    const totalAmount = items.reduce((acc, item)=> (acc+item.amount_TTC * item.quantity), 0);

    function handleDeliveryMethod() {
        navigate("/delivery_method");
    }

    return (
        <div>
            <h2>Votre Panier</h2>
            {items.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Quantité</th>
                            <th>Prix unitaire</th>
                            <th>Prix TTC</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((product) => {

                            // Calcul TTC pour chaque produit
                            let unityTTC;
                            if (product.type_conditionnement === "vrac") {
                                // Calcul du prix TTC pour les produits en vrac
                                unityTTC = (product.amount_TTC * product.quantity) / 50;
                            }

                            if (product.type_conditionnement === "unitaire") {
                                unityTTC = product.amount_TTC * product.quantity;
                            }

                            return (
                            <tr key={product.id}>
                                <td>{product.name}</td>

                                {/* Afficher liste déroulante pour produit vendu en vrac */}
                                {product.type_conditionnement === "vrac" && (
                                <td>
                                    <select value={product.quantity} onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        updateItemQuantity(product.id, newQuantity);
                                    }}>
                                        <option value="50">50g</option>
                                        <option value="100">100g</option>
                                        <option value="250">250g</option>
                                        <option value="500">500g</option>
                                        <option value="1000">1kg</option>
                                    </select>
                                </td>
                                )}

                                {/* Afficher quantité pour produit vendu à l'unité */}
                                {product.type_conditionnement === "unitaire" && (
                                <td>
                                    <button onClick={() => updateItemQuantity(product.id, -1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => updateItemQuantity(product.id, 1)}>+</button>
                                </td>
                                )}

                                <td>{product.amount_TTC} €</td>
                                <td>{unityTTC.toFixed(2)} €</td>
                                <td>
                                    <button onClick={() => removeItemFromCart(product.id)} aria-label="Supprimer"><FontAwesomeIcon icon={faTrash} /></button>
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

            {items.length > 0 && (
                <div>
                    <p>Total TTC: {totalAmount.toFixed(2)} €</p>
                    <button className="details-btn" onClick={handleDeliveryMethod}>Choisir la livraison</button>
                </div>
            )}
        </div>
    );
}

export default Cart;