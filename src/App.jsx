import  MainApp  from "./Game/MainApp"
import Login from "./login";
import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login");
  return (
    <>
        {page === "login" && <Login setPage={setPage} />}
        {page === "game" && <MainApp />}
    </>
  );
}