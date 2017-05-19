import Paddle from './paddle';
import Ball from './ball';

const keyCodes = {
  up: 38,
  down: 40,
  w: 87,
  s: 83,
};

export default class Pong {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.leftPaddle = new Paddle(this, 0.01, 'left');
    this.rightPaddle = new Paddle(this, 0.01, 'right');
    this.ball = new Ball(this, 0.75, 0.25, 0.0035, 0.0035);

    this.leftScore = 0;
    this.rightScore = 0;

    this.keysPressed = [];

    window.addEventListener('resize', () => this.resize());
    this.resize();

    window.addEventListener('keydown', e => this.keydown(e));
    window.addEventListener('keyup', e => this.keyup(e));
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  keydown(e) {
    if (!this.keysPressed.includes(e.keyCode)) {
      this.keysPressed.push(e.keyCode);
    }
  }

  keyup(e) {
    if (this.keysPressed.includes(e.keyCode)) {
      this.keysPressed.splice(this.keysPressed.indexOf(e.keyCode), 1);
    }
  }

  score(side) {
    if (side === 'left') this.leftScore += 1;
    else this.rightScore += 1;
  }

  draw() {
    const size = [this.canvas.width, this.canvas.height];
    this.ctx.clearRect(0, 0, ...size);

    this.leftPaddle.draw(this.ctx, size);
    this.rightPaddle.draw(this.ctx, size);
    this.ball.draw(this.ctx, size);

    this.ctx.font = '100px monospace';
    this.ctx.fillText(this.leftScore, 10, 110);
    const rightX = size[0] - 10 - this.ctx.measureText(this.rightScore).width;
    this.ctx.fillText(this.rightScore, rightX, 110);
  }

  step() {
    // Move ball
    this.ball.step([this.canvas.width, this.canvas.height], [this.leftPaddle, this.rightPaddle]);
    // Move paddles
    if (this.keysPressed.includes(keyCodes.up)) this.rightPaddle.up();
    if (this.keysPressed.includes(keyCodes.down)) this.rightPaddle.down();
    if (this.keysPressed.includes(keyCodes.w)) this.leftPaddle.up();
    if (this.keysPressed.includes(keyCodes.s)) this.leftPaddle.down();
  }

  start() {
    this.interval = setInterval(() => {
      this.step();
      this.draw();
    }, 1000 / 60);
  }
}
