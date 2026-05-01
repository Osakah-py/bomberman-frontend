import { useState } from "react";


export default function Menu({ setPage }) {
    const utilisateur = localStorage.getItem("utimisateur");
     return (
    <div>
      <h1>Menu</h1>
      <div>
        <button onClick={() => setPage("game")}> Partie </button>
        <button onClick={() => {localStorage.removeItem("user"); setPage("login");}}> Déconnexion </button>
      </div>
    </div>
     );
}