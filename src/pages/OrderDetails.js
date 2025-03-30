import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import "../styles/Global.css";
import "../styles/OrderDetails.css";

function OrderDetails(props) {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                // Récupération du token
                const token = localStorage.getItem("token");

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commande/detail/${id}`,
                // Envoi du token au serveur pour autoriser l'accès
                { headers: {Authorization: `Bearer ${token}`} });
                setOrders(response.data);
            } catch (error){
                console.error("Erreur de chargement du détail de la commande", error);
            }
        };

        void fetchProduits()
    }, [id]);

    if (!orders || orders.length === 0) {
        return (
            <div>
                <p>La commande est vide ou inexistante</p>

                <Link to={`/`} className={"details-btn"}>
                    Retour
                </Link>
            </div>
        )
    }

    return (
        <div className="order-details-container">
            <h1>Détail commande</h1>
            <h2>Commande numéro {id}</h2>
            <div className={"command-list"}>
                {orders.map((order) => (
                    <div className={"command"}>
                        <p>Produit : {order.Nom_produit}</p>
                        <p>Quantité : {order.Quantite_produit_ligne_commande}</p>
                        <p>Conditionnement : {order.Type_conditionnement}</p>
                        <p>Prix unitaire TTC : {order.Prix_unitaire_ligne_commande} €</p>
                        <p>Prix total TTC : {order.Prix_unitaire_ligne_commande * order.Quantite_produit_ligne_commande} €</p>
                    </div>)
                )}
                <div className={"command"}>
                    {/*Afficher la date au format français*/}
                    <p>Date commande : {new Date(orders[0].Date_commande).toLocaleDateString('fr-FR')}</p>
                    {/*Utilisation du premier objet présent dans orders[] car la date et le total sont les mêmes partout*/}
                    <p>Montant total commande TTC : {orders[0].Montant_commande_TTC} €</p>
                    <p>Statut de la commande : {orders[0].Statut_commande}</p>
                </div>

                <button className="details-btn" onClick={() => navigate (`/commande/client/${user.id}`)}> Retour aux commandes</button>
            </div>
        </div>
    );
}

export default OrderDetails;