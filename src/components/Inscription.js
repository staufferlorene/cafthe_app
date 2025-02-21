import React, {useEffect, useState} from 'react';
import axios from "axios";

function Inscription(props) {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [mdp_one, setMdp_one] = useState("");
    const [mdp_two, setMdp_two] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [adresse, setAdresse] = useState("");


        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await axios.post("http://localhost:3000/api/client/register",
                {
                        Nom_client: nom,
                        Prenom_client: prenom,
                        Telephone_client: tel,
                        Mail_client: mail,
                        Mdp_client: mdp_two,
                        Date_inscription: date,
                        Adresse_client: adresse,
                    });

                    if (mdp_one === mdp_two) {
                        alert("Inscription effectuée avec succès");
                        // Réinitialiser les champs après validation
                        setNom("");
                        setPrenom("");
                        setTel("");
                        setMail("");
                        setMdp_one("");
                        setMdp_two("");
                        setAdresse("");
                    }

                    console.log(response)

        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            alert("Erreur lors de l'inscription")
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label>Saisir votre nom :</label>
                        <input
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre prénom :</label>
                        <input
                            type="text"
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre n° téléphone :</label>
                        <input
                            type="tel"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </li>
                    <li>
                        <label>Saisir votre adresse postale :</label>
                        <input
                            type="text"
                            value={adresse}
                            onChange={(e) => setAdresse(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Saisir votre adresse mail :</label>
                        <input
                            type="email"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Définir votre mot de passe :</label>
                        <input
                            type="password"
                            value={mdp_one}
                            onChange={(e) => setMdp_one(e.target.value)}
                            required
                        />
                    </li>
                    <li>
                        <label>Confirmer votre mot de passe :</label>
                        <input
                            type="password"
                            value={mdp_two}
                            onChange={(e) => setMdp_two(e.target.value)}
                            required
                        />
                    </li>
                </ul>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default Inscription;