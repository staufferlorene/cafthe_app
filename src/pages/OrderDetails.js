import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function OrderDetails(props) {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/commande/detail/${id}`);
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
        <div>
            <h3>Détail de la commande numéro {id}</h3>
            <div className={"command-list"}>
                {orders.map((order) => (
                    <div className={"command"}>
                        <p>Designation : {order.Nom_produit}</p>
                        <p>Quantité : {order.Quantite_produit_ligne_commande}</p>
                        <p>Conditionnement : {order.Type_conditionnement}</p>
                        <p>Prix unitaire TTC : {order.Prix_unitaire_ligne_commande} €</p>
                        <p>Prix total TTC : {order.Prix_unitaire_ligne_commande * order.Quantite_produit_ligne_commande} €</p>
                    </div>)
                )}
                <div className={"command"}>
                    <p>Date commande : {orders[0].Date_commande}</p>
                    {/*on utilise premier objet présent dans orders[] car la date et le total sont les mêmes partout*/}
                    <p>Montant total commande TTC : {orders[0].Montant_commande_TTC} €</p>
                    <p>Statut de la commande : {orders[0].Statut_commande}</p>
                </div>

                <Link to={`/commande/client/${user.id}`} className={"details-btn"}>
                    Retour aux commandes
                </Link>
            </div>
        </div>
    );
}

export default OrderDetails;