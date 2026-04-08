import { Graphics } from "pixi.js";
import { extend } from "@pixi/react";
import { MAP_HEIGHT, MAP_WIDTH } from "../../constants";
import { useCallback } from "react";

extend ({Graphics})

const CELL_SIZE = 64;

const Background = () => {
    const draw = useCallback((g) => {
        g.clear();

        g.rect(0,0, MAP_WIDTH, MAP_HEIGHT);
        g.fill(0xffffff);

        for (let i = 0; i < MAP_WIDTH; i += CELL_SIZE) {
            g.moveTo(i, 0);
            g.lineTo(i, MAP_HEIGHT);
        }

        for (let i = 0; i < MAP_HEIGHT; i += CELL_SIZE) {
            g.moveTo(0, i);
            g.lineTo(MAP_WIDTH, i);
            g.stroke({ color: 0x000000, width: 1 });
        }
    }, []);

    return <pixiGraphics draw={draw} />;
}

export default Background;