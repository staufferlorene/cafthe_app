import React from 'react';
import {useLocation} from "react-router-dom";
import "../styles/Global.css";
import "../styles/Confirm.css";

function Confirm(props) {

    // Accès aux données stockées dans location (méthode de livraison ET de paiement choisi)
    const location = useLocation();
    // Récupération de la valeur de delivery passé via useState
    const delivery = location.state?.delivery;
    // Récupération de la valeur de methodPayment passé via useState
    const methodPayment = location.state?.methodPayment;

    // Affichage conditionnel des messages
    function msgUn () {
        if ((delivery === "store" || delivery === "home") && methodPayment === "online") {
            return "Votre paiement a bien été pris en compte et votre commande est maintenant en cours de traitement."
        } else if (delivery === "store" && methodPayment === "inStore") {
            return "Votre paiement sera à réaliser au magasin lors du retrait de votre commande."
        }
    }

    function msgDeux () {
        if (delivery === "store" && (methodPayment === "online" || methodPayment === "inStore")) {
            return "contenant les détails de votre commande lorsque celle-ci sera disponible au retrait en magasin."
        } else if (delivery === "home" && methodPayment === "online") {
            return "contenant les détails de votre commande ainsi que les informations de suivi lorsque celle-ci sera expédiée."
        }
    }

    return (
        <div className="confirm-container">
            <h1>Confirmation</h1>

            <p>Nous vous remercions pour votre achat sur CafThé.</p>

            <p>{msgUn()}</p>

            <p> Vous recevrez un e-mail de confirmation {msgDeux()}</p>

            <p> Encore merci pour votre confiance et à très bientôt sur CafThé !</p>
        </div>
    );
}

export default Confirm;