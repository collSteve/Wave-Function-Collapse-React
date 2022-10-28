import React from 'react';
import { ImageModel } from '../app/shared/models/image';
import ImageGridComponent from '../app/shared/template/image-grid/image-grid-component';
import { rotation } from '../app/shared/utils/style/rotation';
import { Instance2DGridArgs, InstanceTileContainer2D } from '../app/WFC/models/instanceTileContainer2D';
import { RawTileArgs } from '../app/WFC/models/rawTile';
import { RawTileContainer } from '../app/WFC/models/rawTileContainer';
import { MetricRotationAngle } from '../utils/enums';
import { Cord2D } from '../utils/standard-models';

interface WFCTilePage2DProps{
    gridWidth:number,
    gridHeight:number;
}

export default class WFCTilePage2D extends React.Component<WFCTilePage2DProps> {
    private rawTileContainer: RawTileContainer;
    private instanceContainer: InstanceTileContainer2D;

    private tileSize: number;

    constructor(props: WFCTilePage2DProps) {
        super(props);

        this.rawTileContainer = new RawTileContainer();

        const rawDefaultArgs: RawTileArgs = {
            imageAddress: process.env.PUBLIC_URL + '/source-files/default-image-1.png',
        }

        this.rawTileContainer.addDefaultTile(rawDefaultArgs);

        const instanceTilesArgs: Instance2DGridArgs = {
            height: props.gridHeight,
            width: props.gridWidth,
            rawTileContainer: this.rawTileContainer
        };
        this.instanceContainer = new InstanceTileContainer2D(instanceTilesArgs);

        this.tileSize = 50;
    }

    render(): React.ReactNode {
        const image = new ImageModel("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", 120);
        return (
            <div>
                <div>Height: {this.instanceContainer.height}, Width: {this.instanceContainer.width}</div>
                <ImageGridComponent 
                    gridHeight={this.props.gridHeight} 
                    gridWidth={this.props.gridWidth}
                    imageGrid={this.instanceContainer}
                    imageHeight={this.tileSize}
                    imageWidth={this.tileSize}/>
            </div>
        );
    }
}