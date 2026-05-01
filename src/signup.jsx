import { useState } from "react";


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
      localStorage.setItem("user", formData.pseudo);
      setPage("login"); // vers login
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