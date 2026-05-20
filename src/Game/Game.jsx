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
    const { x, y, direction, bombs } = usePhysics(keys);
    const { camX, camY } = useCamera(x, y);
    const [otherPlayers, setOtherPlayers] = useState({});

    const partieId = localStorage.getItem("partieId");
    const [plateau, setPlateau] = useState(null);

    useEffect (() => {
        const params = new URLSearchParams();
        params.append("partieId", partieId);
        axios.get(BACKEND_URL + "/api/partiePlateau", { params: params })
        .then(response => setPlateau(response.data))
      .catch(error => {
        console.error("Erreur:", error);
      });
    }, [partieId])
    const { send } = useSocket(2, (data) => {
        if (data.type === "player_move") {
            setOtherPlayers(prev => ({ ...prev, [data.pseudo]: data }));
            //console.log("joueur reçu:", data);
        }
    });

    // envoie ta position à chaque tick
    useTick(() => {
        send({ type: "player_move", pseudo: "micka", x, y, direction });
    });
    return (
        <pixiContainer x={-camX} y={-camY}>
            <Background plateau={plateau}/>
            {bombs.map(bomb => (
                <Bomb key={bomb.id} {...bomb} />
            ))}
            <Player x={x} y={y} direction={direction} />
            {Object.values(otherPlayers).map(player => (
                <PlayerEnnemy
                    key={player.pseudo}
                    x={player.x}
                    y={player.y}
                    direction={player.direction}
                />
            ))}
        </pixiContainer>
    )
}

export default Game; 