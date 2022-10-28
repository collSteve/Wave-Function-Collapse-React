import { MetricDirection2D, MetricRotationAngle } from "../../../utils/enums";
import { ImageModel } from "../../shared/models/image";
import { RawTile } from "./rawTile";
import { Tile, TileArgs } from "./tile";


export type InstanceTileArgs = {
    rawTile: RawTile,
    rotation?:MetricRotationAngle,
};

export class InstanceTile extends Tile {
    private _rawTileId:string;
    private _metricRotation:MetricRotationAngle;
    private rawTile:RawTile;

    constructor(args:InstanceTileArgs) {
        super(InstanceTile.convertArgs2TileArgs(args));
        this.rawTile = args.rawTile;
        this._rawTileId = args.rawTile.tileId;

        this._metricRotation = args.rotation ?? MetricRotationAngle.O;
    }

    public changeRawTile(rawTile: RawTile) {
        this.rawTile = rawTile;
        this._rawTileId = rawTile.tileId;
    }

    public static convertArgs2TileArgs(args:InstanceTileArgs):TileArgs {
        return {
            imageAddress: args.rawTile.imageAddress
        };
    }

    public get imageAddress(): string {
        return this.rawTile.imageAddress;
    }

    public get metricRotation():MetricRotationAngle {
        return this._metricRotation;
    }

    public get rawTileId():string {
        return this._rawTileId;
    }

    public get upConnection(): string[] {
        return this.rawTile.getAbsoluteConnectionWithRotation(MetricDirection2D.UP,this.metricRotation);
    }
    public get rightConnection(): string[] {
        return this.rawTile.getAbsoluteConnectionWithRotation(MetricDirection2D.RIGHT,this.metricRotation);
    }
    public get downConnection(): string[] {
        return this.rawTile.getAbsoluteConnectionWithRotation(MetricDirection2D.DOWN,this.metricRotation);
    }
    public get leftConnection(): string[] {
        return this.rawTile.getAbsoluteConnectionWithRotation(MetricDirection2D.LEFT,this.metricRotation);
    }

    get image(): ImageModel {
        return new ImageModel(this.imageAddress, this.metricRotation as number);
    }

    setRotation(rotation: MetricRotationAngle) {
        this._metricRotation = rotation;
    }
}