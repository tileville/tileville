export class Trihex {
    hexes: number[];
    shape: string;

    constructor(color1: number, color2: number, color3: number, shape: string) {
        this.hexes = [color1, color2, color3];
        this.shape = shape;
    }

    rotateRight() {
        if (this.shape === "a") {
            this.shape = "v";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[1];
            this.hexes[1] = temp;
        } else if (this.shape === "v") {
            this.shape = "a";
            const temp = this.hexes[1];
            this.hexes[1] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "\\") {
            this.shape = "/";
        } else if (this.shape === "/") {
            this.shape = "-";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "-") {
            this.shape = "\\";
        } else if (this.shape === "c") {
            this.shape = "r";
        } else if (this.shape === "r") {
            this.shape = "n";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "n") {
            this.shape = "d";
        } else if (this.shape === "d") {
            this.shape = "j";
        } else if (this.shape === "j") {
            this.shape = "l";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "l") {
            this.shape = "c";
        }
    }
    rotateLeft() {
        if (this.shape === "a") {
            this.shape = "v";
            const temp = this.hexes[1];
            this.hexes[1] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "v") {
            this.shape = "a";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[1];
            this.hexes[1] = temp;
        } else if (this.shape === "\\") {
            this.shape = "-";
        } else if (this.shape === "/") {
            this.shape = "\\";
        } else if (this.shape === "-") {
            this.shape = "/";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "c") {
            this.shape = "l";
        } else if (this.shape === "r") {
            this.shape = "c";
        } else if (this.shape === "n") {
            this.shape = "r";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        } else if (this.shape === "d") {
            this.shape = "n";
        } else if (this.shape === "j") {
            this.shape = "d";
        } else if (this.shape === "l") {
            this.shape = "j";
            const temp = this.hexes[0];
            this.hexes[0] = this.hexes[2];
            this.hexes[2] = temp;
        }
    }
}
