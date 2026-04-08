import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";
import { useEffect, useState, useRef } from "react";

import playerSprite from '../../assets/NeoEarlyBomberman.png';
import { playerData } from "../../assets/playerData";

import { extend } from "@pixi/react";

extend({ AnimatedSprite });

const Player = ({ x, y, direction }) => {
    const [spritesheet, setSpritesheet] = useState(null);
    const spriteRef = useRef(null);

    useEffect(() => {

        const load = async () => {
            const texture = await Assets.load(playerSprite);
            texture.source.scaleMode = 'nearest';
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
    }, [spritesheet, direction]);


    if (!spritesheet) return null;

  const getTextures = () => {
    switch (direction) {
      case "top":    return spritesheet.animations.walkUp;
      case "bottom": return spritesheet.animations.walkDown;
      case "left":   return spritesheet.animations.walkLeft;
      case "right":  return spritesheet.animations.walkRight;
      default:       return spritesheet.animations.walkDown;
    }
  }

    return (
        <pixiAnimatedSprite
            ref={spriteRef}
            textures={getTextures()}
            animationSpeed={0.15}
            x={x}
            y={y}
            height={75}
            width={75}
        />
    );
}

export default Player; 