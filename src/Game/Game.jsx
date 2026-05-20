import Background from "./components/Background";
import Player from "./components/Player";
import Bomb from "./components/Bomb";
import PlayerEnnemy from "./components/PlayerEnnemy";
import { BACKEND_URL, CELL_SIZE } from '../constants'

import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';
import { useCamera } from "./system/useCamera";
import { useSocket } from "./system/useSocket";

import { useTick } from "@pixi/react";
import { Container } from "pixi.js";
import { extend } from "@pixi/react";
import useBombs from "./system/useBombs";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

extend({ Container })


const Game = () => {
    const keys = useInput();

    const [myPlayer, setMyPlayer] = useState(null);
    const [allPlayers, setAllPlayers] = useState({});
    const [bombs, setBombs] = useState({});

    const userPseudo = localStorage.getItem("user");
    const partieId = localStorage.getItem("partieId");
    const [plateau, setPlateau] = useState(null);

    // Recuperation plateau
    useEffect(() => {
        const params = new URLSearchParams();
        params.append("partieId", partieId);
        axios.get(BACKEND_URL + "/api/partiePlateau", { params: params })
            .then(response => setPlateau(response.data))
            .catch(error => {
                console.error("Erreur:", error);
            });

        // récupère l'état initial des joueurs
        axios.get(BACKEND_URL + "/api/partieEtat", { params: { partieId } })
            .then(response => {
                const joueurs = response.data.joueurs;
                const playersMap = {};
                console.log(joueurs);
                joueurs.forEach(j => {
                    playersMap[j.pseudo] = j;
                });
                setAllPlayers(playersMap);
            })
            .catch(error => console.error("Erreur état:", error));
    }, [partieId])


    const { send } = useSocket(partieId, userPseudo, (data) => {
        switch (data.action) {
            case "playerUpdate":
                console.log(data);
                setAllPlayers(prev => ({ ...prev, [data.pseudo]: data }));
                if (data.pseudo === userPseudo) setMyPlayer(data);
                break;
            case "playerConnected":
                // create a minimal player entry so rendering can't crash
                setAllPlayers(prev => ({
                    ...prev,
                    [data.pseudo]: prev[data.pseudo] ?? { pseudo: data.pseudo, pos_pixel: { x: 0, y: 0 }, pos_case: { x: 0, y: 0 }, vivant: true }
                }));
                break;
            case "bombDropped":
                setBombs(prev => ({
                    ...prev,
                    [`${data.pos_case.x}-${data.pos_case.y}`]: {
                        id: `${data.pos_case.x}-${data.pos_case.y}`,
                        x: data.pos_case.x * CELL_SIZE,
                        y: data.pos_case.y * CELL_SIZE,
                        exploding: false
                    }
                }));
                break;

            case "bombExploded":
                // passe en mode explosion puis supprime
                setBombs(prev => ({
                    ...prev,
                    [`${data.pos_case.x}-${data.pos_case.y}`]: {
                        ...prev[`${data.pos_case.x}-${data.pos_case.y}`],
                        exploding: true
                    }
                }));
                setTimeout(() => {
                    setBombs(prev => {
                        const next = { ...prev };
                        delete next[`${data.pos_case.x}-${data.pos_case.y}`];
                        return next;
                    });
                }, 800);
                break;

            case "playerDisconnected":
                setAllPlayers(prev => {
                    const next = { ...prev };
                    delete next[data.pseudo];
                    return next;
                });
                break;
        }
    });
    usePhysics(keys, send, userPseudo);
    const { camX, camY } = useCamera(myPlayer?.pos_pixel?.x ?? 0,
        myPlayer?.pos_pixel?.y ?? 0);
    const getDirection = (dir) => {
        if (!dir) return "bottom";
        const d = String(dir).toLowerCase();
        if (d.includes("haut") || d === "haut" || d === "top" || d === "up") return "top";
        if (d.includes("bas") || d === "bas" || d === "bottom" || d === "down") return "bottom";
        if (d.includes("gauche") || d === "gauche" || d === "left") return "left";
        if (d.includes("droite") || d === "droite" || d === "right") return "right";
        return "bottom";
    }
    return (
        <pixiContainer x={-camX} y={-camY}>
            <Background plateau={plateau} />
            {Object.values(bombs).map(bomb => (
                <Bomb key={bomb.id} {...bomb} />
            ))}
            {Object.values(allPlayers).map(player => {
                const px = player.pos_pixel?.x ?? (player.pos_case?.x ?? 0) * CELL_SIZE;
                const py = player.pos_pixel?.y ?? (player.pos_case?.y ?? 0) * CELL_SIZE;
                const dir = getDirection(player.deplacement ?? player.direction);
                return player.pseudo === userPseudo
                    ? <Player key={player.pseudo} x={px} y={py} direction={dir} />
                    : <PlayerEnnemy key={player.pseudo} x={px} y={py} direction={dir} />
            })}
        </pixiContainer>
    )
}

export default Game; 