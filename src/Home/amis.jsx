import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL } from '../constants'
import axios from "axios";
import "./amis.css";

export default function Ami({ setPage }) {
  const [amis, setAmis] = useState([]);
  const [amiPseudo, setAmiPseudo] = useState("");
  const userPseudo = localStorage.getItem("user");

  useEffect(() => { consulterAmis();}, []);

  // consulte la liste dami
  const consulterAmis = () => { 
    const params = new URLSearchParams();
    params.append('pseudo', userPseudo);
    axios.get(BACKEND_URL + '/api/consulterAmis', { params })
      .then(response => {
        setAmis(response.data);
      })
      .catch(error => {
        console.error(error);
        alert("Erreur lors de la consulatation d'amis.");
      });
  };

  // ajout dun ami
  const handleAjouter = (event) => { 
    event.preventDefault(); 
      const params = new URLSearchParams();
      params.append('pseudo', userPseudo); 
      params.append('amiPseudo', amiPseudo);
      axios.post(BACKEND_URL + '/api/ajouterAmi', params)
      .then(response => {
        setAmiPseudo(""); 
        consulterAmis();
      })
      .catch(error => {
        alert("Erreur lors de l'ajout de cet ami, verifier son pseudo.");
      });
  };

  // Supprimer un ami
  const handleSup = (amisup) => { 
      const params = new URLSearchParams();
      params.append('pseudo', userPseudo); 
      params.append('amiPseudo', amisup); // lami quon va éliminer
      axios.post(BACKEND_URL + '/api/supprimerAmi', params)
      .then(response => {
        consulterAmis();
        alert("Cet ami a été supprimé.");
      })
      .catch(error => {
        alert("Erreur lors de la suppression de cet ami, verifier son pseudo.");
      });
  };


  return (
    <div className="amis-container">
      <h1>Vos Amis</h1>

      <form onSubmit={handleAjouter} > {/*ajout*/}
        <h2> Ajouter un ami !</h2>
      <div className="Tout_boutton2">
      <input
      className="boutton2"
        placeholder="Pseudo de votre ami"
        value={amiPseudo}
        onChange={(event) => setAmiPseudo(event.target.value)}
      />
      </div>
      <div className="Tout_boutton2">
          <button type="submit" className="boutton"> Ajouter cet ami </button>
      </div>
      <div className="Tout_boutton2">
        <button onClick={() => setPage("menu")} className="boutton"> Retour au menu ! </button>
      </div>
      </form>

      <div className="liste-amis"> {/*voir liste d'amis + on supprime*/}
        <h2> Votre liste d'amis !</h2>
        {amis.length === 0 ? (
          <p className="message-vide">Vous n'avez pas encore d'amis....</p>
        ) : (
        <ul> 
          {amis.map((relation, index) => {
          let ami1;
          if (relation.pseudo1 === userPseudo) { ami1 = relation.pseudo2;} else { ami1 = relation.pseudo1;}
          return (
           <li  key={index}> {ami1} <button onClick={() => handleSup(ami1)}> Supprimer </button> </li>
           );
           })}
        </ul>
        )}
      </div>

    </div>
  );
}