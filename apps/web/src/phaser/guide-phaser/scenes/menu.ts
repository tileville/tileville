import { HexGrid } from "@/phaser/hex-grid";
import { Button } from "@/phaser/util";
import { Scene, GameObjects } from "phaser";

const tutorialTexts = [
  "TileVille is city development Arcade game \nwhere you join a competition to play\nthe game and build your city.\n\nEvery competition have a associated\nparticipation fees and rewards.",
  "Place trios of hexes to grow your city\noutward from the Center\n\n\nTry to get the highest score you can!",
  "ROAD hexes are worth 1 point each\nif they're connected to the Center\n\nAdditionally, every Port that you\nconnect to the Center with\nRoads is worth 3 points!",
  "Wind Mills are worth 1 point if\nthey're not adjacent to any other\nWind Mills\n\nIf they're also placed on a HILL,\nthey're worth 3 points!",
  "Those are PARKS!\n\nEach group of connected Park hexes is\nworth 5 points for every 3 hexes in it",
  "Yep! To recap:\n- Roads want to connect Ports to\nthe Center\n- Wind Mills want to be alone and\non Hills\n- Parks want to be grouped together\nin multiples of 3",
];

const tutorialTypes = [
  [1, 2, 3, 4, 5],
  [1, 2, 3, 4, 5],
  [3, 4, 5],
  [1],
  [2],
  [1, 2, 3, 4, 5],
];

export class MenuScene extends Scene {
  menu: GameObjects.Group | null = null;
  background: GameObjects.Image | null = null;
  tutorialGrid: HexGrid = {} as HexGrid;
  tutorialText: GameObjects.BitmapText | null = null;
  tutorialPage = 0;
  nextArrowBtn: Button | null = null;
  previousArrowBtn: Button | null = null;
  constructor() {
    super("menu");
  }

  create() {
    this.cameras.main.setBounds(-1280, 0, 3840, 720);
    this.cameras.main.setBackgroundColor("rgba(0 , 0 , 0 , 0)");
    this.menu = this.add.group();

    const map_pattern = this.add.image(920, 360, "map_pattern");
    map_pattern.setScale(0.05);
    map_pattern.setAlpha(0.3);

    const title = this.add.text(100, 150, "A Tour To Game", {
      fontFamily: "monospace",
      fontSize: "40px",
      color: "#000",
    });
    title.setTint(0xffffff);
    this.menu.add(title);

    // From Below will be used in the Guide section
    const letsGoBtn = this.add.image(250, 300, "letsGoBtn").setScale(0.5);
    letsGoBtn.setInteractive({ useHandCursor: true });
    letsGoBtn.on("pointerdown", () => this.howToPlay());

    letsGoBtn.on("pointerover", () => {
      this.tweens.add({
        targets: letsGoBtn,
        scaleX: 0.55,
        scaleY: 0.55,
        duration: 60,
        ease: "Linear",
      });
    });
    letsGoBtn.on("pointerout", () =>
      this.tweens.add({
        targets: letsGoBtn,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 60,
        ease: "Linear",
      })
    );

    this.menu.add(letsGoBtn);

    const grid = new HexGrid(this, 3, 0, 700, 100);
    grid.grid.get(2, 2)!.setHill(true);
    grid.grid.get(4, 5)!.setHill(true);

    const tutorialGrid = [
      [null, null, null, 5, 3, 2, 5],
      [null, null, 2, 3, 2, 1, 3],
      [null, 2, 1, 3, 2, 3, 3],
      [5, 3, 2, 4, 2, 1, 5],
      [2, 2, 2, 3, 3, 1, null],
      [2, 2, 3, 1, 2, null, null],
      [5, 3, 3, 5, null, null, null],
    ];

    this.tutorialPage = 0;
    this.tutorialText = this.add.bitmapText(
      1280,
      200,
      "font",
      tutorialTexts[0],
      40
    );

    this.previousArrowBtn = new Button(
      this,
      1370,
      550,
      "next_arrow",
      this.backTutorialPage.bind(this)
    );
    this.previousArrowBtn.angle = 180;

    this.previousArrowBtn.setOrigin(0, 0.5);

    this.nextArrowBtn = new Button(
      this,
      1770,
      550,
      "next_arrow",
      this.nextTutorialPage.bind(this)
    );
    this.nextArrowBtn.setOrigin(0, 0.5);

    // this.tutorialButtonWatchTower.setOrigin(0, 0.5);

    for (let r = 0; r < tutorialGrid.length; r++) {
      for (let c = 0; c < tutorialGrid.length; c++) {
        if (grid.grid.has(r, c)) {
          grid.grid.get(r, c)!.setType(tutorialGrid[r][c]!);
        }
      }
    }

    grid.grid.get(0, 3)?.upgrade();
    grid.grid.get(0, 4)?.upgrade();
    grid.grid.get(0, 5)?.upgrade();
    grid.grid.get(1, 3)?.upgrade();
    grid.grid.get(1, 4)?.upgrade();
    grid.grid.get(1, 5)!.counted = true;
    grid.grid.get(2, 2)!.counted = true;
    grid.grid.get(2, 3)?.upgrade();
    grid.grid.get(2, 4)?.upgrade();
    grid.grid.get(3, 2)?.upgrade();
    grid.grid.get(4, 0)?.upgrade();
    grid.grid.get(4, 1)?.upgrade();
    grid.grid.get(4, 2)?.upgrade();
    grid.grid.get(4, 3)?.upgrade();
    grid.grid.get(4, 4)?.upgrade();
    grid.grid.get(5, 0)?.upgrade();
    grid.grid.get(5, 1)?.upgrade();
    grid.grid.get(5, 2)?.upgrade();
    grid.grid.get(5, 3)!.counted = true;
    grid.grid.get(6, 0)?.upgrade();
    grid.grid.get(6, 1)?.upgrade();
    grid.grid.get(6, 2)?.upgrade();
    grid.grid.get(6, 3)?.upgrade();

    grid.grid.get(0, 6)?.setVisible(false);
    grid.grid.get(3, 0)?.setVisible(false);
    grid.grid.get(3, 6)?.setVisible(false);

    grid.updateEdges();

    this.tutorialGrid = grid;
  }

