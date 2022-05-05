import share from '../config/share';
import DrawRect from './DrawRect';
import Sprite from './Sprite';

/**
 * 得分。左下方显示
 */
export default class Score extends Sprite {
    constructor(index: number) {
        super(new DrawRect(share.imgs.number, 0, 24 * 9, 20, 24), 48 + 23 * index, 586, 0);
    }
}
