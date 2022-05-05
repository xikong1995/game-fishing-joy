import share from '../config/share';
import DrawRect from './DrawRect';
import Sprite from './Sprite';

/**
 * 网
 */
export default class Web extends Sprite {
    constructor(type: number, x: number, y: number) {
        const SIZE = [
            new DrawRect(share.imgs.web, 319, 355, 116, 118),
            new DrawRect(share.imgs.web, 0, 399, 137, 142),
            new DrawRect(share.imgs.web, 163, 355, 156, 162),
            new DrawRect(share.imgs.web, 242, 181, 180, 174),
            new DrawRect(share.imgs.web, 0, 244, 163, 155),
            new DrawRect(share.imgs.web, 242, 0, 191, 181),
            new DrawRect(share.imgs.web, 0, 0, 242, 244),
        ];
        super(SIZE[type], x, y, 0);
        this.scaleX = 0;
        this.scaleY = 0;
    }

    scale() {
        this.scaleX += 1 / 20;
        this.scaleY += 1 / 20;
    }
}
