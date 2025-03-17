import React, {useState} from 'react';
import axios from "axios";
import "../styles/Global.css";


function Inscription(props) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [mdp_one, setMdp_one] = useState("");
    const [mdp_two, setMdp_two] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [adresse, setAdresse] = useState("");

    // Pour la gestion des messages
    const [succesMsg, setSuccesMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


        const handleSubmit = async (e) => {
            e.preventDefault();

            if (mdp_one !== mdp_two) {
                setErrorMsg("Les mots de passes sont différents");
                // vider les champs des mots de passes
                setMdp_one("");
                setMdp_two("");
                return;
            }

            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/client/register`,
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
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>Saisir votre nom : </label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre prénom : </label>
                        <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre n° téléphone : </label>
                        <input
                            type="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Saisir votre adresse postale : </label>
                        <input
                            type="text"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre adresse mail : </label>
                        <input
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Définir votre mot de passe : </label>
                        <input
                            type="password"
                            value={mdp_one}
                            onChange={(e) => setMdp_one(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Confirmer votre mot de passe : </label>
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
            </form>
        </div>
    );
}

export default Inscription;