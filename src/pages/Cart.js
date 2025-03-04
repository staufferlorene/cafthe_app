import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CalculateTtc from "../components/CalculateTTC";
import {useNavigate} from "react-router-dom";

function Cart() {
    const { items, updateItemQuantity, removeItemFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    // déclarer usestate pour stocker produit avec détails + appeler fonction

    // const test = CalculateTtc(items);
    // console.log(test)


    // Si je garde totalAmount il faut revoir le calcul pour ajouter la tva mais /!\pas à chaque tour
    // Je ne peux pas déclarer une constante pour le prix unitaire et l'appeler à la place de totalAmount car "product.xx" n'est pas connu en dehors du return
    const totalAmount = items.reduce((acc, item)=> (acc+item.amount * item.quantity), 0);

    function handleDeliveryMethod() {
        navigate("/delivery_method")
    }

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token manquant, impossible de charger les produits.");
        return <div>Veuillez vous connecter pour accéder à votre panier.</div>;
    }

    return (
        <div>
            <h2>Votre Panier</h2>
            {items.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <ul>
                    {items.map((product) => (
                        <li key={product.id}>
                            <div>
                                <p>{product.name}</p>
                                <p>Prix unitaire: <CalculateTtc produit={{ Prix_HT: product.amount, Tva_categorie: product.Tva_categorie }} /></p>
                            </div>
                            <div>
                                <button onClick={() => updateItemQuantity(product.id, -1)}>-</button>
                                <span>{product.quantity}</span>
                                <button onClick={() => updateItemQuantity(product.id, 1)}>+</button>
                            </div>
                            <div><button onClick={() => removeItemFromCart(product.id)}>Supprimer</button></div>
                        </li>
                    ))}
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