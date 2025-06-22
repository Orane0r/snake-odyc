import { createGame } from "odyc";
import { GAME_SIZE } from "./constants";
import type { Position } from "./types";
import { Direction } from "./enums";

const game = createGame({
  player: {
    sprite: 3,
    position: setInitialPosition(),
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
  screenWidth: GAME_SIZE,
  screenHeight: GAME_SIZE,
  cellWidth: GAME_SIZE,
  cellHeight: GAME_SIZE,
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

function setInitialPosition(): Position {
  return [
    Math.floor(Math.random() * GAME_SIZE),
    Math.floor(Math.random() * GAME_SIZE)
  ];
}

/**
 * Determines the initial direction based on the player's initial position
 * and the available space in each direction.
 * The player will move towards the direction with the most space.
 */
function getInitialDirection(): Direction {
  const [x, y] = game.player.position;

  const spaceRight = game.width - 1 - x;
  const spaceLeft = x;
  const spaceDown = game.height - 1 - y;
  const spaceUp = y;

  const maxSpace = Math.max(spaceRight, spaceLeft, spaceDown, spaceUp);

  switch (maxSpace) {
    case spaceRight:
      return Direction.Right;
    case spaceLeft:
      return Direction.Left;
    case spaceDown:
      return Direction.Down;
    case spaceUp:
      return Direction.Up;
    default:
      return Direction.Down;
  }
}

const FPS: number = 3;
let lastUpdate = 0;
const interval = 1000 / FPS;
const direction: Direction = getInitialDirection();

/**
 * Moves the player with given FPS and direction
 * @param now Current timestamp in milliseconds.
 */
function movePlayer(now: number) {
  if (now - lastUpdate > interval) {
    lastUpdate = now;

    const [x, y] = game.player.position;

    switch (direction) {
      case Direction.Right:
        game.player.position = [x + 1, y];
        break;
      case Direction.Left:
        game.player.position = [x - 1, y];
        break;
      case Direction.Down:
        game.player.position = [x, y + 1];
        break;
      case Direction.Up:
        game.player.position = [x, y - 1];
        break;
      default:
        break;
    }
  }

  requestAnimationFrame(movePlayer);
}

requestAnimationFrame(movePlayer)
