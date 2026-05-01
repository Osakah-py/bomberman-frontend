import  MainApp  from "./Game/MainApp"
import Login from "./login";
import Signup from "./signup";
import Menu from "./menu";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  return (
    <>
        {page === "login" && <Login setPage={setPage} />}
        {page === "game" && <MainApp />}
        {page === "signup" && <Signup setPage={setPage} />}
        {page === "menu" && <Menu setPage={setPage} />}
    </>
  );
}