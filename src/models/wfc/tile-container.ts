import { Cord2D } from "../../utils/standard-models";
import { InstanceTile, InstanceTileArgs, RawTile, RawTileArgs } from "./tile";

export interface IRawTileContainer extends Iterable<RawTile> {
    getTileById(id:string):RawTile;
}

export class RawTileContainer implements IRawTileContainer {
    private idTileMap: Map<string,RawTile>;

    constructor() {
        this.idTileMap = new Map();
    }

    [Symbol.iterator](): Iterator<RawTile, any, undefined> {
        return this.idTileMap.values();
    }

    public addTile(args: RawTileArgs) {
        const rawTile = new RawTile(args);
        this.idTileMap.set(rawTile.tileId, rawTile);
    }

    public getTileById(id: string): RawTile {
        const rawTile = this.idTileMap.get(id);
        if (rawTile) {
            return rawTile;
        }
        throw new Error(`Rawtile with id <${id}> does not exist.`);
    }
}

export interface Instance2DGridArgs {
    height: number,
    width: number,
    rawTileContainer:IRawTileContainer
}


export interface IInstanceTileContainer2D extends Iterable<InstanceTile> {
    getTileByPose(pos:Cord2D):InstanceTile;
}

export class InstanceTileContainer2D implements IInstanceTileContainer2D {
    private idTileMap: Map<string,InstanceTile[]>;
    private poseTileMap: Map<Cord2D,InstanceTile>;
    private rawTileContainer: IRawTileContainer;

    private height: number;
    private width: number;

    constructor(args:Instance2DGridArgs) {
        this.idTileMap = new Map();
        this.poseTileMap = new Map();

        this.rawTileContainer = args.rawTileContainer;
        this.height = args.height;
        this.width = args.width;
    }

    [Symbol.iterator](): Iterator<InstanceTile, any, undefined> {
        return this.poseTileMap.values();
    }

    public addTileByRawId(pos:Cord2D, rawTileId: string) {
        const rawTile = this.rawTileContainer.getTileById(rawTileId);
        const args:InstanceTileArgs = {
            rawTile: rawTile
        }

        this.addTileByArgs(pos, args);
    }

    public addTileByArgs(pos: Cord2D, args: InstanceTileArgs) {
        const tile = new InstanceTile(args);

        this.poseTileMap.set(pos, tile);

        const tileList = this.idTileMap.get(tile.rawTileId);
        tileList ? tileList.push(tile) : this.idTileMap.set(tile.rawTileId, [tile]);
    }

    getTileByPose(pos:Cord2D): InstanceTile {
        const tile = this.poseTileMap.get(pos);
        if (tile) {
            return tile;
        }
        throw new Error(`Instance tile with at position ${pos} does not exist.`);
    }
}