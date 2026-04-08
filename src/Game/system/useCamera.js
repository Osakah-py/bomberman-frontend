import { MAP_WIDTH, MAP_HEIGHT, APP_WIDTH, APP_HEIGHT } from "../../constants"

export const useCamera = (playerX, playerY) => {
    let camX = playerX - APP_WIDTH /2
    let camY = playerY - APP_HEIGHT /2 

    camX = Math.max(0, Math.min(MAP_WIDTH - APP_WIDTH, camX));
    camY = Math.max(0, Math.min(MAP_HEIGHT - APP_HEIGHT, camY)); 

    return ({camX, camY})
}