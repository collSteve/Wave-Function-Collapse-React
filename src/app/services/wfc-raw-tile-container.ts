import { InstanceTileContainer2D } from "../WFC/models/instanceTileContainer2D";
import { RawTileContainer } from "../WFC/models/rawTileContainer";

export class WFCStore {
    private _rawTileContainer: RawTileContainer;

    private _instanceTileContainer: InstanceTileContainer2D; // could be an array of instance containers

    constructor() {
        this._rawTileContainer = new RawTileContainer();
        this._instanceTileContainer = new InstanceTileContainer2D({width:0, height: 0, rawTileContainer: this.rawTileContainer});
    }

    get rawTileContainer(): RawTileContainer {
        return this._rawTileContainer;
    }
}