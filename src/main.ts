import "normalize.css";
import "./css/main.less";

import Fish from "./model/Fish";
import Cannon from "./model/Cannon";
import Sprite from "./model/Sprite";
import DrawRect from "./model/DrawRect";
import Button from "./model/Button";

import { loadImgs, a2d, throttle, rnd } from "./utils/helper";
import share from "./config/share";
import { RESOURCE, FISH_MAX_COUNT, COIN_COORDINATE } from "./config/constant";
import Bullet from "./model/Bullet";
import Coin from "./model/Coin";
import Score from "./model/Score";
import Web from "./model/Web";
import TipScore from "./model/TipScore";

const canvas: HTMLCanvasElement | null = document.querySelector("canvas");
const audio: HTMLAudioElement | null = document.querySelector("audio");
if (canvas === null || audio === null) {
  throw new Error("Canvas or audio not exist");
}
const gd: CanvasRenderingContext2D | null = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const init = () => {
  // 炮台
  const tower = new Sprite(
    new DrawRect(share.imgs.bottom, 0, 0, 765, 72),
    400,
    canvasHeight - 34
  );
  // 炮弹
  const cannon = new Cannon(0, 443, 568, 0);
  // 切换炮弹减号
  const btnMinus = new Button(
    new DrawRect(share.imgs.bottom, 135, 75, 36, 28),
    new DrawRect(share.imgs.bottom, 91, 75, 36, 28),
    371,
    566
  );
  btnMinus.onclick = () => {
    cannon.type > 0 ? cannon.setType(cannon.type - 1) : cannon.setType(6);
  };
  // 切换炮弹加号
  const btnPlus = new Button(
    new DrawRect(share.imgs.bottom, 47, 75, 36, 28),
    new DrawRect(share.imgs.bottom, 3, 75, 36, 28),
    516,
    566
  );
  btnPlus.onclick = () => {
    cannon.type < 6 ? cannon.setType(cannon.type + 1) : cannon.setType(0);
  };
  // 子弹集合
  let bullets: Array<Bullet> = [];
  // 鱼集合
  let fishes: Array<Fish> = [];
  // 是否开炮
  let isFired = false;
  // 金币集合
  let coins: Array<Coin> = [];
  // 得分
  let scoreValue = 0;
  // 分数集合
  let scores: Array<Score> = [];
  for (let i = 0; i < 6; i++) {
    scores.push(new Score(i));
  }
  // 提示得分集合
  let tipScores: Array<TipScore> = [];
  // 网合集
  let webs: Array<Web> = [];

  const initEvent = () => {
    if (canvas === null) {
      throw new Error("Canvas not exist");
    }
    // 控制炮弹发射方向
    canvas.addEventListener("mousemove", (e) => {
      const x = e.offsetX - cannon.x;
      const y = e.offsetY - cannon.y;
      // y轴是反的，所以角度需要加上90
      const angle = a2d(Math.atan2(y, x)) + 90;
      cannon.rotation = angle;
    });
    // 切换炮弹的按钮
    const btns = [btnMinus, btnPlus];
    // 发射炮弹
    const fire = throttle(() => {
      isFired = true;
      const bullet = new Bullet(
        cannon.type,
        cannon.x,
        cannon.y,
        cannon.rotation
      );
      bullets.push(bullet);
      audio.load();
      audio.play();
    }, 500);
    // 鼠标按下
    canvas.addEventListener("mousedown", (e) => {
      let isInBtn = false;
      btns.forEach((btn) => {
        btn.down(e.offsetX, e.offsetY);
        if (btn.inRect(e.offsetX, e.offsetY)) {
          isInBtn = true;
        }
      });
      !isInBtn && fire();
    });
    // 鼠标抬起
    canvas.addEventListener("mouseup", (e) => {
      btns.forEach((btn) => {
        btn.up(e.offsetX, e.offsetY);
      });
    });
  };

  const generatorFish = () => {
    if (rnd(1, 20) === 1 && fishes.length < FISH_MAX_COUNT) {
      const fish = new Fish(rnd(0, 4));
      fish.y = rnd(fish.height, canvasHeight - 100);
      if (rnd(0, 2) === 0) {
        fish.x = -100;
        fish.rotation = 90;
      } else {
        fish.x = canvasWidth + 100;
        fish.rotation = -90;
      }
      fishes.push(fish);
    }
  };

  const drawScore = (gd: CanvasRenderingContext2D) => {
    let scoreStr = scoreValue + "";
    while (scoreStr.length < 6) {
      scoreStr = "0" + scoreStr;
    }
    scores.forEach((item, index) => {
      item.setDrawRect(
        new DrawRect(
          share.imgs.number,
          0,
          24 * (9 - Number(scoreStr[index])),
          20,
          24
        )
      );
      item.draw(gd);
    });
  };

  // fps 相关
  let frames = 60;
  let lastTime = 0;
  const fpsDom = document.getElementById("fps");

  const refresh = () => {
    if (gd === null || canvas === null) {
      throw new Error("Canvas or context not exit");
    }
    // 计算 fps
    const now = performance.now();
    if (lastTime === 0 || now - 1000 > lastTime) {
      fpsDom && (fpsDom.innerHTML = `FPS：${frames}`);
      lastTime = now;
      frames = 0;
    } else {
      frames++;
    }
    // 产生鱼
    generatorFish();
    // 清除画布
    gd.clearRect(0, 0, canvasWidth, canvasHeight);
    // 绘制金币
    coins = coins.filter((item) => {
      item.move(COIN_COORDINATE.x, COIN_COORDINATE.y);
      item.nextFrame();
      item.draw(gd);
      if (
        Math.abs(item.x - COIN_COORDINATE.x) < 5 &&
        Math.abs(item.y - COIN_COORDINATE.y) < 5
      ) {
        scoreValue += 10;
        return false;
      }
      return true;
    });
    // 绘制炮塔
    tower.draw(gd);
    // 绘制鱼
    fishes = fishes.filter((item) => {
      item.swing();
      item.move();
      item.nextFrame();
      item.draw(gd);
      return !item.outOfRect(-100, -100, canvasWidth + 100, canvasHeight + 100);
    });
    // 绘制网
    webs = webs.filter((item) => {
      item.scale();
      item.draw(gd);
      if (item.scaleX > 1 && item.scaleY > 1) {
        return false;
      }
      return true;
    });
    // 绘制炮弹
    bullets = bullets.filter((item) => {
      item.move();
      item.draw(gd);
      return !item.outOfRect(-100, -100, canvasWidth + 100, canvasHeight + 100);
    });
    // 绘制炮管
    if (isFired && cannon.nextFrame()) {
      isFired = false;
    }
    cannon.draw(gd);
    // 绘制切换炮管的按钮
    btnMinus.draw(gd);
    btnPlus.draw(gd);
    // 绘制分数
    drawScore(gd);
    // 绘制提示得分
    tipScores = tipScores.filter((item) => {
      item.move(item.distX, item.distY);
      item.draw(gd);
      if (Math.abs(item.y - item.distY) < 5) {
        return false;
      }
      return true;
    });
    // 碰撞检测
    fishes.forEach((fish) => {
      if (fish.isDead) {
        return;
      }
      bullets = bullets.filter((bullet) => {
        if (!fish.collTest(bullet)) {
          return true;
        }
        // 碰撞并且满足随机概率
        if (Math.random() < ((bullet.type + 1) * 10) / (10 + fish.type * 20)) {
          // 鱼死了
          fish.isDead = true;
          fish.speed = 0;
          setTimeout(() => {
            fishes = fishes.filter((item) => item !== fish);
            const fishScore = fish.type + 1;
            // 提示得分
            [fishScore, 0, 10].forEach((item, index) => {
              const tipScore = new TipScore(item, index, fish.x, fish.y);
              tipScore.setDist(tipScore.x, tipScore.y - 40);
              tipScores.push(tipScore);
            });
            // 产生金币
            let count = fishScore;
            const timer = setInterval(() => {
              const newCoin = new Coin(1, fish.x, fish.y, 0);
              coins.push(newCoin);
              if (--count === 0) {
                clearInterval(timer);
              }
            }, 100);
          }, 1000);
        }
        // 增加网
        webs.push(new Web(bullet.type, fish.x, fish.y));
        // 清除碰撞的炮弹
        return false;
      });
    });

    requestAnimationFrame(refresh);
  };

  initEvent();

  requestAnimationFrame(refresh);
};

loadImgs(RESOURCE, init);
