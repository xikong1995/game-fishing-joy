import share from '../config/share';

export const loadImgs = (json: any, fn: Function) => {
    let res: any = {};
    let complete = 0;
    let total = 0;
    for (const [key, value] of Object.entries(json)) {
        total++;
        const oImg = new Image();
        res[key] = oImg;
        oImg.onload = () => {
            complete++;
            if (complete === total) {
                share.imgs = res;
                fn();
            }
        };
        oImg.onerror = function () {
            throw new Error('图片加载失败' + oImg.src);
        };
        oImg.src = String(value);
    }
};

export const a2d = (n: number) => {
    return (n * 180) / Math.PI;
};

export const d2a = (n: number) => {
    return (n * Math.PI) / 180;
};

export const noop = () => {};

export const throttle = (fn: Function, delay = 1000) => {
    let last = 0;

    return function (this: unknown, ...arg: any) {
        const ctx = this;
        if (last === 0) {
            last = Date.now();
            fn.call(ctx, arg);
        } else if (Date.now() - last >= delay) {
            last = Date.now();
            fn.call(ctx, arg);
        }
    };
};

export const rnd = (m: number, n: number) => {
    if (m > n) {
        throw new Error('M must greater than or equal to m');
    }
    return Math.floor(Math.random() * (n - m + 1) + m);
};
