import React, {useContext, useState} from 'react';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Global.css";
import Inscription from "../components/Inscription";

function Login(props) {
    const { login } = useContext(AuthContext); // accès à la fonction login venant du contexte
    const navigate = useNavigate(); // la navigation

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

            //On met à jour le contexte d'authentification
            login(token, client);

            //Redirection du client vers une page
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
        <>
        <div>
            <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label>Saisir votre mail :</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Saisir votre mot de passe :</label>
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
                <button type="submit">Se connecter</button>
            </form>
        </div>

        <div>
            <Inscription />
        </div>
        </>
    );
}

export default Login;