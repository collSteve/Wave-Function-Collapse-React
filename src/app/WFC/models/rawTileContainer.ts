import { MetricDirection2D } from "../../../utils/enums";
import { ConnectorTileMap, IdDirData } from "./connector-tile-map";
import { RawTile, RawTileArgs } from "./rawTile";

export interface IRawTileContainer extends Iterable<[string,RawTile]> {
    getTileById(id:string):RawTile;
    defaultTileId: string;
    nonDefaultRawTileIds: string[];
    getAllConnectableTilesId(id: string, direction: MetricDirection2D): IdDirData[]
}

export class RawTileContainer implements IRawTileContainer {
    private _defaultTile: RawTile|null = null;
    private idTileMap: Map<string,RawTile>;
    private connectorTileMap: ConnectorTileMap;

    constructor() {
        this.idTileMap = new Map();
        this.connectorTileMap = new ConnectorTileMap(this);
    }

    reset() {
        this.idTileMap = new Map();
        this.connectorTileMap = new ConnectorTileMap(this);
    }

    [Symbol.iterator](): Iterator<[string,RawTile]> {
        return this.idTileMap[Symbol.iterator]();
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

    get nonDefaultRawTileIds(): string[] {
        const ids = [];
        for (const [rawTileId, tile] of this.idTileMap) {
            if (rawTileId !== this.defaultTileId) {
                ids.push(rawTileId);
            }
        }
        return ids;
    }

    setDefaultTileById(id: string) {
        this._defaultTile = this.getTileById(id);
    }

    addDefaultTile(args: RawTileArgs) {
        const id = this.addTile(args);
        this.setDefaultTileById(id);
        return id;
    }

    public addTile(args: RawTileArgs): string {
        const rawTile = new RawTile(args);
        this.idTileMap.set(rawTile.tileId, rawTile);
        return rawTile.tileId;
    }

    public addTileByImageAddress(address:string): string {
        const args: RawTileArgs = {
            imageAddress: address
        }

        return this.addTile(args);
    }

    public get idMap(): Map<string,RawTile> {
        return this.idTileMap;
    }

    public getTileById(id: string): RawTile {
        const rawTile = this.idTileMap.get(id);
        if (rawTile) {
            return rawTile;
        }
        throw new Error(`Rawtile with id <${id}> does not exist.`);
    }

    public getImageById(id: string) {
        return this.getTileById(id).image;
    }

    public getAllConnectableTilesId(id: string, direction: MetricDirection2D): IdDirData[] {
        
        return this.connectorTileMap.getAllConnectableTiles(id, direction);
    }

    /**
     * for constructing connectoir map from rawTile in container
     * This method need to be called every time a new change to raw tiles connectors 
     * (add a new raw tile, update rawtile connectors)
     */
    public initializaConnectorTileMap() {
        this.connectorTileMap.init(this);
    }
}