import { RawTileContainer } from "../models/rawTileContainer";

export type JSONStringArrayTileData = {
    filepath:string,
    connectors: string[][]
}

export class TileSetStructureFileReader {
    static async readFromJSON(filepathex:string, filename:string, rawContainer:RawTileContainer)  {
        const res = await fetch(`${filepathex}/${filename}`);
        const data: {tiles:JSONStringArrayTileData[]} = await res.json();

        for (const tileData of data.tiles) {
            const rawId = rawContainer.addTileByImageAddress(`${filepathex}/${tileData.filepath}`);
            rawContainer.getTileById(rawId).setConnectionByArray(tileData.connectors);
        }
    }
}