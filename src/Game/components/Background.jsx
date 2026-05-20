import { Graphics, Sprite, Assets, Texture } from "pixi.js";
import { extend } from "@pixi/react";
import { MAP_HEIGHT, MAP_WIDTH } from "../../constants";
import { useCallback, useState, useEffect } from "react";

import wallImg from '../../assets/wall.jpg'
import woodImg from '../../assets/wood.jpg'

extend({ Graphics, Sprite })

const CELL_SIZE = 50;


const Background = ({ plateau }) => {
    const WALLS = [];
    const DESTROYABLE = [];

    if (plateau) {
        for (let row = 0; row < plateau.length; row++) {
            for (let col = 0; col < plateau[row].length; col++) {
                if (plateau[row][col] === "BLOC_INCASSABLE") WALLS.push([col, row]);
                if (plateau[row][col] === "BLOC_CASSABLE") DESTROYABLE.push([col, row]);
            }
        }
    }

    const [wallTexture, setWallTexture] = useState(null);
    const [woodTexture, setWoodTexture] = useState(null);

    useEffect(() => {
        const load = async () => {
            const texture = await Assets.load(wallImg);
            texture.source.scaleMode = 'nearest';
            setWallTexture(texture);
        }
        load();

    }, []);
    useEffect(() => {
        const load = async () => {
            const texture = await Assets.load(woodImg);
            texture.source.scaleMode = 'nearest';
            setWoodTexture(texture);
        }
        load();
    }, []);
    // On utilise un CallBack pour éviter de refaire le dessin à chaque fois
    const draw = useCallback((g) => {
        g.clear();

        g.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
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

    return (
        <pixiContainer>
            <pixiGraphics draw={draw} />
            {wallTexture && WALLS.map(([col, row]) => (
                <pixiSprite
                    key={`${col}-${row}`}
                    texture={wallTexture}
                    x={col * CELL_SIZE}
                    y={row * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                />
            ))}
            {woodTexture && DESTROYABLE.map(([col, row]) => (
                <pixiSprite
                    key={`${col}-${row}`}
                    texture={woodTexture}
                    x={col * CELL_SIZE}
                    y={row * CELL_SIZE}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                />
            ))}
        </pixiContainer>);
}

export default Background;