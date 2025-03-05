import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import {useNavigate} from "react-router-dom";

function Cart() {
    const { items, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    // Blocage accès panier si pas connecté
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token manquant, impossible de charger les produits.");
        return <div>Veuillez vous connecter pour accéder à votre panier.</div>;
    }

    // Calcul montant total TTC
    const totalAmount = items.reduce((acc, item)=> (acc+item.amount_TTC * item.quantity), 0);

    function handleDeliveryMethod() {
        navigate("/delivery_method")
    }

    return (
        <div>
            <h2>Votre Panier</h2>
            {items.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <ul>
                    {items.map((product) => {
                        // Calcul TTC pour chaque produit
                        const unityTTC = product.amount_TTC * product.quantity;
                        return (
                            <li key={product.id}>
                                <div>
                                    <p>{product.name}</p>
                                    <p>Prix unitaire: {product.amount_TTC} €</p>
                                    <p>Prix TTC: {unityTTC.toFixed(2)} €</p>
                                </div>
                                <div>
                                    <button onClick={() => updateItemQuantity(product.id, -1)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => updateItemQuantity(product.id, 1)}>+</button>
                                </div>
                                <div>
                                    <button onClick={() => removeItemFromCart(product.id)}>Supprimer</button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {items.length > 0 && (
                <div>
                    <p>Total TTC: {totalAmount.toFixed(2)} €</p>
                    <button onClick={handleDeliveryMethod}>Choisir la livraison</button>
                </div>
            )}
        </div>
    );
}

export default Cart;