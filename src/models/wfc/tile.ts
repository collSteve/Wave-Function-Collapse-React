import { ReactNode } from "react";
import { Cord2D } from "../../utils/standard-models";

export enum TileState {
    ResolvedTile,
    UnresolvedTile
}

export type TileArgs = {
    imageAddress: string
};

export type RawTileArgs = TileArgs;

export type InstanceTileArgs = {
    rawTile: RawTile,
    rotation?:number,
};

export abstract class Tile {
    protected _imageAddress: string;

    constructor(args:TileArgs) {
        this._imageAddress = args.imageAddress;
    }

    public get imageAddress():string {
        return this.imageAddress
    }
}

export class RawTile extends Tile {
    private _tileId: string;

    constructor(args:RawTileArgs) {
        super(args)
        this._imageAddress = args.imageAddress;
        this._tileId = this.generateId();
    }

    private generateId():string {
        return ""; //stub
    }

    public set imageAddress(address:string) {
        this._imageAddress = address;
    }

    get tileId():string {
        return this.tileId
    }
}

export class InstanceTile extends Tile {
    private _rawTileId:string;

    constructor(args:InstanceTileArgs) {
        super(InstanceTile.convertArgs2TileArgs(args));
        this._rawTileId = args.rawTile.tileId;
    }

    public static convertArgs2TileArgs(args:InstanceTileArgs):TileArgs {
        return {
            imageAddress: args.rawTile.imageAddress
        };
    }
}