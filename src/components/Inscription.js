import React, {useState} from 'react';
import axios from "axios";
import "../styles/Global.css";
import "../styles/Login-inscription.css"
import {Link} from "react-router-dom";


function Inscription(props) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [mdp_one, setMdp_one] = useState("");
    const [mdp_two, setMdp_two] = useState("");
    // Date = date du jour
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [adresse, setAdresse] = useState("");

    // Pour la gestion des messages
    const [succesMsg, setSuccesMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


        const handleSubmit = async (e) => {
            e.preventDefault();

            // Vérifier si nouveau mdp + confirmation sont identiques
            if (mdp_one !== mdp_two) {
                setErrorMsg("Les mots de passes sont différents");
                // Vider les champs des mots de passes
                setMdp_one("");
                setMdp_two("");
                return;
            }

            try {
                // Envoi informations saisies à l'API
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/client/register`,
                {
                        Nom_client: nom,
                        Prenom_client: prenom,
                        Telephone_client: tel,
                        Mail_client: mail,
                        Mdp_client: mdp_one,
                        Date_inscription: date,
                        Adresse_client: adresse,
                    });

                        setSuccesMsg("Inscription effectuée avec succès");
                        // Réinitialiser les champs après validation
                        setNom("");
                        setPrenom("");
                        setTel("");
                        setMail("");
                        setMdp_one("");
                        setMdp_two("");
                        setAdresse("");

        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
                setErrorMsg("Erreur lors de l'inscription")
        }
    };

    return (
        <div className="login-container">
            <h1>Bienvenue chez CafThé</h1>
            <h2>Inscription</h2>
            <div className="login-inscription">
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label>Nom : </label>
                            <input
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Prénom : </label>
                            <input
                                type="text"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Téléphone : </label>
                            <input
                                type="tel"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                            />
                        </li>
                        <li>
                            <label>Adresse postale : </label>
                            <input
                                type="text"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>E-mail : </label>
                            <input
                                type="email"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Mot de passe : </label>
                            <input
                                type="password"
                                value={mdp_one}
                                onChange={(e) => setMdp_one(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Confirmation mot de passe : </label>
                            <input
                                type="password"
                                value={mdp_two}
                                onChange={(e) => setMdp_two(e.target.value)}
                                required
                            />
                        </li>
                    </ul>

                    {succesMsg && (
                        <div className="msgSucces">{succesMsg}</div>
                    )}

                    {errorMsg && (
                        <div className="msgError">{errorMsg}</div>
                    )}

                    <button className="details-btn" type="submit">S'inscrire</button>
                    <p className="inscriprion">Déjà inscrit ? <Link className="inscriprion" to={`/login`}>Se connecter</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Inscription;