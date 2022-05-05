import share from '../config/share';
import DrawRect from './DrawRect';
import Sprite from './Sprite';

/**
 * 提示得分。打中时，弹出
 */
export default class TipScore extends Sprite {
    distX: number;
    distY: number;

    constructor(num: number, index: number, x: number, y: number) {
        super(new DrawRect(share.imgs.coinText, num * 36, 0, 36, 49), x + 36 * index, y, 0);
        this.distX = 0;
        this.distY = 0;
        this.speed = 5;
    }

    setDist(x: number, y: number) {
        this.distX = x;
        this.distY = y;
    }
}
