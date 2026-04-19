import Background from "./components/Background";
import Player from "./components/Player";
import Bomb from "./components/Bomb";
import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';
import { useCamera } from "./system/useCamera";

import { Container } from "pixi.js";
import { extend } from "@pixi/react";
import useBombs from "./system/useBombs";
import { useEffect } from "react";

extend ({ Container })


const Game = () => {
    const keys = useInput();
    const {x, y, direction} = usePhysics(keys);
    const { camX, camY } = useCamera(x, y);
    const {bombs, placeBomb } = useBombs();

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === ' ') placeBomb(x, y);
        }
        window.addEventListener('keydown', onKeyDown);
    }, [x, y, placeBomb])

    return(
        <pixiContainer x={-camX} y={-camY}>
        <Background />
        {bombs.map (bomb => (
            <Bomb key = {bomb.id} {...bomb} />
        ))}
        <Player x={x} y={y} direction={direction} />
        </pixiContainer>
    )
}

export default Game; 