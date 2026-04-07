import  Box from "./components/Box"
import { useInput } from './system/useInput';
import { usePhysics } from './system/usePhysics';

const Game = () => {
    const keys = useInput();
      const {x, y} = usePhysics(keys);
    return(
        <Box x={x} y={y} />
    )
}

export default Game; 