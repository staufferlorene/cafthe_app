import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

function OrderDetails(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/commande/detail/${id}`);
                setOrders(response.data);
            } catch (error){
                console.error("Erreur de chargement du détail du produit", error);
            }
        };
        console.log(id)
        void fetchProduits()
    }, []);
    console.log(orders)

    return (
        <div>
            <p>hello</p>
        </div>
    );
}

export default OrderDetails;