import Background from "./components/Background";
import Player from "./components/Player";
import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';
import { useCamera } from "./system/useCamera";

import { Container } from "pixi.js";
import { extend } from "@pixi/react";
extend ({ Container })


const Game = () => {
    const keys = useInput();
    const {x, y, direction} = usePhysics(keys);
    const { camX, camY } = useCamera(x, y);

    return(
        <pixiContainer x={-camX} y={-camY}>
        <Background />
        <Player x={x} y={y} direction={direction} />
        </pixiContainer>
        
    )
}

export default Game; 