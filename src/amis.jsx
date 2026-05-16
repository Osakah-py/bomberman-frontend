import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Signup({ setPage }) {
  const [amis, setAmis] = useState([]);
  const [amiPseudo, setAmiPseudo] = useState("");
  const userPseudo = localStorage.getItem("user");

  useEffect(() => { consulterAmis();}, []);

  // consulte la liste dami
  const consulterAmis = () => { 
    const params = new URLSearchParams();
    params.append('pseudo', userPseudo);
    axios.get('http://localhost:8080/api/consulterAmis', { params })
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
      axios.post('http://localhost:8080/api/ajouterAmi', params)
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
      axios.post('http://localhost:8080/api/supprimerAmi', params)
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
      <input
        placeholder="Pseudo de votre ami"
        value={amiPseudo}
        onChange={(event) => setAmiPseudo(event.target.value)}
      />
      <button type="submit"> Ajouter cet ami </button>
      </form>

      <div> {/*voir liste d'amis + on supprime*/}
        <h2> Votre liste d'amis !</h2>
      <ul> 
        {amis.map((relation, index) => {
        let ami1;
        if (relation.pseudo1 === userPseudo) { ami1 = relation.pseudo2;} else { ami1 = relation.pseudo1;}
        return (
          <li  key={index}> {ami1} <button onClick={() => handleSup(ami1)}> Supprimer </button> </li>
        );
        })}
      </ul>
      </div>

    </div>
  );
}