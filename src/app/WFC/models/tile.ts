export enum TileState {
    ResolvedTile,
    UnresolvedTile
}

export type TileArgs = {
};

export abstract class Tile {
    constructor(args:TileArgs) {
        this.tileInit(args);
    }

    protected tileInit(args:TileArgs) {
    }

    public abstract get imageAddress():string;

    public abstract get upConnection():string[];
    public abstract get rightConnection():string[];
    public abstract get downConnection():string[];
    public abstract get leftConnection():string[];
}