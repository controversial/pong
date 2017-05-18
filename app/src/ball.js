export default class Ball {
  constructor(parent, x, y, vx, vy) {
    this.parent = parent;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  bounceX() {
    this.vx *= -1;
  }

  bounceY() {
    this.vy *= -1;
  }

  step(size, paddles) {
    const minx = (this.x + this.vx < 0) && (this.vx < 0);
    const miny = (this.y + this.vy < 0) && (this.vy < 0);
    const maxx = (this.x + this.vx > 1) && (this.vx > 0);
    const maxy = (this.y + this.vy > 1) && (this.vy > 0);

    // Bounce off walls
    if (minx || maxx) this.bounceX();
    if (miny || maxy) this.bounceY();

    // Bounce off paddles
    paddles.forEach((paddle) => {
      const velocityMatches = paddle.side === 'left' ? this.vx < 0 : this.vx > 0;
      if (paddle.collidesWith(size, this) && velocityMatches) this.bounceX();
    });

    // Scores
    if (minx) this.parent.score('right'); // If ball hits left wall, right gets a point
    if (maxx) this.parent.score('left');  // If ball hits right wall, left gets a point

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx, size) {
    ctx.fillStyle = 'white';
    ctx.fillRect((size[0] * this.x) - 5, (size[1] * this.y) - 5, 10, 10);
  }
}
