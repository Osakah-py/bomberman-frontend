import { useState } from "react";


export default function Menu({ setPage }) {
    const utilisateur = localStorage.getItem("user");
     return (
    <div>
      <h1>Menu</h1>
      <div>
        {/*<button onClick={() => setPage("game")}> Partie </button>*/}
        <button onClick={() => {localStorage.removeItem("user"); setPage("login");}}> Déconnexion </button>
        <button onClick={() => setPage("amis")}> Mes Amis </button>
        <button onClick={() => setPage("partie")}> Rejoindre/Créer une partie ! </button>

      </div>
    </div>
     );
} 