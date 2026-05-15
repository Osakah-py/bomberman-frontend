import { useState } from "react";
import "./login.css";
import axios from "axios"
// exemple pour axios : https://medium.com/@thuvaragan20030322tt/frontend-backend-integration-using-axios-9aa2c0f1eddd

export default function Login({ setPage }) {
  const [formData, setFormData] = useState({
    pseudo: "",
    code: "",
  });

  const [type, setType] = useState('password'); // pour que le mode s'affiche

  const handleChange = (e) => { // pour que ca s'aaffiche
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = (event) => { 
    event.preventDefault(); //pas de rechargement de page 
    if (formData.pseudo && formData.code) {
    //  localStorage.setItem("user", formData.pseudo);
    //  setPage("menu"); //vers le menu
      const params = new URLSearchParams();
      params.append('pseudo', formData.pseudo);
      params.append('password', formData.code);
      axios.post('http://localhost:8080/api/seConnecter', params)
      .then(response => {
        localStorage.setItem("user", response.data.pseudo);
        setPage("menu");
      })
      .catch(error => {
        console.error(error);
        alert("Le pseudo ou  le mot de passe est incorrect.");
      });
    }
  };




  const handleToggle = () => { // mdp saffiche ou pas 
    if (type==='password'){
      setType('text')
   } else {
      setType('password')
   }
  }

  

  return (

    <div className="login-container">
    <form className="login-form">
            <h1>Connexion</h1>
      <input
        name="pseudo"
        placeholder="Pseudo"
        value={formData.pseudo}
        onChange={handleChange}
        className="boutton2"
      />
    <br />
      <div className="Tout_boutton2">
      <input
        name="code"
        placeholder="Code"
        type={type}
        value={formData.code}
        onChange={handleChange}
        className="boutton2" 
      />
      <ion-icon name={type === 'password' ? "lock-closed" : "lock-open"}
      onClick={handleToggle}
      style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: 'purple', fontSize: '20px'}}>
      </ion-icon>
      
      </div>

      <button onClick={handleLogin} className="boutton"> Login </button>

      <p onClick={() => setPage("signup")} className="compte" >
        Créer un compte
      </p>
      </form>

    </div>
    
  );
}