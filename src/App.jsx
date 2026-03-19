import { Application, extend } from '@pixi/react';
import { Graphics } from 'pixi.js';

extend({ Graphics });

const Box = () => {
  return (
    <pixiGraphics
      draw={(g) => {
        g.clear();
        g.beginFill(0xff0000);
        g.drawRect(0, 0, 100, 100);
        g.endFill();
      }}
    />
  );
};

export default function App() {
  return (
    <Application width={800} height={600} backgroundColor={0x333333}>
      <Box />
    </Application>
  );
}