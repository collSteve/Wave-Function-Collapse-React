import { InstanceTile, RawTile } from "./tile";

export interface IRawTileContainer extends Iterable<RawTile> {
    
}

export class RawTileContainer implements IRawTileContainer {
    private rawTileMap: Map<string,RawTile>;

    constructor() {
        this.rawTileMap = new Map();
    }


    [Symbol.iterator](): Iterator<RawTile, any, undefined> {
        return this.rawTileMap.values();
    }

}


export interface IInstanceTileContainer extends Iterable<InstanceTile> {
    
}

export class InstanceTileContainer implements IInstanceTileContainer {
    private instanceTileMap: Map<string,InstanceTile>;

    constructor() {
        this.instanceTileMap = new Map();
    }

    [Symbol.iterator](): Iterator<InstanceTile, any, undefined> {
        return this.instanceTileMap.values();
    }
}