import { useEffect, useRef, useState } from "react"

import unicornExplosion from '../../assets/UnicornExplosion.png'
import { unicornData } from "../../assets/unicornData";

import { AnimatedSprite, Assets, Spritesheet } from "pixi.js";

const Bomb = ({x, y, exploding}) => {
    const [spritesheet, setSpritesheet] = useState(null);
    const spriteRef = useRef(null);

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

    if (!spritesheet) return null; 

    // On retourne le sprite 
    return (
        <pixiAnimatedSprite 
            ref={spriteRef}
            textures={spritesheet.animations.explosion}
            animationSpeed={exploding ? 0.15 : 0}
            x={x}
            y={y}
            height={200}
            width={200}
        />
    )

}

export default Bomb