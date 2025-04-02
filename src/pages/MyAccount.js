import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../styles/Global.css";
import "../styles/MyAccount.css";
import {useNavigate} from "react-router-dom";

function MyAccount(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [infos, setInfos] = useState({});
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [adresse, setAdresse] = useState("");
    const [actifTel, setActifTel] = useState(false);
    const [actifMail, setActifMail] = useState(false);
    const [actifAdresse, setActifAdresse] = useState(false);
    const [actifPassword, setActifPassword] = useState(false);
    const navigate = useNavigate()

    // États pour le mot de passe
    const [ancienMdp, setAncienMdp] = useState("");
    const [nouveauMdp, setNouveauMdp] = useState("");
    const [confirmerMdp, setConfirmerMdp] = useState("");

    // Pour la gestion des messages
    const [succesMsg, setSuccesMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");



    useEffect(() => {

        // Blocage accès panier si pas connecté
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token manquant, impossible de charger le panier.");
            navigate("/")
        } else {

        const fetchProduits = async () => {
            try {
                // Récupération du token
                const token = localStorage.getItem("token");

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${user.id}`,
                // Envoi du token au serveur pour autoriser l'accès
                { headers: {Authorization: `Bearer ${token}`} });
                setInfos(response.data);
            } catch (error){
                console.error("Erreur de chargement", error);
            }
        };

        if (user) {
            void fetchProduits();
        }}
    }, []);

    // Màj la donnée modifiée
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
            // Récupération du token
            const token = localStorage.getItem("token");

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client/update/${user.id}`,
            {
                Telephone_client: new_tel,
                Mail_client: new_email,
                Adresse_client: new_adresse
            },

            // Envoi du token au serveur pour autoriser l'accès
            { headers: {Authorization: `Bearer ${token}`} }
            );

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

    // Modification du mot de passe
    const handlePassword = async (e) => {
        e.preventDefault();

        if (nouveauMdp !== confirmerMdp) {
            setErrorMsg("Les mots de passe sont différents !");
            return;
        }

        try {
            // Récupération du token
            const token = localStorage.getItem("token");

            const response = await axios.put
            (`${process.env.REACT_APP_API_URL}/api/client/update/mdp/${user.id}`,
            {
                last_mdp: ancienMdp,
                new_mdp: nouveauMdp
            },

            // Envoi du token au serveur pour autoriser l'accès
            { headers: {Authorization: `Bearer ${token}`} }
            );

            if (response.status === 200) {
                setSuccesMsg('Mot de passe mis à jour avec succès');
                // Réinitialiser les champs après validation
                setAncienMdp("");
                setNouveauMdp("");
                setConfirmerMdp("");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du mot de passe", error);
            setErrorMsg("Erreur lors de la mise à jour du mot de passe");
        }
    };

    return (
        <div className="account-container">
            <h1>Informations personnelles</h1>
            <p>Nom : {infos.Nom_client}</p>
            <p>Prénom : {infos.Prenom_client}</p>

            <p>Téléphone : {infos.Telephone_client}
                <button className="petit-btn" onClick={() => handleClick("tel")}>Modifier</button>
            </p>
            {actifTel ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouveau numéro de téléphone : </label>
                    <input
                        type="tel"
                        name="tel"
                        onChange=
                            {(e) => {
                                setTel(e.target.value)
                            }}
                        required
                    />

                    <button className="petit-btn" type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Adresse : {infos.Adresse_client}
                <button className="petit-btn" onClick={() => handleClick("adresse")}>Modifier</button>
            </p>
            {actifAdresse ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouvelle adresse : </label>
                    <input
                        type="text"
                        name="adresse"
                        onChange=
                            {(e) => {
                                setAdresse(e.target.value)
                            }}
                        required
                    />

                    <button className="petit-btn" type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Mail : {infos.Mail_client}
                <button className="petit-btn" onClick={() => handleClick("mail")}>Modifier</button>
            </p>
            {actifMail ? (
                <form onSubmit={handleSubmit}>
                    <label>Nouveau mail : </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="exemple@mail.com"
                        onChange=
                            {(e) => {
                                setMail(e.target.value)
                            }}
                        required
                    />

                    <button className="petit-btn" type="submit">Valider</button>
                </form>
            ) : ""}

            <p>Mot de passe : ****** <button className="petit-btn" onClick={() => setActifPassword(!actifPassword)}>Modifier</button></p>
            {actifPassword && (
                <form onSubmit={handlePassword}>
                    <label>Ancien mot de passe : </label>
                    <input
                        type="password"
                        name="ancienMdp"
                        value={ancienMdp}
                        onChange={(e) => setAncienMdp(e.target.value)}
                        required
                    />

                    <label>Nouveau mot de passe : </label>
                    <input
                        type="password"
                        name="nouveauMdp"
                        value={nouveauMdp}
                        onChange={(e) => setNouveauMdp(e.target.value)}
                        required
                    />

                    <label>Confirmer le nouveau mot de passe : </label>
                    <input
                        type="password"
                        name="confirmerMdp"
                        value={confirmerMdp}
                        onChange={(e) => setConfirmerMdp(e.target.value)}
                        required
                    />

                    {succesMsg && (
                        <div className="msgSucces">{succesMsg}</div>
                    )}

                    {errorMsg && (
                        <div className="msgError">{errorMsg}</div>
                    )}

                    <button className="petit-btn" type="submit">Valider</button>
                </form>
            )}
        </div>
    );
    }

    export default MyAccount;