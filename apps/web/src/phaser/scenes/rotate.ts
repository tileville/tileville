import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

export class RotateScene extends Phaser.Scene {
  constructor() {
    super("rotate");
  }

  create() {
    const text = this.add
      .text(400, 300, "Please rotate your device", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const button = this.add
      .text(400, 400, "Rotate", {
        fontSize: "24px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5)
      .setInteractive();

    button.on("pointerdown", () => {
      if (screen.orientation && (screen.orientation as any).lock) {
        (screen.orientation as any).lock("landscape").catch((error: any) => {
          console.error("Failed to lock orientation:", error);
        });
      }
    });
  }
}
