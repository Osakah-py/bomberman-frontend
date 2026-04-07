import { useRef, useState } from 'react';
import { extend, useTick } from '@pixi/react';
import { Graphics, Text, Container } from 'pixi.js';
import { APP_WIDTH } from '../../constants';

extend({ Graphics, Text, Container });

const Box = ({x, y}) => {
  const [rotation, setRotation] = useState(0);
  const i = useRef(0);

  useTick(ticker => {
     
    i.current += 0.05 * ticker.deltaTime;
    setRotation(-10 + Math.sin(i.current / 10 + Math.PI * 2) * 10);
  });
  
return (
  <pixiContainer>
    <pixiText text={`rotation: ${rotation.toFixed(2)} position: x :${x.toFixed(2)} y ${y.toFixed(2)}`} x={300} y={50} anchor={0.5} />
    <pixiGraphics
      draw={(g) => {
        g.clear();
        g.rect(0, 0, 100, 100);
        g.fill({ color: 0xff0000, alpha: 1 });
      }}
      x={x}
      y={y}
      rotation={rotation}
      pivot={{ x: 50, y: 50 }}
    />
  </pixiContainer>
);
};

export default Box;