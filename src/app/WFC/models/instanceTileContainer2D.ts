import { MetricDirection2D, MetricRotationAngle, OppositeDirection } from "../../../utils/enums";
import { absoluteDirectionFromRotatedDirection, ALL_METRIC_ROTATIONS, rotationByRotatingDirA2B } from "../../../utils/metric-rotation-connection-table";
import { randomItemFromArrayGeneral, randomItemFromArrayStrict } from "../../../utils/random";
import { extractSameElements } from "../../../utils/standard-array-operations";
import { Cord2D } from "../../../utils/standard-models";
import { ImageModel } from "../../shared/models/image";
import { IImageGrid } from "../../shared/template/image-grid/image-grid-component";
import { deepCopy } from "../../shared/utils/copy";
import { InstanceTile, InstanceTileArgs } from "./instanceTile";
import { IRawTileContainer } from "./rawTileContainer";

export interface Instance2DGridArgs {
    height: number,
    width: number,
    rawTileContainer:IRawTileContainer
}


export interface IInstanceTileContainer2D extends Iterable<InstanceTile> {
    getTileByPos(pos:Cord2D):InstanceTile;
}

export type WFC2DInterestTileInfo = {
    rawTileId: string,
    rotation: MetricRotationAngle,
    relativeDirection: MetricDirection2D
}

export class InstanceTileContainer2D implements IInstanceTileContainer2D, IImageGrid {
    private idTileMap: Map<string,InstanceTile[]>;
    private poseTileMap: Map<string,InstanceTile>;
    private rawTileContainer: IRawTileContainer;

    private _height: number;
    private _width: number;

    constructor(args:Instance2DGridArgs) {
        this.idTileMap = new Map();
        this.poseTileMap = new Map();

        this.rawTileContainer = args.rawTileContainer;
        this._height = args.height;
        this._width = args.width;

        this.setup();
    }

    setup() {
        for (let x=0; x<this.width; x++) {
            for (let y=0; y< this.height; y++) {
                this.addTileByRawId(new Cord2D(x,y), this.unassignedTileId);
            }
        }
    }

    changeWidthHeight(width:number, height:number) {
        this._width = width;
        this._height = height;
        this.setup();
    }

    [Symbol.iterator](): Iterator<InstanceTile, any, undefined> {
        return this.poseTileMap.values();
    }

    public get height() {
        return this._height;
    }

    public get width() {
        return this._width;
    }

    private addTileByRawId(pos:Cord2D, rawTileId: string, rotation?:MetricRotationAngle) {
        const rawTile = this.rawTileContainer.getTileById(rawTileId);
        const args:InstanceTileArgs = {
            rawTile: rawTile,
            rotation: rotation
        }

        this.addTileByArgs(pos, args);
    }

    public addTileByArgs(pos: Cord2D, args: InstanceTileArgs) {
        const tile = new InstanceTile(args);

        this.poseTileMap.set(pos.toStringId(), tile);

        const tileList = this.idTileMap.get(tile.rawTileId);
        tileList ? tileList.push(tile) : this.idTileMap.set(tile.rawTileId, [tile]);
    }

    changeTileByRawId(pos:Cord2D, rawTileId: string) {
        const rawTile = this.rawTileContainer.getTileById(rawTileId);

        const tile = this.getTileByPos(pos);
        tile.changeRawTile(rawTile);
    }

    getTileByPos(pos:Cord2D): InstanceTile {
        const tile = this.poseTileMap.get(pos.toStringId());
        if (tile) {
            return tile;
        }
        throw new Error(`Instance tile with at position ${pos} does not exist.`);
    }

    rotateTileByPos(pos:Cord2D, rotation: MetricRotationAngle) {
        const tile = this.getTileByPos(pos);

        tile.setRotation(rotation);
    }

    getImageByPos(pos: Cord2D): ImageModel {
        const tile: InstanceTile = this.getTileByPos(pos);
        const image =  tile.image;
        return image;
    }

