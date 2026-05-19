import { useState } from "react";
import { BACKEND_URL } from './constants'
import "./login.css";
import axios from "axios"


export default function Partie({ setPage }) {
  const userPseudo = localStorage.getItem("user");
  const [idPartie, setidPartie] = useState(""); 
  

// creer 
const handleCreer = (event) => { 
  event.preventDefault(); 
  if (!idPartie || idPartie === "") { alert("il faut écrire un identifiant de partie"); 
    return;
  } 

  const params = new URLSearchParams();
  params.append('id', idPartie);
  params.append('pseudo', userPseudo);
  axios.post(BACKEND_URL + '/api/creerPartie', params)
    .then(response => {
      console.log("Partie créée et rejointe :", response.data);
      alert("tu as rejoint la partie cree !");
      localStorage.setItem("partieId", idPartie); 
      setPage("attente"); 
    })
    .catch(error => {
      console.error(error);
      if (error.response && error.response.status === 409) {
        alert("Cet identifiant de partie existe déjà !");
      } else {
        alert("Erreur lors de la création de la partie.");
      }
    });
};


    // Rejoindre une partie
  const handleRejoindre = (event) => { 
    event.preventDefault(); 
      if (!idPartie || idPartie === "") { alert("il faut écrire un identifiant de partie"); return;}
      const params = new URLSearchParams();
      params.append('partieId', idPartie);
      params.append("pseudo", userPseudo);
      axios.post(BACKEND_URL + '/api/rejoindrePartie', params)
      .then(response => {
        console.log("Tu rejoins la partie", response.data); 
        alert("Tu as rejoint la partie ! ")
        localStorage.setItem("partieId", idPartie); 
        //setPage("game"); // rediriger vers le jeu
        setPage("attente");
      })
      .catch(error => {
        console.error(error);
        alert("Erreur pour rejoindre cette partie.");
      });
    
  };





  return (

    <div className="login-container">
    <form className="login-form">
      <h1>BONBERMAN</h1>
      <p>Joueur connecté : {userPseudo}</p>
      <br />
      <div className="Tout_boutton2">
        <input
        name="idPartie"
        placeholder="identifiant de la partie..."
        value={idPartie}
        onChange={(e) => setidPartie(e.target.value)}
        className="boutton2" 
        />
      </div>
      <button onClick={handleCreer} className="boutton"> Créer une partie </button>
      <button onClick={handleRejoindre} className="boutton"> Rejoindre une partie </button>
      <button onClick={() => setPage("menu")}> Retourner au menu </button>
      </form>

    </div>
    
  );
}