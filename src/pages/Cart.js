import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
    const { items, removeItemFromCart, clearCart } = useContext(CartContext);

    return (
        <div>
            <h2>Mon Panier</h2>
            {items.length === 0 ? (
                <p>Votre panier est vide.</p>
            ) : (
                <ul>
                    {items.map((cart) => (
                        <li key={cart.id}>
                            {cart.name} - Quantité : {cart.quantity}
                            <button onClick={() => removeItemFromCart(cart.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            )}
            {items.length > 0 && (
                <>
                    <button onClick={clearCart}>Vider le panier</button>
                </>
            )}
        </div>
    );
}

export default Cart;