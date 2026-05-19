import  MainApp  from "./Game/MainApp"
import Login from "./login";
import Signup from "./signup";
import Menu from "./menu";
import Amis from "./amis";
import Partie from "./partie";
import Attente from "./attente";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  return (
    <>
        {page === "login" && <Login setPage={setPage} />}
        {page === "game" && <MainApp />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "menu" && <Menu setPage={setPage} />}
        {page === "amis" && <Amis setPage={setPage} />}
        {page === "partie" && <Partie setPage={setPage} />}
        {page === "attente" && <Attente setPage={setPage} />}
    </>
  );
}