import { GameObjects } from "phaser";
import { Hex } from "./Hex";
import { HEX_HEIGHT } from "./constants";

export class ScorePopper extends GameObjects.BitmapText {
  points: number;
  hexes: Hex[];

  constructor(scene: Phaser.Scene, hexes: Hex[], points: number) {
    // find avg position
    let xSum = 0;
    let ySum = 0;
    for (const h of hexes) {
      xSum += h.x;
      ySum += h.y;
    }

    super(
      scene,
      xSum / hexes.length,
      ySum / hexes.length,
      "font",
      points > 0 ? "+" + String(points) : String(points),
      40
    );
    scene.add.existing(this);
    this.points = points;
    this.setScale(Math.max(1, 0.9 + 0.1 * points));
    this.setAlpha(0);
    this.setOrigin(0.5);
    this.setDepth(5);
    this.hexes = hexes;
  }

  pop() {
    this.setAlpha(1);
    this.scene.tweens.add({
      targets: this,
      props: {
        alpha: 0,
        y: this.y - HEX_HEIGHT * 2,
      },
      duration: 2000,
    });
  }
}
