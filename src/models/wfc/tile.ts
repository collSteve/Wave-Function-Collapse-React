import { ReactNode } from "react";
import { Cord2D } from "../../utils/standard-models";

export interface ISampleTile {
    imageAddress:string;
    rotationAngle:number;

    getImageAddress():string;
    getRotationAngle():number;
    rotateImage(angle:number):void;
}

export interface IGridTile {
    rotationAngle:number;

    getRotationAngle():number;
    rotateImage(angle:number):void;

    getGridIndex(): Cord2D
}

export interface IWFC2DTile extends ISampleTile,IGridTile { 
    render(x:number,y:number): ReactNode;
}