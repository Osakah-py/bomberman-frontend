import  Box from "./components/Box"
import Player from "./components/Player";
import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';

const Game = () => {
    const keys = useInput();
      const {x, y, direction} = usePhysics(keys);
    return(
        <>
        <Player x={x} y={y} direction={direction} />
        </>
        
    )
}

export default Game; 