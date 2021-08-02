import _ from 'lodash';

const GameScreen = function GameScreen(rows, cols, gameNode, labelNode) {
    let pixels;
    let label = '';

    var blank = function blank() {
        pixels = _.range(rows).map(() => _.range(cols).map(() => ' '));
    };

    var getPixels = function getPixels() {
        return pixels;
    };

    function setPixel(point, text) {
        if (point) {
            pixels[point.y][point.x] = text;
        }
    }

    function setLabel(text) {
        label = text;
    }

    function paint() {
        gameNode.innerHTML = pixels.reduce((accum, row) => {
            accum = accum + row.join('') + '\n';
            return accum;
        }, '');
        labelNode.innerHTML = label;
    }

    pixels = blank();

    return {
        blank: blank,
        getPixels: getPixels,
        paint: paint,
        setLabel: setLabel,
        setPixel: setPixel
    };
};

export default GameScreen;