  transition() {
    this.scene.start("main");
  }

  // Below code will be used in guide section
  howToPlay() {
    this.tutorialPage = -1;
    this.nextTutorialPage();
    this.cameras.main.pan(1270, 0, 1000, "Power2");

    this.tutorialGrid.grid.get(0, 6)?.setVisible(true);
    this.tutorialGrid.grid.get(3, 0)?.setVisible(true);
    this.tutorialGrid.grid.get(3, 6)?.setVisible(true);
  }

  nextTutorialPage() {
    this.tutorialPage += 1;
    if (this.tutorialPage >= tutorialTexts.length) {
      this.cameras.main.pan(640, 0, 1000, "Power2");
      this.tutorialGrid.grid.get(0, 6)?.setVisible(false);
      this.tutorialGrid.grid.get(3, 0)?.setVisible(false);
      this.tutorialGrid.grid.get(3, 6)?.setVisible(false);
    } else {
      this.tutorialText!.setText(tutorialTexts[this.tutorialPage]);
      for (const hex of this.tutorialGrid.hexes) {
        hex.setSketchy(
          tutorialTypes[this.tutorialPage].indexOf(hex.hexType) === -1
        );
      }
    }
  }

  backTutorialPage() {
    this.tutorialPage -= 1;
    if (this.tutorialPage < 0) {
      this.cameras.main.pan(640, 0, 1000, "Power2");
      this.tutorialGrid.grid.get(0, 6)?.setVisible(false);
      this.tutorialGrid.grid.get(3, 0)?.setVisible(false);
      this.tutorialGrid.grid.get(3, 6)?.setVisible(false);
    } else {
      this.tutorialText!.setText(tutorialTexts[this.tutorialPage]);
      for (const hex of this.tutorialGrid.hexes) {
        hex.setSketchy(
          tutorialTypes[this.tutorialPage].indexOf(hex.hexType) === -1
        );
      }
    }
  }

  update(time: number, delta: number) {
    for (const hex of this.tutorialGrid.hexes) {
      hex.update(time, delta);
    }
  }
}
