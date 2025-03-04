import React from 'react';
import '../styles/DeliveryMethod.css'

function DeliveryMethod(props) {
    return (
        <div>
            <h2>Choix du mode de livraison</h2>
            <form>
                <p>Veuillez choisir votre livraison :</p>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice1" name="delivery" value="home" />
                    <label htmlFor="choiceHome">A mon domicile</label>
                </div>
                <div className="radio-container">
                    <input type="radio" id="deliveryChoice2" name="delivery" value="store"/>
                    <label htmlFor="choiceStore">Au magasin</label>
                </div>
                <div>
                    <button type="submit">Confirmer</button>
                </div>
            </form>
        </div>
    );
}

export default DeliveryMethod;

