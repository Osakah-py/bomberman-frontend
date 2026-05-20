import { useState } from "react";
import "./menu.css";
import { BACKEND_URL } from '../constants'
import axios from "axios";



export default function Menu({ setPage }) {
    const utilisateur = localStorage.getItem("user");
    const [confirmation, setConfirmation] = useState(false);
    const [mdp, setMdp] = useState("");

    const executerSuppression = () => {
        const params = new URLSearchParams();
        params.append("pseudo", utilisateur);
        params.append("password", mdp); 
        axios.post(BACKEND_URL + '/api/supprimerCompte', params)
        .then((res) => {
            alert("Compte supprimé.");
            localStorage.clear();
            setPage("login");
        })
        .catch((err) => {
            alert("Erreur avec.");
        });
    };

     return (
    <div className="menu-container">
      <h1>BOMBERMAN</h1>
      <h2>Menu</h2>
      {!confirmation ? ( //la on a lu truc normal
                <div>
                    <button onClick={() => setPage("partie")}> Rejoindre/Créer une partie ! </button>
                    <button onClick={() => setPage("amis")}> Mes Amis </button>
                    <button onClick={() => {
                        const params = new URLSearchParams();
                        params.append("pseudo", utilisateur);
                        axios.post(BACKEND_URL + '/api/seDeconnecter', params)
                            .then(() => {
                                localStorage.removeItem("user");
                                setPage("login");
                            })
                            .catch((err) => {
                                console.error(err);
                                alert("Erreur lors de la déconnexion.");
                            });
                    }}> Déconnexion </button>
                    <button onClick={() => setConfirmation(true)} style={{ backgroundColor: "#d9534f", color: "white", marginTop: "20px" }}> 
                        Supprimer le compte 
                    </button>
                </div>
            ) : ( // so on a appuyé sur supperession de compte
                <div style={{ backgroundColor: "#f8d7da", padding: "15px", borderRadius: "8px", marginTop: "10px" }}>
                    <p>Entrez votre mot de passer :</p>
                    <input 
                        type="password" 
                        value={mdp} 
                        onChange={(e) => setMdp(e.target.value)}
                        placeholder="Mot de passe"
                    />
                    <br />
                    <button onClick={executerSuppression}>
                        Confirmer la suppression
                    </button>
                    <button onClick={() => setConfirmation(false)}>
                        Annuler
                    </button>
                </div>
            )}
        </div>
    );
} 