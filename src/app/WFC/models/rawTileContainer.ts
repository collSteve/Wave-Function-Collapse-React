import { RawTile, RawTileArgs } from "./rawTile";

export interface IRawTileContainer extends Iterable<RawTile> {
    getTileById(id:string):RawTile;
    defaultTileId: string;
}

export class RawTileContainer implements IRawTileContainer {
    private _defaultTile: RawTile|null = null;
    private idTileMap: Map<string,RawTile>;

    constructor() {
        this.idTileMap = new Map();
    }

    [Symbol.iterator](): Iterator<RawTile, any, undefined> {
        return this.idTileMap.values();
    }

    get defaultTileId(): string {
        return this.defaultTile.tileId;
    }

    get defaultTile(): RawTile {
        if (this._defaultTile) {
            return this._defaultTile;
        }
        throw new Error("Default tile does not exist in raw tile container.")
    }

    setDefaultTileById(id: string) {
        this._defaultTile = this.getTileById(id);
    }

    addDefaultTile(args: RawTileArgs) {
        const id = this.addTile(args);
        this.setDefaultTileById(id);
    }

    public addTile(args: RawTileArgs): string {
        const rawTile = new RawTile(args);
        this.idTileMap.set(rawTile.tileId, rawTile);
        return rawTile.tileId;
    }

    public getTileById(id: string): RawTile {
        const rawTile = this.idTileMap.get(id);
        if (rawTile) {
            return rawTile;
        }
        throw new Error(`Rawtile with id <${id}> does not exist.`);
    }
}