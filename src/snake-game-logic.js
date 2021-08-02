import Direction from './direction';

/**
 * @class SnakeGameLogic
 * @classdesc Maintains the state of the snake game.
 * tick() is run on a set interval and
 * if tick returns `true`, the properties (snake, score, apple) are retrieved & rendered onto the board
 * @inner a Point object has 2 properties-- row, class
 */
class SnakeGameLogic {

    /**
    * @class SnakeGameLogic
    * @param {integer} rows               - The total number of rows on the board
    * @param {integer} cols               - The total number of cols on the board
    * @param {Array<Point>} initialSnake  - The initial array of points to represent the snake's location
    * @param {integer} initialDirection   - value between 0-3 representing snake's initial direction
    *                                       (0-Up, 1-Right, 2-Down, 3-Left)
    *
    * @todo implement these properties:
    * @property {Array<Point>}  snake     - The array of snake points
    * @property {number}  score           - The number of apples eaten, starts with 0.
    * @property {Point}  apple            - The location of the apple.
    *
    * @todo initialize score to 0
    * @todo generate a random apple somewhere on the board but not on the initialSnake position
    */
    constructor(rows, cols, initialSnake, initialDirection) {
        this.rows = rows;
        this.cols = cols;
        this.snake = initialSnake;
        this.score = 0;
        this.apple = this.generateApplePosition();
        this.direction = initialDirection;
    }

    generateApplePosition() {

        const row = Math.floor(Math.random() * ((this.rows - 1) - 0 + 1) + 0);
        const col = Math.floor(Math.random() * ((this.cols - 1) - 0 + 1) + 0);

        if (this.snakeIntersectsApple({ row, col })) {
            this.generateApplePosition();
        }

        return {
            row, col
        };
    }

    /**
    * input
    * @listens keypress -- arrow keys or space
    * @summary Ignore command inputs that are opposite the snake's current direction (ex: ignore down if going up)
    * @param {integer} command - the direction the user intends to move (0-Up, 1-Right, 2-Down, 3-Left, 4-Zoom)
    */
    input(command) {

        if (this.isValidNextDirection(command)) {
            this.direction = command;
        }
    }

    isValidNextDirection(command) {
        const xCurrentMove = this.direction === Direction.LEFT || this.direction === Direction.RIGHT;
        const yCurrentMove = this.direction === Direction.UP || this.direction === Direction.DOWN;
        const yIntendedMove = command === Direction.UP || command === Direction.DOWN;
        const xIntendedMove = command === Direction.LEFT || command === Direction.RIGHT;

        if (xCurrentMove && yIntendedMove) return true;
        if (yCurrentMove && xIntendedMove) return true;

        return false;
    }

    get snakeHead() {
        return this.snake[this.snake.length - 1];
    }

    /**
    * tick
    * @todo Increment the state of the game by moving the snake forward in the current direction by 1 point.
    * @todo Handle apple eating (snake moves onto the apple):
    *     1. Snake grows longer by 1
    *     2. Increment score by 1
    *     3. Generate a new random apple somewhere else on the board and not in the snake
    *
    * @todo End Game Conditions:
    *     1. Snake hits wall
    *     2. Snake eats itself
    *     3. Snake takes up whole board
    * @return {boolean} shouldGameContinue - determines whether the game should continue playing or not
    */
    tick() {
        let snakeHead = this.snakeHead;

        // check if Snake hits walls
        switch (this.direction) {
            case Direction.RIGHT:
                if (snakeHead.col >= (this.cols - 1)) return false;

                this.snake.push({
                    col: snakeHead.col + 1,
                    row: snakeHead.row
                });
                break;

            case Direction.LEFT:
                if (snakeHead.col < 0) return false;

                this.snake.push({
                    col: snakeHead.col - 1,
                    row: snakeHead.row
                });
                break;

            case Direction.UP:
                if (snakeHead.row < 0) return false;

                this.snake.push({
                    col: snakeHead.col,
                    row: snakeHead.row - 1
                });
                break;

            case Direction.DOWN:
                if (snakeHead.row >= (this.cols - 1)) return false;

                this.snake.push({
                    col: snakeHead.col,
                    row: snakeHead.row + 1
                });
                break;
        }

        // snake eats itself
        if (this.snakeEatsItself()) {
            return false;
        }

        // snake takes whole board
        if (this.snake.length >= (this.rows * this.cols)) {
            return false;
        }

        this.score += 1;

        // TODO: Handle apple eating
        if (this.snakeIntersectsApple()) {
            this.apple = this.generateApplePosition();
        }

        return true;
    }

    snakeIntersectsApple(apple) {
        apple = apple || this.apple;
        return this.snake.some((snake) => snake.col === apple.col && snake.row === apple.row);
    }

    snakeEatsItself() {
        const head = this.snakeHead;
        return this.snake.slice(0, this.snake.length - 1)
            .some((snake) => snake.col === head.col && snake.row === head.row);
    }
}

export default SnakeGameLogic;
