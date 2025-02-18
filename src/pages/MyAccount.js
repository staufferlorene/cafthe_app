import React, {useEffect, useState} from 'react';
import axios from "axios";

function MyAccount(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [infos, setInfos] = useState({});
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [adresse, setAdresse] = useState("");
    const [actifTel, setActifTel] = useState(false);
    const [actifMail, setActifMail] = useState(false);
    const [actifAdresse, setActifAdresse] = useState(false);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/client/${user.id}`);
                setInfos(response.data);
            } catch (error){
                console.error("Erreur de chargement", error);
            }
        };

        if (user) {
            void fetchProduits();
        }
    }, [user.id]);

    function handleClick(modif) {
        if (modif === "tel") {
            setActifTel(!actifTel)
            setActifMail(false)
            setActifAdresse(false)
        } else if (modif === "mail") {
            setActifTel(false)
            setActifMail(!actifMail)
            setActifAdresse(false)
        } else if (modif === "adresse") {
            setActifTel(false)
            setActifMail(false)
            setActifAdresse(!actifAdresse)
        }


    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const new_tel = tel || infos.Telephone_client;
        const new_email = mail || infos.Mail_client;
        const new_adresse = adresse || infos.Adresse_client;

        try {
            const response = await axios.put(`http://localhost:3000/api/client/update/${user.id}`, {
                Telephone_client: new_tel,
                Mail_client: new_email,
                Adresse_client: new_adresse
            });

            if (response.status === 200) {
                setInfos({
                    ...infos,
                    Telephone_client: new_tel,
                    Mail_client: new_email,
                    Adresse_client: new_adresse
                });

                // Réinitialiser les champs de saisie après validation
                setTel("");
                setMail("");
                setAdresse("");

                // Fermer les formulaires de modification
                setActifTel(false);
                setActifMail(false);
                setActifAdresse(false);
            }

        } catch (error) {
            console.error("Erreur de mise à jour", error);
        }
    };

    return (
        <div>
            <h2>Vos informations</h2>
            <p>Nom : {infos.Nom_client}</p>
            <p>Prénom : {infos.Prenom_client}</p>

            <p>Téléphone : {infos.Telephone_client} <button onClick={() => handleClick ("tel")}>Modifier</button></p>
            {actifTel ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouveau numéro de téléphone : </label>
                    <input
                        type="test"
                        name="tel"
                        placeholder={infos.Telephone_client}
                        onChange=
                            {(e) => {setTel(e.target.value)}}
                        required
                    />

                    <button type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Adresse : {infos.Adresse_client} <button onClick={() => handleClick ("adresse")}>Modifier</button></p>
            {actifAdresse ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouvelle adresse : </label>
                    <input
                        type="text"
                        name="adresse"
                        placeholder={infos.Adresse_client}
                        onChange=
                            {(e) => {setAdresse(e.target.value)}}
                        required
                    />

                    <button type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Mail : {infos.Mail_client} <button onClick={() => handleClick ("mail")}>Modifier</button></p>
            {actifMail ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouveau mail : </label>
                        <input
                            type="email"
                            name="email"
                            placeholder={infos.Mail_client}
                            onChange=
                                {(e) => {setMail(e.target.value)}}
                            required
                        />

                    <button type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Mdp ?</p>
        </div>
    );
}

export default MyAccount;