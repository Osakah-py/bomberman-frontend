export const unicornData = {
  frames: {
    explosion1 :  { frame: { x: 0,   y: 0,  w: 100, h: 100 }, sourceSize: { w: 100, h: 100 }, spriteSourceSize: { x: 0, y: 0, w: 100, h: 100 } },
    explosion2 :  { frame: { x: 100,   y: 0,  w: 100, h: 100 }, sourceSize: { w: 100, h: 100 }, spriteSourceSize: { x: 0, y: 0, w: 100, h: 100 } },
    explosion3 :  { frame: { x: 0,   y: 100,  w: 100, h: 100 }, sourceSize: { w: 100, h: 100 }, spriteSourceSize: { x: 0, y: 0, w: 100, h: 100 } },
    explosion4 :  { frame: { x: 100,   y: 100,  w: 100, h: 100 }, sourceSize: { w: 100, h: 100 }, spriteSourceSize: { x: 0, y: 0, w: 100, h: 100 } },
  },
  meta: {
    image: 'UnicornExplosion.png',
    size: { w: 200, h: 200 },
    scale: 1
  },
  animations: {
    explosion:  ['explosion1',  'explosion2',  'explosion3',  'explosion4' ],
  }
};