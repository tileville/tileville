import { GameObjects } from "phaser";
export class Hex extends GameObjects.Image {
  row: number;
  col: number;
  hexType: number;
  hasHill: boolean;

  counted: boolean;
  upgraded: boolean;

  puffer: Phaser.GameObjects.Particles.ParticleEmitter;
  // streets and ports are counted when they're connected to the city center
  // parks are counted in batches of 3, check when new ones are added to the group
  // watch towers are counted when placed; and can be uncounted if a new one is placed

  eEdge: Phaser.GameObjects.Image;
  neEdge: Phaser.GameObjects.Image;
  nwEdge: Phaser.GameObjects.Image;
  wEdge: Phaser.GameObjects.Image;
  swEdge: Phaser.GameObjects.Image;
  seEdge: Phaser.GameObjects.Image;
  edges: Phaser.GameObjects.Group;
  propeller: Phaser.GameObjects.Image;
  goldCoins: Phaser.GameObjects.Image[] = [];
  fishSprite: Phaser.GameObjects.Sprite | null = null;
  waterfallSprite: Phaser.GameObjects.Sprite | null = null;
  volcanoSprite: Phaser.GameObjects.Sprite | null = null;
  sheepSprite: Phaser.GameObjects.Sprite | null = null;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    row: number,
    col: number
  ) {
    super(scene, x, y, "empty");

    this.setScale(0.5);
    scene.add.existing(this);
    // this.setTint(0xd6d1b1)
    this.row = row;
    this.col = col;
    this.hexType = 0;
    this.hasHill = false;
    this.counted = false;
    this.upgraded = false;

    this.eEdge = scene.add.image(x, y, "edge-e");
    this.neEdge = scene.add.image(x, y, "edge-ne");
    this.nwEdge = scene.add.image(x, y, "edge-nw");
    this.wEdge = scene.add.image(x, y, "edge-w");
    this.swEdge = scene.add.image(x, y, "edge-sw");
    this.seEdge = scene.add.image(x, y, "edge-se");
    this.edges = scene.add.group([
      this.eEdge,
      this.neEdge,
      this.nwEdge,
      this.wEdge,
      this.swEdge,
      this.seEdge,
    ]);
    this.edges.setDepth(1);
    this.edges.setAlpha(1);

    this.eEdge.setScale(0.5);
    this.neEdge.setScale(0.5);
    this.nwEdge.setScale(0.5);
    this.wEdge.setScale(0.5);
    this.swEdge.setScale(0.5);
    this.seEdge.setScale(0.5);

    this.propeller = scene.add.image(x, y, "propeller");
    this.propeller.setScale(0.5);
    this.propeller.setVisible(false);
    this.propeller.setDepth(2);

    this.puffer = scene.add.particles(0, 0, "particle", {
      lifespan: 1000,
      speed: { min: 3, max: 20 },
      angle: { min: 0, max: 360 },
      scale: 2,
      quantity: 20,
      emitting: false,
      alpha: { start: 1, end: 0 },
      emitZone: {
        type: "random",
        source: new Phaser.Geom.Rectangle(-25, -25, 50, 50),
        quantity: 20,
      },
    });
    this.puffer.setDepth(1);
  }

  puff() {
    this.puffer.emitParticleAt(this.x, this.y, 10);
  }

  setX(x: number) {
    super.setX(x);
    this.eEdge.setX(x);
    this.neEdge.setX(x);
    this.nwEdge.setX(x);
    this.wEdge.setX(x);
    this.swEdge.setX(x);
    this.seEdge.setX(x);
    this.propeller.setX(x);
    return this;
  }

  setY(y: number) {
    super.setY(y);
    this.eEdge.setY(y);
    this.neEdge.setY(y);
    this.nwEdge.setY(y);
    this.wEdge.setY(y);
    this.swEdge.setY(y);
    this.seEdge.setY(y);
    this.propeller.setY(y);
    return this;
  }

  embiggen() {
    this.eEdge.setScale(0.75);
    this.neEdge.setScale(0.75);
    this.nwEdge.setScale(0.75);
    this.wEdge.setScale(0.75);
    this.swEdge.setScale(0.75);
    this.seEdge.setScale(0.75);
    this.edges.setAlpha(1);
    this.edges.setDepth(5);
    this.propeller.setDepth(6);
    this.propeller.setScale(0.75);
    this.setScale(0.75);
  }

  setType(hexType: number) {
    this.setTexture(
      ["empty", "windmill", "grass", "street", "center", "port-bw", "farm"][
        hexType
      ]
    );
    this.hexType = hexType;
    if (hexType === 1) {
      this.propeller.setVisible(true);
      if (this.hasHill) {
        this.propeller.setY(this.y - 70 * this.scale);
        this.setTexture("windmill-hill");
      } else {
        this.propeller.setY(this.y - 30 * this.scale);
      }
    } else {
      this.propeller.setVisible(false);
    }

    if (hexType === 1) {
      this.puffer.setParticleTint(0xffffff);
    } else if (hexType === 2) {
      this.puffer.setParticleTint(0x408a0f);
    } else if (hexType === 3) {
      this.puffer.setParticleTint(0xae482c);
    } else if (hexType === 5) {
      this.puffer.setParticleTint(0x3b80a6);
    } else if (hexType === 6) {
      this.puffer.setVisible(false);
    }

    // TODO: Uncomment this while making pond map
    // if (hexType === 6) {
    //   // Assuming 3 is the road type
    //   this.addFishAnimation();
    // } else {
    //   this.removeFishAnimation();
    // }

    if (hexType === 5) {
      this.eEdge.setVisible(false);
      this.neEdge.setVisible(false);
      this.seEdge.setVisible(false);
      this.wEdge.setVisible(false);
      this.nwEdge.setVisible(false);
      this.swEdge.setVisible(false);
    }
  }

  initiateGoldMineAnimation() {
    if (this.hexType === 6) {
      this.createGoldMineAnimation();
    }
  }

  setHill(hasHill: boolean) {
    this.hasHill = hasHill;
    if (hasHill) this.setTexture("empty-hill");
  }

  upgrade() {
    this.upgraded = true;
    if (this.hexType === 2) {
      this.setTexture("tree");
    } else if (this.hexType === 3) {
      this.setTexture("house");
    } else if (this.hexType === 5) {
      this.setTexture("port");
    }
  }

  setSketchy(isSketchy: boolean) {
    if (isSketchy) {
      if (this.hexType === 0) {
        this.setTexture("empty");
      } else if (this.hexType === 1) {
        if (this.hasHill) this.setTexture("windmill-hill-bw");
        else this.setTexture("windmill-bw");
        this.propeller.setVisible(false);
      } else if (this.hexType === 2) {
        if (this.upgraded) this.setTexture("tree-bw");
        else this.setTexture("grass-bw");
      } else if (this.hexType === 3) {
        if (this.upgraded) this.setTexture("house-bw");
        else this.setTexture("street-bw");
      } else if (this.hexType === 4) {
        this.setTexture("center-bw");
      } else if (this.hexType === 5) {
        this.setTexture("port-bw");
      } else if (this.hexType === 6) {
        this.setTexture("mine-bw");
      }
    } else {
      this.setAlpha(1);
      if (this.hexType === 0) {
        this.setTexture("empty");
      } else if (this.hexType === 1) {
        if (this.hasHill) this.setTexture("windmill-hill");
        else this.setTexture("windmill");
        this.propeller.setVisible(true);
      } else if (this.hexType === 2) {
        if (this.upgraded) this.setTexture("tree");
        else this.setTexture("grass");
      } else if (this.hexType === 3) {
        if (this.upgraded) this.setTexture("house");
        else this.setTexture("street");
      } else if (this.hexType === 4) {
        this.setTexture("center");
      } else if (this.hexType === 5) {
        if (this.upgraded) this.setTexture("port");
        else this.setTexture("port-bw");
      } else if (this.hexType === 6) {
        this.setTexture("mine-bw");
      }
    }
  }

  createGoldMineAnimation() {
    const coinCount = 10;
    const duration = 900;

    for (let i = 0; i < coinCount; i++) {
      const coin = this.scene.add.image(this.x, this.y, "gold-coin");
      coin.setDepth(this.depth + 1);
      coin.setScale(0.1);
      this.goldCoins.push(coin);

      const angle = Phaser.Math.Between(0, 360);
      const distance = Phaser.Math.Between(0, 50);

      const endX = this.x + distance * Math.cos((angle * Math.PI) / 90);
      const endY = this.y + distance * Math.sin((angle * Math.PI) / 90);

      // Animate each coin
      this.scene.tweens.add({
        targets: coin,
        x: endX,
        y: endY,
        scaleX: 0.1,
        scaleY: 0.1,
        angle: Phaser.Math.Between(-720, 720),
        duration: duration,
        ease: "Quad.out",
        onComplete: () => {
          this.scene.tweens.add({
            targets: coin,
            y: "+=50",
            alpha: 0,
            scaleX: 0.02,
            scaleY: 0.02,
            angle: "+=180",
            duration: 500,
            ease: "Quad.in",
            onComplete: () => {
              coin.destroy();
              const index = this.goldCoins.indexOf(coin);
              if (index > -1) {
                this.goldCoins.splice(index, 1);
              }
            },
          });
        },
      });
    }

    this.scene.sound.play("place", { volume: 0.5 });
  }

  // TODO: Uncomment this while making pond map
  // addFishAnimation() {
  //   if (!this.fishSprite) {
  //     this.fishSprite = this.scene.add.sprite(this.x, this.y, "fish");
  //     this.fishSprite.setScale(0.2); // Adjust scale as needed
  //     this.fishSprite.play("swim");
  //     this.scene.tweens.add({
  //       targets: this.fishSprite,
  //       y: this.y - 5,
  //       duration: 1000,
  //       yoyo: true,
  //       repeat: -1,
  //       ease: "Sine.easeInOut",
  //     });
  //   }
  // }

  // removeFishAnimation() {
  //   if (this.fishSprite) {
  //     this.fishSprite.destroy();
  //     this.fishSprite = null;
  //   }
  // }

  // addWaterfallAnimation() {
  //   if (!this.waterfallSprite) {
  //     this.waterfallSprite = this.scene.add.sprite(this.x, this.y, "waterfall");
  //     this.waterfallSprite.setScale(0.3);
  //     this.waterfallSprite.setDepth(this.depth + 1);
  //     this.waterfallSprite.play("waterfall_anim");
  //   }
  // }

  // removeWaterfallAnimation() {
  //   if (this.waterfallSprite) {
  //     this.waterfallSprite.destroy();
  //     this.waterfallSprite = null;
  //   }
  // }

  // addVolcanoAnimation() {
  //   if (!this.volcanoSprite) {
  //     this.volcanoSprite = this.scene.add.sprite(this.x, this.y, "waterfall");
  //     this.volcanoSprite.setScale(0.115);
  //     this.volcanoSprite.setDepth(this.depth + 1);
  //     this.volcanoSprite.play("volcano_anim");
  //   }
  // }

  // removeVolcanoAnimation() {
  //   if (this.volcanoSprite) {
  //     this.volcanoSprite.destroy();
  //     this.volcanoSprite = null;
  //   }
  // }

  addSheepAnimation(x: number, y: number , startFrame: number) {
    this.sheepSprite = this.scene.add.sprite(x, y, "sheep").setOrigin(0.5, 0.5);
    this.sheepSprite.setScale(0.2);
    this.sheepSprite.setDepth(this.depth + 1);
    this.sheepSprite.play("sheep_anim");
    this.sheepSprite.anims.currentAnim && this.sheepSprite.anims.setCurrentFrame(this.sheepSprite.anims.currentAnim.frames[startFrame]);
  }

  removeSheepAnimation() {
    if (this.sheepSprite) {
      this.sheepSprite.destroy();
      this.sheepSprite = null;
    }
  }

  update(_: number, delta: number) {
    if (this.propeller.visible) {
      const speed = this.hasHill && this.counted ? 2.2 : this.counted ? 1 : 0.1;
      this.propeller.setAngle(this.propeller.angle + speed * 0.1 * delta);
    }

    if (this.fishSprite) {
      this.fishSprite.update(12, delta);
    }

    if (this.waterfallSprite) {
      this.waterfallSprite.update(12, delta);
    }
  }
}
