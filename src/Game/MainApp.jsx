import { Application, extend } from '@pixi/react';
import { APP_WIDTH, APP_HEIGHT } from '../constants';
import Game from './Game'

export default function MainApp() {

  return (
    <>
    <Application width={APP_WIDTH} height={APP_HEIGHT} backgroundColor={0x333333}>
      < Game />
    </Application>
    </>
  );
}