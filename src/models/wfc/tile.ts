import { dir } from "console";
import { ReactNode } from "react";
import { MetricDirection2D, MetricRotationAngle } from "../../utils/enums";
import { metricDirectionRotateFrom, metricDirectionRotateTable } from "../../utils/metric-rotation-connection-table";
import { Cord2D } from "../../utils/standard-models";
import { MetricConnector2D } from "./connector";

export enum TileState {
    ResolvedTile,
    UnresolvedTile
}

export type TileArgs = {
    imageAddress: string
};

export type RawTileArgs = TileArgs & {
    connections?:Map<MetricDirection2D,string[]>
};

export type InstanceTileArgs = {
    rawTile: RawTile,
    rotation?:MetricRotationAngle,
};

export abstract class Tile {
    protected _imageAddress: string;

    constructor(args:TileArgs) {
        this._imageAddress = args.imageAddress;
    }

    public get imageAddress():string {
        return this.imageAddress
    }

    public abstract get upConnection():string[];
    public abstract get rightConnection():string[];
    public abstract get downConnection():string[];
    public abstract get leftConnection():string[];
}

export class RawTile extends Tile {
    protected connector: MetricConnector2D|undefined;
    private _tileId: string;

    constructor(args:RawTileArgs) {
        super(args)
        this._imageAddress = args.imageAddress;
        this._tileId = this.generateId();

        if (args.connections) {
            const [up,down,right,left] = [
                args.connections.get(MetricDirection2D.UP),
                args.connections.get(MetricDirection2D.DOWN),
                args.connections.get(MetricDirection2D.RIGHT),
                args.connections.get(MetricDirection2D.LEFT)
            ];

            if (up && down && right && left) {
                this.connector = new MetricConnector2D(up,right,down,left);
            } else {
                console.warn("Tile Connections passed in is invalid. Unable to construct connector.");
            }
        }
    }

    private generateId():string {
        return ""; //stub
    }

    public set imageAddress(address:string) {
        this._imageAddress = address;
    }

    public get tileId():string {
        return this.tileId
    }

    public get upConnection():string[] {
        if (!this.connector) throw new Error("Connector is undefined");
        return this.connector.up;
    }

    public get downConnection():string[] {
        if (!this.connector) throw new Error("Connector is undefined");
        return this.connector.down;
    }

    public get leftConnection():string[] {
        if (!this.connector) throw new Error("Connector is undefined");
        return this.connector.left;
    }

    public get rightConnection():string[] {
        if (!this.connector) throw new Error("Connector is undefined");
        return this.connector.right;
    }

    public getConnectionByDirection(direction:MetricDirection2D):string[] {
        if (direction === MetricDirection2D.UP) {
            return this.upConnection;
        } 
        else if (direction === MetricDirection2D.RIGHT) {
            return this.rightConnection;
        }
        else if (direction === MetricDirection2D.DOWN) {
            return this.downConnection;
        }
        else if (direction === MetricDirection2D.LEFT) {
            return this.leftConnection;
        }
        else {
            throw new Error(`Direction ${direction} not exist`);
        }
    }

    public getAbsoluteConnectionWithRotation(
        connectionDir:MetricDirection2D, 
        rotation:MetricRotationAngle):string[] {
        const absoluteDir = metricDirectionRotateFrom(connectionDir,rotation);
        return this.getConnectionByDirection(absoluteDir);
    }
}

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

    public static convertArgs2TileArgs(args:InstanceTileArgs):TileArgs {
        return {
            imageAddress: args.rawTile.imageAddress
        };
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
 }