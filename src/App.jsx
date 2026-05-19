import  MainApp  from "./Game/MainApp"
import Login from "./Home/login";
import Signup from "./Home/signup";
import Menu from "./Home/menu";
import Amis from "./Home/amis";
import Partie from "./Home/partie";
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