import { createGame } from "odyc";

const game = createGame({

  player: {
    sprite: 3,
    position: [0, 0],
  },
  templates: {
    g: {
      sprite: 7,
      solid: false,
    },
    a: {
      sprite: 4
    }
  },
  map: `
		ggaggggg
		gggggggg
		gggggggg
		gggggggg
		gggggggg
		gggggggg
		gggggggg
		gggggggg
	`,
  colors: [
    '#212529',
    '#f8f9fa',
    '#ced4da',
    '#228be6',
    '#fa5252',
    '#fcc419',
    '#ff922b',
    '#40c057',
    '#f06595',
    '#a52f01'
  ],
  messageBackground: 0,
  messageColor: 1,
  dialogBackground: 0,
  dialogColor: 1,
  dialogBorder: 1,
  dialogInternvalMs: 30,
  screenWidth: 8,
  screenHeight: 8,
  cellWidth: 8,
  cellHeight: 8,
  background: 1,
  volume: 0.5,
  controls: {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    ACTION: ['Enter', 'Space']
  },
});

const FPS: number = 3;
let lastUpdate = 0;
const interval = 1000 / FPS;

/**
 * Moves the player to the right with given FPS.
 * @param now Current timestamp in milliseconds.
 */
function animate(now: number) {
  if (now - lastUpdate > interval) {
    lastUpdate = now;

    const [x, y] = game.player.position;
    const newX = (x + 1) % game.width;
    game.player.position = [newX, y];
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate)
