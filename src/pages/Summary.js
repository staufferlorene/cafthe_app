import {Link, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";

function Summary(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const navigate = useNavigate();

    // Calcul montant total TTC
    const totalAmount = cart.reduce((acc, cart)=> (acc+cart.amount_TTC * cart.quantity), 0);

    // Pour accéder à la donnée stockée dans location (la méthode de livraison choisie)
    const location = useLocation();
    // On récupère la valeur de delivery passé via useState
    const delivery = location.state?.delivery;
    // pour stocker le choix du mode de paiement
    const [methodPayment, setMethodPayment] = useState(null);

    function handlePayment(method) {
        setMethodPayment(method)
        // utiliser useState pour faire passer les choix livraison + paiement sur la page confirm grâce à navigate
        navigate("/confirm", {state: {delivery, methodPayment: method}})
    }

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

            <h3>Votre mode de livraison</h3>

            <p>{delivery ? (delivery === "home" ? `À votre domicile situé ${user.adresse}` : "Au magasin situé 1 Rue Cafthe, 41000 Blois") : null}</p>


            <Link to={`/delivery_method`} className={"details-btn"}>
                Retour
            </Link>

            <button onClick={() => handlePayment("online")}>Payer en ligne</button>

            {/*Afficher le bouton uniquement si la livraison est en magasin*/}
            {delivery === "store" && (
                <button onClick={() => handlePayment("inStore")}>Payer en magasin</button>
            )}

        </div>
    )
};

export default Summary;