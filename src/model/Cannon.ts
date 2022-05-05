import Sprite from './Sprite';
import DrawRect from './DrawRect';
import share from '../config/share';

/**
 * 炮管
 */
export default class Cannon extends Sprite {
    type: number;
    size: Array<DrawRect>;

    constructor(type: number, x = 0, y = 0, rotation = 0) {
        const SIZE = [
            new DrawRect(share.imgs.cannon1, 0, 0, 74, 74),
            new DrawRect(share.imgs.cannon2, 0, 0, 74, 76),
            new DrawRect(share.imgs.cannon3, 0, 0, 74, 76),
            new DrawRect(share.imgs.cannon4, 0, 0, 74, 83),
            new DrawRect(share.imgs.cannon5, 0, 0, 74, 85),
            new DrawRect(share.imgs.cannon6, 0, 0, 74, 90),
            new DrawRect(share.imgs.cannon7, 0, 0, 74, 94),
        ];
        super(SIZE[type], x, y, rotation);
        this.size = SIZE;
        this.type = type;
        this.MAX_FRAME = 5;
    }

    setType(type: number) {
        this.type = type;
        this.setDrawRect(this.size[type]);
    }
}
