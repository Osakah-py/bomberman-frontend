import { useTick } from "@pixi/react";
import { useState, useRef } from "react"

export const usePhysics = (keys) => {
    const [x, setX] = useState(300);
    const [y, setY] = useState(400);
    const velocity = useRef({x: 0, y: 0})

    useTick ((ticker) => {
        const speed = 3;
        const friction = 0.9;

        if (keys.current['ArrowLeft']) {console.log("arrowleft"); velocity.current.x -= speed;}
        if (keys.current['ArrowRight']) velocity.current.x += speed;
        if (keys.current['ArrowUp']) velocity.current.y -= speed;
        if (keys.current['ArrowDown']) velocity.current.y += speed;

        velocity.current.x *= friction;
        velocity.current.y *= friction;

        setX(prev => prev + velocity.current.x * ticker.deltaTime);
        setY(prev => prev + velocity.current.y * ticker.deltaTime);
    });

    return {x, y};
}