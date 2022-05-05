import Sprite from './Sprite';
import DrawRect from './DrawRect';
import share from '../config/share';

/**
 * 炮弹
 */
export default class Bullet extends Sprite {
    type: number;

    constructor(type: number, x: number, y: number, rotation: number) {
        const SIZE: Array<DrawRect> = [
            new DrawRect(share.imgs.bullet, 86, 0, 24, 26),
            new DrawRect(share.imgs.bullet, 61, 0, 25, 29),
            new DrawRect(share.imgs.bullet, 32, 36, 29, 30),
            new DrawRect(share.imgs.bullet, 30, 82, 29, 33),
            new DrawRect(share.imgs.bullet, 0, 82, 30, 34),
            new DrawRect(share.imgs.bullet, 30, 0, 31, 35),
            new DrawRect(share.imgs.bullet, 0, 44, 32, 38),
        ];
        super(SIZE[type], x, y, rotation);
        this.type = type;
        this.speed = 30;
        this.radius = 14;
    }
}
