import Background from "./components/Background";
import Player from "./components/Player";
import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';

const Game = () => {
    const keys = useInput();
      const {x, y, direction} = usePhysics(keys);
    return(
        <>
        <Background />
        <Player x={x} y={y} direction={direction} />
        </>
        
    )
}

export default Game; 