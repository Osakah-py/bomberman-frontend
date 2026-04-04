import { Application, extend } from '@pixi/react';
import  Box from "./components/Box"
import { APP_WIDTH, APP_HEIGHT } from '../constants';


export default function MainApp() {
  return (
    <>
    <Application width={APP_WIDTH} height={APP_HEIGHT} backgroundColor={0x333333}>
      <Box />
    </Application>
    </>
  );
}