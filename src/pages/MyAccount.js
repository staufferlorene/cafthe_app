import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

function MyAccount(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = useParams();
    const [client, setClient] = useState([null]);
    const [adresse, setAdresse] = useState(false)
    const [mail, setMail] = useState(false);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/client/${id}`);
                setClient(response.data);
            } catch (error){
                console.error("Erreur de chargement", error);
            }
        };

        void fetchProduits()
    }, [user.id]);






    function ModifMail() {
        setMail(!mail)
    }

    function ModifAdresse() {
        setAdresse(!adresse)
    }




    const HandleModifMail = async (e) => {
        e.preventDefault();

        const newMail = e.target.email.value;  // Récupère la valeur du champ email
        console.log("New mail saisi :", newMail)

        try {
            console.log("Envoi de la requête PUT");
            const response = await axios.put(`http://localhost:3000/api/client/update/${id}`, {
                Mail_client: newMail,
                Telephone_client: undefined,
                Adresse_client: undefined
            });

            if (response.status === 200) {
                console.log("Réponse du serveur : ", response);
                alert("Votre adresse e-mail a été mise à jour avec succès.");
                setMail(false);  // Ferme le formulaire de modification
            }
        } catch (error) {
            console.error("Erreur de mise à jour de l'email", error);
        }
    };










    return (
        <div>
            <h2>Vos informations</h2>
            <p>Nom : {user.nom}</p>
            <p>Prénom : {user.prenom}</p>

            <p>Adresse : {user.adresse} <button onClick={ModifAdresse}>Modifier</button></p>
            {adresse ? <form><label><input type="text" placeholder="Votre nouvelle adresse"/></label> <button>Valider</button></form> : "" }

            <p>Mail : {user.email} <button onClick={ModifMail}>Modifier</button></p>
            {mail ? (
                <form onSubmit={HandleModifMail}>
                    <label>
                        Nouveau mail:
                        <input
                            type="email"
                            name="email"  // Ajoutez un attribut name pour pouvoir récupérer la valeur
                            placeholder="Votre nouveau mail"
                            required  // Optionnel : pour rendre le champ obligatoire
                        />
                    </label>
                    <button type="submit">Valider</button>
                </form>
            ) : ""}



            {/*{mail ? (<form><label><input type="email" placeholder="Votre nouveau mail"/></label> <button onSubmit={HandleModifMail}>Valider</button></form>) : "" }*/}

            <p>Mdp ?</p>
        </div>
    );
}

export default MyAccount;