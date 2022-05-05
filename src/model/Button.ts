import Sprite from './Sprite';
import DrawRect from './DrawRect';
import { noop } from '../utils/helper';

/**
 * 按钮。可以切换炮管
 */
export default class Button extends Sprite {
    drawRectNormal: DrawRect;
    drawRectActive: DrawRect;
    downAtMe: boolean;
    onclick: Function = noop;

    constructor(drawRectNormal: DrawRect, drawRectActive: DrawRect, x = 0, y = 0, rotation = 0) {
        super(drawRectNormal, x, y, rotation);
        this.drawRectNormal = drawRectNormal;
        this.drawRectActive = drawRectActive;

        this.downAtMe = false;
    }

    down(x: number, y: number) {
        if (this.inRect(x, y)) {
            this.setDrawRect(this.drawRectActive);
            this.downAtMe = true;
        } else {
            this.downAtMe = false;
        }
    }

    up(x: number, y: number): void {
        this.setDrawRect(this.drawRectNormal);
        if (this.inRect(x, y) && this.downAtMe) {
            this.onclick && this.onclick();
        }
        this.downAtMe = false;
    }
}
