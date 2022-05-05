import Sprite from './Sprite';
import share from '../config/share';
import DrawRect from './DrawRect';

/**
 * 金币
 */
export default class Coin extends Sprite {
    constructor(type: number, x: number, y: number, rotation: number) {
        const SIZE: Array<DrawRect> = [
            new DrawRect(share.imgs.coin1, 0, 0, 60, 60),
            new DrawRect(share.imgs.coin2, 0, 0, 60, 60),
        ];
        super(SIZE[type], x, y, rotation);
        this.MAX_FRAME = 10;
        this.speed = 10;
    }
}
