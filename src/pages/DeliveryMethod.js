import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../styles/DeliveryMethod.css'

function DeliveryMethod(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [delivery , setDelivery] = useState()
    const [errorMsg , setErrorMsg] = useState()

    function handleSummary(e) {
        e.preventDefault();
        if (delivery === "home" || delivery === "store") {
            navigate("/summary", { state: {delivery}}) // utiliser l'état pour le faire passer sur la page summary grâce à navigate
        } else {
            setErrorMsg("Veuillez faire un choix");
        }
    }

    function handleDeliveryChange(e) {
        setDelivery(e.target.value);
    }

    return (
        <div>
            <h2>Choix du mode de livraison</h2>
            <form onSubmit={handleSummary}>
                <p>Veuillez choisir votre livraison :</p>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice1" name="delivery" value="store" onChange={handleDeliveryChange} />
                    <label htmlFor="deliveryChoice1">Au magasin</label>
                    <p>1 Rue Cafthe, 41000 Blois</p>
                </div>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice2" name="delivery" value="home" onChange={handleDeliveryChange} />
                    <label htmlFor="deliveryChoice2">A mon domicile</label>
                    <p>{user.adresse}</p>
                </div>
                <div>
                    <Link to={`/cart`} className={"details-btn"}>
                        Retour
                    </Link>
                    <button type="submit">Confirmer</button>
                </div>
                {errorMsg && (
                    <div className="msgError">{errorMsg}</div>
                )}
            </form>
        </div>
    );
}

export default DeliveryMethod;

