import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


export default function Attente({ setPage }) {
  const userPseudo = localStorage.getItem("user");
  const partieId = localStorage.getItem("partieId");
  const [Joueurs, setJoueurs] = useState([]);

useEffect(() => {
    if (!partieId) {
      setPage("partie");
      return;
    }



const verifierEtat = () => {
      const params = new URLSearchParams();
      params.append("partieId", partieId);
      axios.get("http://localhost:8080/api/partieEtat", { params: params })
      .then(response => {
        const partie = response.data;
        if (partie.joueurs) {setJoueurs(partie.joueurs);}
        //la partie a commencé : 
        if (partie.started === true || partie.etat === "EN_COURS") { setPage("game"); }
      })
      .catch(error => {
        console.error("Erreur:", error);
      });
    };
    verifierEtat();
    const intervalle = setInterval(verifierEtat, 1000); //on fais verifierEtat toutes les 1000 millisecondes
    return () => clearInterval(intervalle);
  }, [partieId, setPage]);

  // quitter la salle d'attente : 
  const handleQuitter = () => {
    const params = new URLSearchParams();
    params.append("partieId", partieId);
    params.append("pseudo", userPseudo);
    axios.post("http://localhost:8080/api/quitterPartie", params)
      .then(() => {
        localStorage.removeItem("partieId");
        setPage("partie");
      })
      .catch(() => {
        setPage("partie");
      });
  };



return (
    <div>
      <h1>Attente</h1>
      <p> Identifiant de la partie : {partieId}</p>
      <h3> Les joueurs dans le salon :</h3>
      <ul> {Joueurs.map((joueur, index) => (<li key={index}>{joueur.pseudo}</li>))} </ul>
      <p>Attente des autres joueurs... Le jeu se lance dès qu'il y a tout le monde.</p>
      <button onClick={handleQuitter}>Quitter</button>
    </div>
  );
}