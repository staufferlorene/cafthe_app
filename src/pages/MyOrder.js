import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../styles/Global.css";
import "../styles/MyOrder.css";

function MyOrder(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {

        // Blocage accès panier si pas connecté
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token manquant, impossible de charger le panier.");
            navigate("/")
        } else {


        const fetchOrders = async () => {
            try {
                // Récupération du token
                const token = localStorage.getItem("token");

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commande/client/${user.id}`,

                // Envoi du token au serveur pour autoriser l'accès
                { headers: {Authorization: `Bearer ${token}`} });
                setOrders(response.data);
            } catch (error){
                console.error("Erreur de chargement des commandes", error);
            }
        };

        void fetchOrders()}
    }, []);

    if (!orders || orders.length === 0) {
        return (
            <div className="order-container">
                <h1>Commandes</h1>
                <p>Vous n'avez pas passée de commande</p>
                <button className={"details-btn"} onClick={() => navigate(`/`)}>Retour</button>
            </div>
        )
    }

    return (
        <div className="order-container">
            <h1>Commandes</h1>
            {orders.map((order) => (
                <div>
                {/*Afficher la date au format français*/}
                <p>Date commande : {new Date(order.Date_commande).toLocaleDateString('fr-FR')}</p>
                <p>Statut commande : {order.Statut_commande}</p>
                <p>Montant commande : {order.Montant_commande_TTC} €</p>
                <button className="details-btn" onClick={() => navigate(`/commande/detail/${order.Id_commande}`)}>Voir détail</button>
                </div>
            ))}
        </div>
 )}

export default MyOrder;