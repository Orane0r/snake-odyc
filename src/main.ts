import { createGame } from "odyc";
import { GAME_SIZE } from "./constants";
import type { Input, Position } from "./types";
import { Direction } from "./enums";

const game = createGame({
  player: {
    sprite: 3,
    position: setInitialPosition(),
    onInput: onPlayerInput,
  },
  templates: {
    g: {
      sprite: 7,
      solid: false,
    },
    a: {
      sprite: 4
    },
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

/**
 * @returns A random initial position within the game boundaries.
 */
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
let direction: Direction = getInitialDirection();
let restarted: boolean = false;

/**
 * Moves the player with given FPS and direction.
 * If the game has restarted after a game over, resets the player's position and direction.
 * If the player moves out of bounds, the game ends.
 * @param now Current timestamp in milliseconds.
 */
// TOOD changer et mettre dans onTurn ?
function movePlayer(now: number) {
  if (restarted) {
    game.player.position = setInitialPosition();
    direction = getInitialDirection();
    restarted = false;
  }

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

    const [newX, newY] = game.player.position;
    if (newX < 0 ||
      newX >= game.width ||
      newY < 0 ||
      newY >= game.height) {

      restarted = true;
      game.end('Game Over');
    }
  }

  requestAnimationFrame(movePlayer);
}

function onPlayerInput(input: Input) {
  switch (input) {
    case 'LEFT':
      direction = Direction.Left;
      break;
    case 'UP':
      direction = Direction.Up;
      break;
    case 'RIGHT':
      direction = Direction.Right;
      break;
    case 'DOWN':
      direction = Direction.Down;
      break;
    case 'ACTION':
      break;
    default:
      break;
  }
}

requestAnimationFrame(movePlayer);
