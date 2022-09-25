import React from "react";
import { Cord2D } from "../../utils/standard-models";
import { IWFC2DTile, TileState } from "./tile";

export class WFC2DTile extends React.Component, IWFC2DTile {
    protected imageAddress: string = "";
    protected rotationAngle: number = 0;

    getImageAddress(): string {
        throw new Error("Method not implemented.");
    }
    getRotationAngle(): number {
        throw new Error("Method not implemented.");
    }
    rotateImage(angle: number): void {
        throw new Error("Method not implemented.");
    }
    getGridIndex(): Cord2D {
        throw new Error("Method not implemented.");
    }

}