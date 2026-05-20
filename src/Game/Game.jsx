import Background from "./components/Background";
import Player from "./components/Player";
import Bomb from "./components/Bomb";
import PlayerEnnemy from "./components/PlayerEnnemy";
import { BACKEND_URL } from '../constants'

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

    usePhysics(keys, send, pseudo);
    const { camX, camY } = useCamera(myPlayer?.pos_pixel?.x ?? 0,
        myPlayer?.pos_pixel?.y ?? 0);
    // Recuperation plateau
    useEffect(() => {
        const params = new URLSearchParams();
        params.append("partieId", partieId);
        axios.get(BACKEND_URL + "/api/partiePlateau", { params: params })
            .then(response => setPlateau(response.data))
            .catch(error => {
                console.error("Erreur:", error);
            });
    }, [partieId])


    const { send } = useSocket(partieId, (data) => {
        switch (data.action) {
            case "playerUpdate":
                setAllPlayers(prev => ({ ...prev, [data.pseudo]: data }));
                if (data.pseudo === pseudo) setMyPlayer(data);
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


    return (
        <pixiContainer x={-camX} y={-camY}>
            <Background plateau={plateau} />
            {Object.values(bombs).map(bomb => (
                <Bomb key={bomb.id} {...bomb} />
            ))}
            {Object.values(allPlayers).map(player => (
                player.pseudo === pseudo
                    ? <Player key={player.pseudo} x={player.pos_pixel.x} y={player.pos_pixel.y} direction={player.deplacement} />
                    : <PlayerEnnemy key={player.pseudo} x={player.pos_pixel.x} y={player.pos_pixel.y} direction={player.deplacement} />
            ))}
        </pixiContainer>
    )
}

export default Game; 