    public static getPosesForOfInsterestsOnPos(pos:Cord2D, maxPos:Cord2D) {
        const interestsPoses = [];
        if (pos.x-1>=0) {
            interestsPoses.push(new Cord2D(pos.x-1,pos.y));
        }
        if (pos.x+1<=maxPos.x) {
            interestsPoses.push(new Cord2D(pos.x+1,pos.y));
        }
        if (pos.y-1>=0) {
            interestsPoses.push(new Cord2D(pos.x,pos.y-1));
        }
        if (pos.y+1<=maxPos.y) {
            interestsPoses.push(new Cord2D(pos.x,pos.y+1));
        }
        return interestsPoses;
    }

    public static getPosesOfInsterestsOnPosWithDirection(pos:Cord2D, maxPos:Cord2D) {
        const interestsPoses: {pos:Cord2D, direction: MetricDirection2D}[] = [];
        if (pos.x-1>=0) {
            interestsPoses.push({pos:new Cord2D(pos.x-1,pos.y), direction:MetricDirection2D.LEFT});
        }
        if (pos.x+1<=maxPos.x) {
            interestsPoses.push({pos:new Cord2D(pos.x+1,pos.y), direction:MetricDirection2D.RIGHT});
        }
        if (pos.y-1>=0) {
            interestsPoses.push({pos:new Cord2D(pos.x,pos.y-1), direction:MetricDirection2D.DOWN});
        }
        if (pos.y+1<=maxPos.y) {
            interestsPoses.push({pos:new Cord2D(pos.x,pos.y+1), direction:MetricDirection2D.UP});
        }
        return interestsPoses;
    }

    /**
     * 
     * @param posTileMap 
     * @param unassignedTileId 
     * @param maxPos the cordinate boundary of the posTileMap: {maxX, maxY}
     * @returns a dictionary which key is number of interests tiles arround an tile wihch tile pos is p, 
     * and value is an array of {p: {the rawTile id of the interests tile around it with direction to p as index}}
     * 
     */
    public static calculateEnpropyPerPos(posTileMap:Map<string,InstanceTile>, unassignedTileId: string, maxPos:Cord2D): Map<number, {rawPos: string, associateTiles: WFC2DInterestTileInfo[]}[]> {
        const map = new Map<number, {rawPos: string, associateTiles: WFC2DInterestTileInfo[]}[]>();
        for (const [rawCord, tile] of posTileMap) {
            const interestTilesInfos: WFC2DInterestTileInfo[] = [];

            if (tile.rawTileId === unassignedTileId) {
                const cord: Cord2D = Cord2D.fromStringId(rawCord);
                const interestsPoses = InstanceTileContainer2D.getPosesOfInsterestsOnPosWithDirection(cord, maxPos);
                let entropyNum = 0;
                for (const posDir of interestsPoses) {
                    const interestsPosTile = posTileMap.get(posDir.pos.toStringId());
                    if (interestsPosTile) {
                        if (interestsPosTile.rawTileId !== unassignedTileId) {
                            entropyNum++;
                            interestTilesInfos.push({
                                rawTileId: interestsPosTile.rawTileId,
                                rotation: interestsPosTile.metricRotation,
                                relativeDirection: posDir.direction
                            })
                        }
                    }
                }

                const resultRawPosInterestsTileInfosObject: {rawPos: string, associateTiles: WFC2DInterestTileInfo[]} = {
                    rawPos: rawCord,
                    associateTiles: interestTilesInfos
                }

                const cordIdsNow = map.get(entropyNum);
                if (cordIdsNow) {
                    map.set(entropyNum, [...cordIdsNow, resultRawPosInterestsTileInfosObject]);
                }
                else {
                    map.set(entropyNum, [resultRawPosInterestsTileInfosObject]);
                } 
            }
        }
        return map;
    }

    public static calculateMaxInverseEnpropyPoses(posTileMap:Map<string,InstanceTile>, defaultTileId: string, maxPos:Cord2D): {rawPos: string, associateTiles: WFC2DInterestTileInfo[]}[] {
        const entropyPosMap = InstanceTileContainer2D.calculateEnpropyPerPos(posTileMap, defaultTileId, maxPos);
        let maxInverseEntropy = Number.NEGATIVE_INFINITY;
        let posInterestsTileInfosObject: {rawPos: string, associateTiles: WFC2DInterestTileInfo[]}[] = [];

        for (const [entropy, posIds] of entropyPosMap) {
            if (entropy>maxInverseEntropy) {
                maxInverseEntropy = entropy;
                posInterestsTileInfosObject = deepCopy(posIds);
            }
        }

        return posInterestsTileInfosObject;
    }

