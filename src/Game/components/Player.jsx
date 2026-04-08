import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";
import { useEffect, useState, useRef } from "react";

import playerSprite from '../../assets/NeoEarlyBomberman.png';
import {playerData} from "../../assets/playerData";

import { extend } from "@pixi/react";

extend({ AnimatedSprite });

const Player = ({x, y}) => {
 const [spritesheet, setSpritesheet] = useState(null);
const spriteRef = useRef(null);
    useEffect(() => {

        const load = async () => {
            const texture = await Assets.load(playerSprite);
            const sprtesheet = new Spritesheet(texture, playerData);
            await sprtesheet.parse();
            setSpritesheet(sprtesheet);
        }

        load();
    }, []);
  useEffect(() => {
    if (spriteRef.current) {
      spriteRef.current.play();
    }
  }, [spritesheet]);
    if (!spritesheet) return null;

return (
    <pixiAnimatedSprite
      ref={spriteRef}
      textures={spritesheet.animations.walkDown}
      animationSpeed={0.15}
      x={x}
      y={y}
      height={75}
      width={75}
    />
);
}

export default Player; 