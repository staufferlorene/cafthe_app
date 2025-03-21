import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import '../styles/DeliveryMethod.css';
import "../styles/Global.css";

function DeliveryMethod(props) {

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [errorMsg , setErrorMsg] = useState()

    // pour stocker le choix du mode de livraison
    const [delivery , setDelivery] = useState()

    // fonction englobant tout le formulaire
    function handleSummary(e) {
        e.preventDefault();
        if (delivery === "home" || delivery === "store") {
            // utiliser useState pour faire passer le choix sur la page summary grâce à navigate
            navigate("/summary", {state: {delivery}})
        } else {
            setErrorMsg("Veuillez faire un choix");
        }
    }

    // fonction ciblant le bouton radio
    function handleDeliveryChange(e) {
        setDelivery(e.target.value);
    }

    return (
        <div className="deliveryMethod-container">
            <h1>Choix du mode de livraison</h1>
            <form onSubmit={handleSummary}>
                <p className="deliveryMethod-mb">Veuillez choisir votre livraison :</p>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice1" name="delivery" value="store" onChange={handleDeliveryChange} />
                    <label className="deliveryMethod-label" htmlFor="deliveryChoice1">Au magasin</label>
                    <p>1 Rue Cafthe, 41000 Blois</p>
                </div>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice2" name="delivery" value="home" onChange={handleDeliveryChange} />
                    <label className="deliveryMethod-label" htmlFor="deliveryChoice2">A mon domicile</label>
                    <p>{user.adresse}</p>
                </div>
                <div>
                    <button className="details-btn gap" onClick={() => navigate("/cart")}>
                        Retour
                    </button>

                    <button className="details-btn" type="submit">Confirmer</button>
                </div>
                {errorMsg && (
                    <div className="msgError">{errorMsg}</div>
                )}
            </form>
        </div>
    );
}

export default DeliveryMethod;