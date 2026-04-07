import { useTick } from "@pixi/react";
import { useState, useRef } from "react"
import { APP_HEIGHT, APP_WIDTH } from "../../constants";

export const usePhysics = (keys) => {
    const [x, setX] = useState(300);
    const [y, setY] = useState(400);
    const velocity = useRef({x: 0, y: 0})

    useTick ((ticker) => {
        const speed = 3;
        const friction = 0.9;
        const bounce = 2;

        if (keys.current['ArrowLeft']) velocity.current.x -= speed;
        if (keys.current['ArrowRight']) velocity.current.x += speed;
        if (keys.current['ArrowUp']) velocity.current.y -= speed;
        if (keys.current['ArrowDown']) velocity.current.y += speed;

        velocity.current.x *= friction;
        velocity.current.y *= friction;

        let newX = x + velocity.current.x * ticker.deltaTime
        let newY = y + velocity.current.y * ticker.deltaTime

        if (newX < 0) {
            newX = 0;
            velocity.current.x = Math.abs(velocity.current.x) * bounce
        }
        if (newX > APP_WIDTH) {
            newX = APP_WIDTH;
            velocity.current.x = -Math.abs(velocity.current.x) * bounce
        }
        if (newY < 0) {
            newY = 0;
            velocity.current.y = Math.abs(velocity.current.y) * bounce
        }
        if (newY > APP_HEIGHT) {
            newY = APP_HEIGHT;
            velocity.current.y = -Math.abs(velocity.current.y) * bounce
        }

        setX(newX);
        setY(newY);
    });

    return {x, y};
}