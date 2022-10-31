import { RawTileContainer } from "../WFC/models/rawTileContainer";

export class WFCStore {
    private _rawTileContainer: RawTileContainer;

    constructor() {
        this._rawTileContainer = new RawTileContainer();
    }

    get rawTileContainer(): RawTileContainer {
        return this._rawTileContainer;
    }
}