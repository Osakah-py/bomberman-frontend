import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";
import { useEffect, useState, useRef } from "react";

import playerSprite from '../../assets/NeoEarlyBomberman.png';
import { playerData } from "../../assets/playerData";

import { extend } from "@pixi/react";

extend({ AnimatedSprite });

const Player = ({ x, y, direction }) => {
    const [spritesheet, setSpritesheet] = useState(null);
    const spriteRef = useRef(null);

    // Hook pour charger la texture
    useEffect(() => {
        const load = async () => {
            const texture = await Assets.load(playerSprite);
            texture.source.scaleMode = 'nearest'; // pour garder l'aspect pixel art
            const sprtesheet = new Spritesheet(texture, playerData);
            await sprtesheet.parse();
            setSpritesheet(sprtesheet);
        }

        load();
    }, []);
    // Hook pour lancer l'animation une fois que tout est chargé. 
    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.play();
        }
    }, [spritesheet, direction]);


    if (!spritesheet) return null;

    // Choisir l'animation en fonction du mouvement cf usePhysics
  const getTextures = () => {
    switch (direction) {
      case "top":    return spritesheet.animations.walkUp;
      case "bottom": return spritesheet.animations.walkDown;
      case "left":   return spritesheet.animations.walkLeft;
      case "right":  return spritesheet.animations.walkRight;
      default:       return spritesheet.animations.walkDown;
    }
  }
// on retourne simplement le sprite aux positions données
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