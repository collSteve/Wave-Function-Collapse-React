
import { MetricDirection2D, MetricRotationAngle } from "../../../utils/enums";
import { absoluteDirectionFromRotatedDirection } from "../../../utils/metric-rotation-connection-table";
import { ImageModel } from "../../shared/models/image";
import { generate_Id } from "../../shared/utils/id-generate";
import { MetricConnector2D } from "./connector";
import { Tile, TileArgs } from "./tile";

export type RawTileArgs = TileArgs & {
    imageAddress: string
    connections?:Map<MetricDirection2D,string[]>
};

export class RawTile extends Tile {
    protected _imageAddress: string = "";
    protected connector: MetricConnector2D;
    private _tileId: string;

    constructor(args:RawTileArgs) {
        super(args)
        this._imageAddress = args.imageAddress;
        this._tileId = this.generateId();

        this.connector = new MetricConnector2D([],[],[],[]);

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
        return generate_Id(); //stub
    }

    public changeImageAddress(address: string) {
        this._imageAddress = address;
    }

    public get imageAddress(): string {
        return this._imageAddress
    }

    public get tileId():string {
        return this._tileId;
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
        const absoluteDir = absoluteDirectionFromRotatedDirection(connectionDir,rotation);
        return this.getConnectionByDirection(absoluteDir);
    }

    setConnection(direction: MetricDirection2D, connection: string[]) {
        this.connector.setConnection(direction, connection);
    }

    get image(): ImageModel {
        return new ImageModel(this.imageAddress);
    }
}
