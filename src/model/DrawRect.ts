/**
 * 绘制辅助对象
 */
export default class DrawRect {
    img: HTMLImageElement;
    sx: number;
    sy: number;
    sw: number;
    sh: number;

    constructor(img: HTMLImageElement, sx = 0, sy = 0, sw = 0, sh = 0) {
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.sw = sw;
        this.sh = sh;
    }
}
