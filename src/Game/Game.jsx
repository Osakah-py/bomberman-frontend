import Background from "./components/Background";
import Player from "./components/Player";
import Bomb from "./components/Bomb";
import PlayerEnnemy from "./components/PlayerEnnemy";

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

extend({ Container })


const Game = () => {
    const keys = useInput();
    const { x, y, direction, bombs } = usePhysics(keys);
    const { camX, camY } = useCamera(x, y);
    const [otherPlayers, setOtherPlayers] = useState({});

    const { send } = useSocket(2, (data) => {
        if (data.type === "player_move") {
            setOtherPlayers(prev => ({ ...prev, [data.pseudo]: data }));
            //console.log("joueur reçu:", data);
        }
    });

    // envoie ta position à chaque tick
    useTick(() => {
        send({ type: "player_move", pseudo: "dider", x, y, direction });
    });
    return (
        <pixiContainer x={-camX} y={-camY}>
            <Background />
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