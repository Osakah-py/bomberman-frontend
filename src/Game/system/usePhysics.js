import { useTick } from "@pixi/react";
import { useState, useRef } from "react"
import { MAP_HEIGHT, MAP_WIDTH } from "../../constants";
import useBombs from "./useBombs";

export const usePhysics = (keys) => {
    const [x, setX] = useState(300);
    const [y, setY] = useState(400);
    const [direction, setDirection] = useState("top");
    const velocity = useRef({ x: 0, y: 0 })
    const addBomb = useRef(false)
    const {bombs, placeBomb } = useBombs();

    useTick((ticker) => {
        const speed = 1;
        const friction = 0.9;
        const bounce = 2;

        if (keys.current['ArrowLeft']) velocity.current.x -= speed;
        if (keys.current['ArrowRight']) velocity.current.x += speed;
        if (keys.current['ArrowUp']) velocity.current.y -= speed;
        if (keys.current['ArrowDown']) velocity.current.y += speed;
        if (keys.current[' ']) addBomb.current = true;

        velocity.current.x *= friction;
        velocity.current.y *= friction;

        let newX = x + velocity.current.x * ticker.deltaTime
        let newY = y + velocity.current.y * ticker.deltaTime
        if (addBomb.current) placeBomb(newX +50, newY+50);

        if (newX < 0) {
            newX = 0;
            velocity.current.x = Math.abs(velocity.current.x) * bounce
        }
        if (newX > MAP_WIDTH) {
            newX = MAP_WIDTH;
            velocity.current.x = -Math.abs(velocity.current.x) * bounce
        }
        if (newY < 0) {
            newY = 0;
            velocity.current.y = Math.abs(velocity.current.y) * bounce
        }
        if (newY > MAP_HEIGHT) {
            newY = MAP_HEIGHT;
            velocity.current.y = -Math.abs(velocity.current.y) * bounce
        }

        setX(newX);
        setY(newY);

        // Calcul direction 
        if (Math.abs(velocity.current.y) > 0.1 || Math.abs(velocity.current.x) > 0.1) {
            if (Math.abs(velocity.current.y) > Math.abs(velocity.current.x)) {
                if (velocity.current.y < 0) {
                    setDirection("top")
                } else {
                    setDirection("bottom")
                }
            } else {
                if (velocity.current.x < 0) {
                    setDirection("left")
                } else {
                    setDirection("right")
                }

            }
        }

        addBomb.current = false;
    });

    return { x, y, direction, bombs };
}