export default class Paddle {
  // Side should be 'left' or 'right'
  constructor(parent, sensitivity, side) {
    this.parent = parent;
    this.sensitivity = sensitivity;
    this.side = side;
    this.y = 0.5;
  }

  draw(ctx, size) {
    const x = this.side === 'left' ? 20 : size[0] - 30;
    const y = this.y * size[1];
    ctx.fillRect(x, y - 50, 10, 100);
  }

  up() {
    if (this.y > 0) {
      this.y -= this.sensitivity;
      this.parent.draw();
    }
  }

  down() {
    if (this.y < 1) {
      this.y += this.sensitivity;
      this.parent.draw();
    }
  }

  boundingBox(size) {
    const x = this.side === 'left' ? 25 : size[0] - 25;
    const y = this.y * size[1];
    return {
      left: x - 5,
      top: y - 50,
      right: x + 5,
      bottom: y + 50,
      width: 10,
      height: 100,
    };
  }

  collidesWith(size, ball) {
    const bb = this.boundingBox(size);
    const x = ball.x * size[0];
    const y = ball.y * size[1];
    return x > bb.left && x < bb.right && y > bb.top && y < bb.bottom;
  }
}
