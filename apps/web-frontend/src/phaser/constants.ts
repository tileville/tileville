export enum Scenes {
    Menu = "Menu",
    Load = "Load",
    Main = "Main",
}

export enum Maps {
    Main = "Main",
}

export const TILE_HEIGHT = 32;
export const TILE_WIDTH = 32;

// contract offset so we don't overflow
export const ORIGIN_OFFSET = 100;

export const MAP_AMPLITUDE = 16;

export const EVENTS = {
    NETWORK_CONNECTION_FAILED: "NETWORK_CONNECTION_FAILED",
};


export const NETWORK_LAYER_KEY = "NETWORK_LAYER"