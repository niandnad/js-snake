import _ from 'lodash';
import SnakeGameLogic from './snake-game-logic';
import GameScreen from './game-screen';
import Direction from './direction';

const COLS = 50; // 50
const ROWS = 40; // 40
const INTERVAL_DURATION = 70; // 70
const INITIAL_SNAKE_POINTS = _.range(0, 3).map((i) => {
    return {
        col: i,
        row: 0
    };
});
const INITIAL_DIRECTION = Direction.RIGHT;

var render = function render(gameLogic, screen, frameCount, stopRendering) {
    if (!gameLogic.tick()) {
        stopRendering();

        screen.setLabel(`Snake Score: ${gameLogic.score} Frame: ${frameCount} GAME OVER`);
    } else {
        var snakePoints = gameLogic.snake;
        snakePoints.forEach((point) => screen.setPixel({ x: point.col, y: point.row }, '0'));

        var applePoint = gameLogic.apple;
        screen.setPixel({ x: applePoint.col, y: applePoint.row }, '*');

        screen.setLabel(`Snake Score: ${gameLogic.score} Frame: ${frameCount}`);
    }
};

var frameCount = 0;
var gameNode = document.getElementById('game');
var labelNode = document.getElementById('label');
var gameLogic = new SnakeGameLogic(ROWS, COLS, INITIAL_SNAKE_POINTS, INITIAL_DIRECTION);
var screen = new GameScreen(ROWS, COLS, gameNode, labelNode);

var intervalId = setInterval(() => {
    var stopRendering = () => clearInterval(intervalId);
    screen.blank();
    render(gameLogic, screen, frameCount, stopRendering);
    screen.paint();
    frameCount += 1;
}, INTERVAL_DURATION);

window.addEventListener('keydown', function onKeyDown(e) {
    switch (e.keyCode) {
        case 32:  // space bar
            gameLogic.input(Direction.ZOOM);
            e.preventDefault();
            break;
        case 38:
            gameLogic.input(Direction.UP);
            e.preventDefault();
            break;
        case 40:
            gameLogic.input(Direction.DOWN);
            e.preventDefault();
            break;
        case 37:
            gameLogic.input(Direction.LEFT);
            e.preventDefault();
            break;
        case 39:
            gameLogic.input(Direction.RIGHT);
            e.preventDefault();
            break;
    }
});
