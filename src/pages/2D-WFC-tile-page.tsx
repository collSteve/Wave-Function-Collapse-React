import React from 'react';
import { WFCStore } from '../app/services/wfc-raw-tile-container';
import { ImageModel } from '../app/shared/models/image';
import ImageGridComponent from '../app/shared/template/image-grid/image-grid-component';
import { rotation } from '../app/shared/utils/style/rotation';
import { Instance2DGridArgs, InstanceTileContainer2D } from '../app/WFC/models/instanceTileContainer2D';
import { RawTileArgs } from '../app/WFC/models/rawTile';
import { RawTileContainer } from '../app/WFC/models/rawTileContainer';
import { MetricRotationAngle } from '../utils/enums';
import { Cord2D } from '../utils/standard-models';

//style
import Button from '@mui/material/Button';

interface WFCTilePage2DProps{
    gridWidth:number,
    gridHeight:number,
    wfcStore: WFCStore
}

interface WFCTilePage2DState{
    tileSize: number,
    instanceContainer: InstanceTileContainer2D;
}

export default class WFCTilePage2D extends React.Component<WFCTilePage2DProps, WFCTilePage2DState> {
    private rawTileContainer: RawTileContainer;
    private instanceContainer: InstanceTileContainer2D;

    constructor(props: WFCTilePage2DProps) {
        super(props);

        this.rawTileContainer = props.wfcStore.rawTileContainer;

        // const rawDefaultArgs: RawTileArgs = {
        //     imageAddress: process.env.PUBLIC_URL + '/source-files/default-image-1.png',
        // }

        // this.rawTileContainer.addDefaultTile(rawDefaultArgs);

        const instanceTilesArgs: Instance2DGridArgs = {
            height: props.gridHeight,
            width: props.gridWidth,
            rawTileContainer: this.rawTileContainer
        };
        this.instanceContainer = new InstanceTileContainer2D(instanceTilesArgs);

        this.state = {
            tileSize: 40,
            instanceContainer: this.instanceContainer
        };
    }

    render(): React.ReactNode {
        const image = new ImageModel("https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg", 120);

        return (
            <div>
                <img src="" alt="" />
                <div>Height: {this.instanceContainer.height}, Width: {this.instanceContainer.width}</div>

                <Button variant="contained"
                onClick={()=>{
                    this.instanceContainer.setup();
                    this.instanceContainer.wfcGeneration();
                    this.setState({instanceContainer: this.instanceContainer});
                }}
                >Process WFC</Button>
                <ImageGridComponent 
                    verticleFlip={true}
                    gridHeight={this.props.gridHeight} 
                    gridWidth={this.props.gridWidth}
                    imageGrid={this.state.instanceContainer}
                    imageHeight={this.state.tileSize}
                    imageWidth={this.state.tileSize}/>
            </div>
        );
    }
}