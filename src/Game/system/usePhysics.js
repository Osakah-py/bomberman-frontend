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
    const lastDirection = useRef(null);

    const { bombs, placeBomb } = useBombs();

    useTick((ticker) => {
        const speed = 1;
        const friction = 0.9;
        const bounce = 2;

        if (keys.current['ArrowLeft']) direction = "GAUCHE";
        if (keys.current['ArrowRight']) direction = "DROITE";
        if (keys.current['ArrowUp']) direction = "HAUT";
        if (keys.current['ArrowDown']) direction = "BAS";
        if (keys.current[' ']) addBomb.current = true;

        if (direction !== lastDirection.current) {
            lastDirection.current = direction;
            send({
                action: "move",
                pseudo,
                direction: direction ?? "NONE"
            });
        }

        if (keys.current[' ']) {
            send({ action: "dropBomb", pseudo });
        }
    });

}