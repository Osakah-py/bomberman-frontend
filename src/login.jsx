import { useState } from "react";
import "./login.css";

export default function Login({ setPage }) {
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

  const handleLogin = (event) => { 
    event.preventDefault(); //pas de rechargement de page
    if (formData.pseudo && formData.code) {
      localStorage.setItem("user", formData.pseudo);
      setPage("menu"); //vers le menu
    }
  };

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
      <input
        name="code"
        placeholder="Code"
        type="password"
        value={formData.code}
        onChange={handleChange}
        className="boutton2" 
      />

      <button onClick={handleLogin} className="boutton"> Login </button>

      <p onClick={() => setPage("signup")}>
        Créer un compte
      </p>
      </form>

    </div>
    
  );
}