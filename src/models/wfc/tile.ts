import { ReactNode } from "react";
import { Cord2D } from "../../utils/standard-models";

export enum TileState {
    ResolvedTile,
    UnresolvedTile
}

export abstract class BaseTile {
    protected tileState: TileState = TileState.UnresolvedTile;
    protected rotationAngle:number|undefined;

    public getTileState(): TileState {
        return this.tileState
    }

    getRotationAngle():number {
        if (this.rotationAngle) return this.rotationAngle;
        throw new Error("Undefined rotaion angle");

    }

    public abstract rotateImage(angle:number):void;
} 

export abstract class ISampleTile extends BaseTile {
    protected imageAddress:string|undefined;

    getImageAddress():string {
        if (this.imageAddress) return this.imageAddress;
        throw new Error("Undefined Image Address");
    }
}

export abstract class IGridTile extends BaseTile {
    public abstract getGridIndex(): Cord2D
}

export abstract class IWFC2DTile extends ISampleTile implements IGridTile {
    public abstract getGridIndex(): Cord2D;
    public abstract render(x:number,y:number): ReactNode;
}