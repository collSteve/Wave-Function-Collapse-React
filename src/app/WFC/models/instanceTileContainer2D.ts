import { MetricRotationAngle } from "../../../utils/enums";
import { Cord2D } from "../../../utils/standard-models";
import { ImageModel } from "../../shared/models/image";
import { IImageGrid } from "../../shared/template/image-grid/image-grid-component";
import { InstanceTile, InstanceTileArgs } from "./instanceTile";
import { IRawTileContainer } from "./rawTileContainer";

export interface Instance2DGridArgs {
    height: number,
    width: number,
    rawTileContainer:IRawTileContainer
}


export interface IInstanceTileContainer2D extends Iterable<InstanceTile> {
    getTileByPos(pos:Cord2D):InstanceTile;
}

export class InstanceTileContainer2D implements IInstanceTileContainer2D, IImageGrid {
    private idTileMap: Map<string,InstanceTile[]>;
    private poseTileMap: Map<string,InstanceTile>;
    private rawTileContainer: IRawTileContainer;

    private _height: number;
    private _width: number;

    constructor(args:Instance2DGridArgs) {
        this.idTileMap = new Map();
        this.poseTileMap = new Map();

        this.rawTileContainer = args.rawTileContainer;
        this._height = args.height;
        this._width = args.width;

        this.setup();
    }

    setup() {
        for (let x=0; x<this.width; x++) {
            for (let y=0; y< this.height; y++) {
                this.addTileByRawId(new Cord2D(x,y), this.rawTileContainer.defaultTileId);
            }
        }
    }

    [Symbol.iterator](): Iterator<InstanceTile, any, undefined> {
        return this.poseTileMap.values();
    }

    public get height() {
        return this._height;
    }

    public get width() {
        return this._width;
    }

    private addTileByRawId(pos:Cord2D, rawTileId: string) {
        const rawTile = this.rawTileContainer.getTileById(rawTileId);
        const args:InstanceTileArgs = {
            rawTile: rawTile
        }

        this.addTileByArgs(pos, args);
    }

    public addTileByArgs(pos: Cord2D, args: InstanceTileArgs) {
        const tile = new InstanceTile(args);

        this.poseTileMap.set(pos.toString(), tile);

        const tileList = this.idTileMap.get(tile.rawTileId);
        tileList ? tileList.push(tile) : this.idTileMap.set(tile.rawTileId, [tile]);
    }

    changeTileByRawId(pos:Cord2D, rawTileId: string) {
        const rawTile = this.rawTileContainer.getTileById(rawTileId);

        const tile = this.getTileByPos(pos);
        tile.changeRawTile(rawTile);
    }

    getTileByPos(pos:Cord2D): InstanceTile {
        const tile = this.poseTileMap.get(pos.toString());
        if (tile) {
            return tile;
        }
        throw new Error(`Instance tile with at position ${pos} does not exist.`);
    }

    rotateTileByPos(pos:Cord2D, rotation: MetricRotationAngle) {
        const tile = this.getTileByPos(pos);

        tile.setRotation(rotation);
    }

    getImageByPos(pos: Cord2D): ImageModel {
        const tile: InstanceTile = this.getTileByPos(pos);
        const image =  tile.image;
        return image;
    }
}