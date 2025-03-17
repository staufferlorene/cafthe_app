import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Global.css";
import "../styles/MyOrder.css";

function MyOrder(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


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
            <div className="order-container">
                <p>Vous n'avez pas passée de commande</p>
                <button className={"details-btn"} onClick={() => navigate(`/`)}>Retour</button>
                {/*<Link to={`/`} className={"details-btn"}>*/}
                {/*    Retour*/}
                {/*</Link>*/}
            </div>
        )
    }

    return (
        <div className="order-container">
            <h2>Vos commandes</h2>
            {orders.map((order) => (
                <div>
                {/*Afficher la date au format français*/}
                <p>Date commande : {new Date(order.Date_commande).toLocaleDateString('fr-FR')}</p>
                <p>Statut commande : {order.Statut_commande}</p>
                <p>Montant commande : {order.Montant_commande_TTC} €</p>
                <button className="details-btn" onClick={() => navigate(`/commande/detail/${order.Id_commande}`)}>Voir détail</button>
                {/*<Link to={`/commande/detail/${order.Id_commande}`} className="details-btn">*/}
                {/*    Voir détail*/}
                {/*</Link>*/}
                </div>
            ))}
        </div>

//         <div>
//     {users.map((user) => (
//         <MyAccount key={user.Id_client} user={user} />
//              ))}
//         </div>
 )}

export default MyOrder;