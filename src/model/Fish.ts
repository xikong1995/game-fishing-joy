import Sprite from './Sprite';
import DrawRect from './DrawRect';
import share from '../config/share';
import { rnd } from '../utils/helper';

const RADIUS_LIST = [12, 18, 15, 15, 23];

/**
 * 鱼
 */
export default class Fish extends Sprite {
    type: number;
    isDead: boolean;
    swingValue: number;

    constructor(type: number, x = 0, y = 0, rotation = 0) {
        const SIZE: Array<DrawRect> = [
            new DrawRect(share.imgs.fish1, 0, 0, 55, 37),
            new DrawRect(share.imgs.fish2, 0, 0, 78, 64),
            new DrawRect(share.imgs.fish3, 0, 0, 72, 56),
            new DrawRect(share.imgs.fish4, 0, 0, 77, 59),
            new DrawRect(share.imgs.fish5, 0, 0, 107, 122),
        ];
        super(SIZE[type], x, y, rotation);
        this.speed = rnd(1, 5);
        this.MAX_FRAME = 4;
        this.curFrame = 0;
        this.frameRate = 10;
        this.radius = RADIUS_LIST[type];

        this.type = type;
        this.isDead = false;
        if (Math.random() > 0.7) {
            this.swingValue = rnd(4, 10) * 0.01;
        } else {
            this.swingValue = rnd(0, 3) * 0.01;
        }
    }

    draw(gd: CanvasRenderingContext2D): void {
        if (this.rotation === -90) {
            this.scaleY = -1;
        }
        this.rotation -= 90;
        if (this.isDead) {
            this.curFrame += 4;
        }
        super.draw(gd);
        if (this.isDead) {
            this.curFrame -= 4;
        }
        this.rotation += 90;
        if (this.rotation === -90) {
            this.scaleY = 1;
        }
    }

    swing() {
        this.rotation += this.swingValue;
    }
}
