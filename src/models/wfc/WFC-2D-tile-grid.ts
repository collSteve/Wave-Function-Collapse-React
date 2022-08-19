import React from "react";
import { ReactNode } from "react";
import { I2DDisplayGrid, IWFC2DFunctionGrid } from "./grid";
import { IGridTile } from "./tile";

export class WFC2DTileGrid extends React.Component implements IWFC2DFunctionGrid, I2DDisplayGrid {
    
    getTile(x: number, y: number): IGridTile {
        throw new Error("Method not implemented.");
    }
    
    getRenderedTile(x: number, y: number): ReactNode {
        throw new Error("Method not implemented.");
    }

    render(): ReactNode {
        return;
    }
}