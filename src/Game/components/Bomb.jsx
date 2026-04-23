import { useEffect, useRef, useState } from "react"

import unicornExplosion from '../../assets/UnicornExplosion.png'
import { unicornData } from "../../assets/unicornData";

import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";
import { useTick } from "@pixi/react";

const PULSE_SPEED = 3;

const Bomb = ({x, y, exploding}) => {
    const [spritesheet, setSpritesheet] = useState(null);
    const spriteRef = useRef(null);
    const [scale, setScale] = useState(1);
    const time = useRef(0);

    // Hook pour charger la texture 
    useEffect(() => {
        const load = async () => {
            const texture = await Assets.load(unicornExplosion);
            texture.source.scaleMode = 'nearest'
            const sheet = new Spritesheet(texture, unicornData);
            await sheet.parse();
            setSpritesheet(sheet);
        }

    load();
    }, [])

    // Hook pour lancer l'animation 
    useEffect(() => {
        if (spriteRef.current) {
            spriteRef.current.play();
        }
    }, [spritesheet])


    useTick ((ticker) => {
        time.current += ticker.deltaTime * PULSE_SPEED;
        setScale (1 + Math.abs(Math.sin(time.current * 0.05)));
    });
    
    if (!spritesheet) return null; 

    // On retourne le sprite 
    return (
        <pixiAnimatedSprite 
            ref={spriteRef}
            textures={spritesheet.animations.explosion}
            animationSpeed={exploding ? 0.15 : 0}
            x={x}
            y={y}
            height={150 * scale}
            width={150 * scale}
            anchor={0.5}
        />
    )

}

export default Bomb