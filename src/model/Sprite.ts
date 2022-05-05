import { d2a } from '../utils/helper';
import DrawRect from './DrawRect';

/**
 * 模型基类，精灵图片
 */
export default class Sprite {
    drawRect: DrawRect;
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
    speed: number;
    scaleX: number;
    scaleY: number;
    radius: number;
    MAX_FRAME: number;
    curFrame: number;
    frameRate: number;
    frameRateNow: number;

    constructor(drawRect: DrawRect, x = 0, y = 0, rotation = 0) {
        this.drawRect = drawRect;
        this.width = drawRect.sw;
        this.height = drawRect.sh;

        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.speed = 0;
        this.curFrame = 0;
        this.MAX_FRAME = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.frameRate = 1;
        this.frameRateNow = 0;
        this.radius = 0;
    }

    inRect(x: number, y: number): boolean {
        if (
            x >= this.x - this.width / 2 &&
            x <= this.x + this.width / 2 &&
            y >= this.y - this.height / 2 &&
            y <= this.y + this.height / 2
        ) {
            return true;
        }
        return false;
    }

    setDrawRect(drawRect: DrawRect): void {
        this.drawRect = drawRect;
        this.width = drawRect.sw;
        this.height = drawRect.sh;
    }

    draw(gd: CanvasRenderingContext2D): void {
        gd.save();
        gd.translate(this.x, this.y);
        gd.rotate(d2a(this.rotation));
        gd.scale(this.scaleX, this.scaleY);
        gd.drawImage(
            this.drawRect.img,
            this.drawRect.sx,
            this.drawRect.sy + this.height * this.curFrame,
            this.width,
            this.height,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        gd.restore();
    }

    move(x: number | undefined = undefined, y: number | undefined = undefined): void {
        if (x !== undefined && y !== undefined) {
            this.x += ((x - this.x) * this.speed) / 100;
            this.y += ((y - this.y) * this.speed) / 100;
        } else {
            const arc = d2a(this.rotation);
            this.x = this.x + (this.speed * Math.sin(arc)) / 5;
            this.y = this.y - (this.speed * Math.cos(arc)) / 5;
        }
    }

    nextFrame(): boolean {
        this.frameRateNow++;
        // frameRate个时间循环时，切换下一帧
        if (this.frameRateNow === this.frameRate) {
            this.frameRateNow = 0;
            this.curFrame++;
            if (this.curFrame >= this.MAX_FRAME) {
                this.curFrame = 0;
                return true;
            }
            return false;
        }
        return false;
    }

    outOfRect(x: number, y: number, w: number, h: number): boolean {
        if (this.x < x || this.y < y || this.x > w || this.y > h) {
            return true;
        }
        return false;
    }

    collTest(other: Sprite): boolean {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2)) <= this.radius + other.radius;
    }
}
