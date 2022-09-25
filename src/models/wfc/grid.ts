import { ReactNode } from "react";
import { IGridTile } from "./tile";

export interface IWFC2DFunctionGrid {
    getTile(x:number,y:number):IGridTile;

    
}

export interface I2DDisplayGrid {
    getRenderedTile(x:number,y:number):ReactNode;
    render():ReactNode;
}
