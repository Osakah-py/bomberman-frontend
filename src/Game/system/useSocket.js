import { useEffect, useRef } from "react";
import { BACKEND_SOCKET } from "../../constants";

export const useSocket = (partieId, onMessage) => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(BACKEND_SOCKET + `/api/ws/game?pseudo=${pseudo}&partieId=${partieId}`);

    ws.current.onopen = () => {
      console.log("WebSocket connecté !");
    };

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      onMessage(data); 
    };

    ws.current.onclose = () => console.log("WebSocket fermé");
    ws.current.onerror = (e) => console.error("WebSocket erreur", e);

    return () => ws.current.close(); // cleanup
  }, []);

  
  const send = (data) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  return { send };
};