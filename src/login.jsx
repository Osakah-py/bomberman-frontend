import { useState } from "react";


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
      setPage("game");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>

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

      <button onClick={handleLogin}> Log In </button>

      <p onClick={() => setPage("register")}>
        Créer un compte
      </p>
      </form>

    </div>
  );
}