import { useState } from "react";
import "./menu.css";


export default function Menu({ setPage }) {
    const utilisateur = localStorage.getItem("user");
     return (
    <div className="menu-container">
      <h1>BONBERMAN</h1>
      <h2>Menu</h2>
      <div>
        {/*<button onClick={() => setPage("game")}> Partie </button>*/}
        <button onClick={() => setPage("partie")}> Rejoindre/Créer une partie ! </button>
        <button onClick={() => setPage("amis")}> Mes Amis </button>
                <button onClick={() => {localStorage.removeItem("user"); setPage("login");}}> Déconnexion </button>


      </div>
    </div>
     );
} 