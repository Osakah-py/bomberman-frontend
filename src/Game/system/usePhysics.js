import { useTick } from "@pixi/react";
import { useRef } from "react";

export const usePhysics = (keys, send, pseudo) => {
  const lastDirection = useRef(null);
  const lastBomb = useRef(false);

  useTick(() => {
    let direction = null; 

    if (keys.current['ArrowLeft'])  direction = "GAUCHE";
    if (keys.current['ArrowRight']) direction = "DROITE";
    if (keys.current['ArrowUp'])    direction = "HAUT";
    if (keys.current['ArrowDown'])  direction = "BAS";


    if (direction) {
      lastDirection.current = direction;
      send({ action: "move", pseudo, direction: direction ?? "NONE" });
    }

    // cooldown bombe pour pas spammer
    if (keys.current[' '] && !lastBomb.current) {
      lastBomb.current = true;
      send({ action: "dropBomb", pseudo });
    }
    if (!keys.current[' ']) {
      lastBomb.current = false;
    }
  });
};