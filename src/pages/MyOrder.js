import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../styles/Global.css";

function MyOrder(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/commande/client/${user.id}`);
                setOrders(response.data);
            } catch (error){
                console.error("Erreur de chargement des commandes", error);
            }
        };

        void fetchOrders()
    }, []);

    if (!orders || orders.length === 0) {
        return (
            <div>
                <p>Vous n'avez pas passée de commande</p>
                <Link to={`/`} className={"details-btn"}>
                    Retour
                </Link>
            </div>
        )
    }

    return (
        <div>
            {orders.map((order) => (
                <div>
                {/*Afficher la date au format français*/}
                <p>Date commande : {new Date(order.Date_commande).toLocaleDateString('fr-FR')}</p>
                <p>Statut commande : {order.Statut_commande}</p>
                <p>Montant commande : {order.Montant_commande_TTC} €</p>
                <Link to={`/commande/detail/${order.Id_commande}`} className="details-btn">
                    Voir détail
                </Link>
</div>
            ))}
</div>
    );
}

export default MyOrder;