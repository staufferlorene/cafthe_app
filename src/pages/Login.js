import React, {useState} from 'react';
import axios from "axios";

function Login(props) {
   const [email, setEmail] = useState("");
   const [mdp, setMdp] = useState("");
   const [errorMsg, setErrorMsg] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/login",
                {
                    email,
                    mdp,
                },
            );

            const { token, client } = response.data;
        } catch (error) {}
    };

    return (
        <div>
            <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            <label>Saisir votre mail :</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </li>
                        <li>
                            <label>Saisir votre mdp :</label>
                            <input
                                type="password"
                                value={mdp}
                                onChange={(e) => setMdp(e.target.value)}
                                required
                            />
                        </li>
                    </ul>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;