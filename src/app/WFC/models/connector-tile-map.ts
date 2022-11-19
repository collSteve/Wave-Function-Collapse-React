import { MetricDirection2D, METRIC_DIRECTION_ORDER } from "../../../utils/enums";
import { deepCopy } from "../../shared/utils/copy";
import { MetricConnector2D } from "./connector";
import { RawTileContainer } from "./rawTileContainer";


export type IdDirData = {
    id: string,
    direction: MetricDirection2D
}

export type IdDirMap = {[id:string]:{
    [K in MetricDirection2D]?: IdDirData[]
}};

const allDirections:MetricDirection2D[] = METRIC_DIRECTION_ORDER;

export class ConnectorTileMap {
    private idDirMap: IdDirMap;

    constructor(rawTileContainer: RawTileContainer) {
        this.idDirMap = {};
        this.init(rawTileContainer);
    }

    init(rawTileContainer: RawTileContainer) {
        this.idDirMap = {};

        for (const [id,rawTile] of rawTileContainer) {
            this.idDirMap[id] = {};

            for (const direction of allDirections) {
                const idDir: IdDirData = {
                    id: id,
                    direction: direction
                };

                this.idDirMap[id][direction] = [];
                
                const connector: string[] = rawTile.getConnectionByDirection(direction);

                for (const [otherId,otherRawTile] of rawTileContainer) {
                    for (const otherDirection of allDirections) {
                        const otherConnector: string[] = otherRawTile.getConnectionByDirection(otherDirection);

                        if (MetricConnector2D.areConnectable(connector, otherConnector)) {
                            const otherIdDir: IdDirData = {
                                id: otherId,
                                direction: otherDirection
                            }
                            
                            this.idDirMap[id][direction]?.push(otherIdDir);
                        }

                    }
                }
            }
        }

        // console.log(this.idDirMap);
    }

    getAllConnectableTiles(id:string, direction:MetricDirection2D): IdDirData[] {
        if (this.idDirMap[id]) {
            const rawList = this.idDirMap[id][direction];

            if (rawList) {
                const connectableIdDirs:IdDirData[] = [];

                for (const idDir of rawList) {
                    connectableIdDirs.push(deepCopy(idDir));
                }
                return connectableIdDirs;
            }
            throw new Error(`[weird] Direction for Raw tile Id ${id} does not exist.`);
        }
        throw new Error(`Raw tile Id ${id} does not exist.`);
    }

    getRandomConnectableTile(id:string, direction:MetricDirection2D, randomFunc?:(list:IdDirData[])=>IdDirData) {
        const connectableIdDirs: IdDirData[] = this.getAllConnectableTiles(id, direction);

        if (connectableIdDirs.length <= 0) return null;

        let randomFunction: (list:IdDirData[])=>IdDirData = randomFunc?? 
            function(list:IdDirData[]){ return list[Math.floor(Math.random()*list.length)]};

        return randomFunction(connectableIdDirs);
    }
}