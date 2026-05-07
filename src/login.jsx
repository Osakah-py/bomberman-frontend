import { useState } from "react";
import "./login.css";

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
      localStorage.setItem("user", formData.pseudo);
      setPage("menu"); //vers le menu
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

      <p onClick={() => setPage("signup")}>
        Créer un compte
      </p>
      </form>

    </div>
    
  );
}