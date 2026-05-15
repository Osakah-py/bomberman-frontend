import { useState } from "react";
import axios from "axios";

export default function Signup({ setPage }) {
  const [formData, setFormData] = useState({
    pseudo: "",
    code: "",
  });


  const handleChange = (e) => { // pour que ca s'aaffiche
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = (event) => { 
    event.preventDefault(); //pas de rechargement de page
    if (formData.pseudo && formData.code) {
      //localStorage.setItem("user", formData.pseudo);
      //setPage("login"); // vers login
      const params = new URLSearchParams();
      params.append('pseudo', formData.pseudo);
      params.append('password', formData.code);
      axios.post('http://localhost:8080/api/creerCompte', params)
      .then(response => {
        localStorage.setItem("user", response.data.pseudo);
        setPage("login");
      })
      .catch(error => {
        console.error(error);
        alert("le mdp ou le pseudo est de la mauvaise forme.");
      });
    } else {
      alert("Remplissez tous les champs.");
    }
  };
  return (
    <div>
      <h1>Inscription</h1>

        <form>
      <input
        name="pseudo"
        placeholder="Pseudo"
        value={formData.pseudo}
        onChange={handleChange}
      />
    <br />
      <input
        name="code"
        placeholder="Code"
        type="password"
        value={formData.code}
        onChange={handleChange}
      />

      <button onClick={handleSignup}> S'inscrire </button>

      <p onClick={() => setPage("login")}>
        Déjà un compte ? Se connecter !
      </p>
      </form>

    </div>
  );
}