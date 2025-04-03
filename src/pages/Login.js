import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";
import "../styles/Global.css";
import "../styles/Login.css";


function Login(props) {
    const {login} = useContext(AuthContext); // Accès à la fonction login venant du contexte d'authentification
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`,
                {
                    "Mail_client": email,
                    "Mdp_client": mdp,
                },
            );

            const { token, client } = response.data;

            // On met à jour le contexte d'authentification
            login(token, client);

            // Redirection du client vers une page
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la navigation : ", error);
            if (error.response) {
                console.error("Détails de la réponse: ", error.response.data);
                if (error.response.data.message) {
                    setErrorMsg(error.response.data.message);
                } else {
                    setErrorMsg("Erreur inconnue");
                }
            } else {
                setErrorMsg("Erreur de connexion");
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Bienvenue chez CafThé</h1>
            <div className="login">
                <div>
                    <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <ul>
                                <li>
                                    <label>Saisir votre mail : </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </li>
                                <li>
                                    <label>Saisir votre mot de passe : </label>
                                    <input
                                        type="password"
                                        value={mdp}
                                        onChange={(e) => setMdp(e.target.value)}
                                        required
                                    />
                                </li>
                            </ul>
                            {errorMsg && (
                                <div>{errorMsg}</div>
                            )}
                        <button className="details-btn" type="submit">Se connecter</button>
                        <p>Pas encore inscrit ? <Link to={`/inscription`}>S'inscrire</Link></p>
                        </form>
                </div>
            </div>
        </div>
    );
}

export default Login;