    hasUnassignedTiles() {
        for (const [rawCord, tile] of this.poseTileMap) {
            if (tile.rawTileId === this.unassignedTileId) {
                return true;
            }
        }
        return false;
    }

    get unassignedTileId() {
        return this.rawTileContainer.defaultTileId;
    }

    wfcGeneration() {
        const allValidRawTileIds = this.rawTileContainer.nonDefaultRawTileIds;
        while (allValidRawTileIds.length > 0 && this.hasUnassignedTiles()) {
            const maxInverseEntropyPoses = InstanceTileContainer2D.calculateMaxInverseEnpropyPoses(
                this.poseTileMap, 
                this.unassignedTileId, 
                new Cord2D(this.width, this.height));
            
            const posInterestsTileInfosObject: {rawPos: string, associateTiles: WFC2DInterestTileInfo[]} = randomItemFromArrayStrict(maxInverseEntropyPoses);    

            console.log(`PITIO: rawPos: ${posInterestsTileInfosObject.rawPos}, IInfo: ${JSON.stringify(posInterestsTileInfosObject.associateTiles)}`);
            let chosenRawTileData: {rawTileId: string, rotation:MetricRotationAngle} | null = null;
            

            if (posInterestsTileInfosObject.associateTiles.length <= 0) {
                const chosenRawTileId = randomItemFromArrayStrict(allValidRawTileIds);
                const chosenRotation = randomItemFromArrayStrict(ALL_METRIC_ROTATIONS);

                chosenRawTileData = {rawTileId: chosenRawTileId, rotation: chosenRotation};
            }
            else {
                const tileInfoAt0 = posInterestsTileInfosObject.associateTiles[0];
                const absoluteDirectionOfITile0ToThis = absoluteDirectionFromRotatedDirection(OppositeDirection[tileInfoAt0.relativeDirection], tileInfoAt0.rotation);
                const allConnectableRawTilesIdDirs0 = this.rawTileContainer.getAllConnectableTilesId(tileInfoAt0.rawTileId, absoluteDirectionOfITile0ToThis);
                let possibleRawTileDatas: {rawTileId: string, rotation:MetricRotationAngle}[] = allConnectableRawTilesIdDirs0.map((idDir)=> {
                    return {
                        rawTileId:idDir.id,
                        rotation: rotationByRotatingDirA2B(idDir.direction, tileInfoAt0.relativeDirection)
                    };
                })

                for (const interestTilesInfo of posInterestsTileInfosObject.associateTiles) {
                    const absoluteDirectionOfITileToThis = absoluteDirectionFromRotatedDirection(OppositeDirection[interestTilesInfo.relativeDirection], interestTilesInfo.rotation);
                    const allConnectableRawTilesIdDirs = this.rawTileContainer.getAllConnectableTilesId(interestTilesInfo.rawTileId, absoluteDirectionOfITileToThis);
                    const allConnectableRawTileData:{rawTileId: string, rotation:MetricRotationAngle}[] = allConnectableRawTilesIdDirs.map((idDir)=> {
                        return {
                            rawTileId:idDir.id,
                            rotation: rotationByRotatingDirA2B(idDir.direction, interestTilesInfo.relativeDirection)
                        };
                    })
                    possibleRawTileDatas = extractSameElements(possibleRawTileDatas, allConnectableRawTileData, 
                        (a,b)=> a.rawTileId === b.rawTileId && a.rotation === b.rotation
                    );
                }

                console.log(`possible raw tiles: ${possibleRawTileDatas.map(x=>{return JSON.stringify(x)})}`);

                chosenRawTileData = randomItemFromArrayGeneral(possibleRawTileDatas);
            }
             
            if (chosenRawTileData) {
                // render instance tile at pos with chosenRawTileData
                this.addTileByRawId(Cord2D.fromStringId(posInterestsTileInfosObject.rawPos), chosenRawTileData.rawTileId, chosenRawTileData.rotation);
            } else {
                console.log("Fail to WFC");
                return;
                // back trace
            }
        }
    }
}