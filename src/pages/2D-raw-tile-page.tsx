import React from "react";
import { rotation } from "../app/shared/utils/style/rotation";
import { RawTileContainer } from "../app/WFC/models/rawTileContainer";
import { RawTile } from "../models/wfc/tile";
import { MetricDirection2D } from "../utils/enums";
import ConnectorEditComponent from "../app/WFC/components/raw-tile-page/connector-edit";

//style
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface WFCRawTilePage2DProps {
    rawTileContainer: RawTileContainer
}

interface WFCRawTilePage2DState {
    addRawTile: {
        imageAddress:string
    },
    rawTileContainer: RawTileContainer,
    findConnectableId:string
}

export default class WFCTRawTilePage2D extends React.Component<WFCRawTilePage2DProps, WFCRawTilePage2DState>{
    private rawTileContainer: RawTileContainer;

    constructor(props:WFCRawTilePage2DProps) {
        super(props);
        this.rawTileContainer = props.rawTileContainer;

        this.state = {
            addRawTile:{imageAddress: ""},
            rawTileContainer: this.rawTileContainer,
            findConnectableId:""
        }

    }

    rerenderRawTileContainer() {
        this.setState({rawTileContainer: this.rawTileContainer});
    }

    render(): React.ReactNode {
        const imageSize = 50;
        const allImages = [];
        

        for (const [id,rawTile] of this.state.rawTileContainer) {
            const image = rawTile.image;
            const cellStyle = {
                margin:0,
                'width': `${imageSize}px`,
                'height': `${imageSize}px`
            };
            const a = <div key={id} style={{display:'flex', flexDirection: 'column', alignItems: 'center', width: "20%"}}>
                {/* <p>{rawTile.tileId}</p> */}
                <img key={id} style={cellStyle} src={image.imageAddress} alt=""/>
                <p>Image address:</p>
                <TextField
                    id="standard-disabled"
                    type="text"
                    label="Image source"
                    variant="outlined"
                    value={rawTile.imageAddress} onChange={()=>{}}
                    />
                <Button variant="contained" onClick={()=>{}}>change</Button>

                <div>
                    <p>connectors:</p>
                    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                        <ConnectorEditComponent 
                            label="Up Connector" 
                            connectorName="Up"
                            currentConnection={rawTile.upConnection.toString()}
                            onEdit={(a:string[])=>{rawTile.setConnection(MetricDirection2D.UP, a); this.rerenderRawTileContainer()}}/>

                        <ConnectorEditComponent 
                            label="Right Connector" 
                            connectorName="Right"
                            currentConnection={rawTile.rightConnection.toString()}
                            onEdit={(a:string[])=>{rawTile.setConnection(MetricDirection2D.RIGHT, a); this.rerenderRawTileContainer()}}/>

                        <ConnectorEditComponent 
                            label="Down Connector" 
                            connectorName="Down"
                            currentConnection={rawTile.downConnection.toString()}
                            onEdit={(a:string[])=>{rawTile.setConnection(MetricDirection2D.DOWN, a); this.rerenderRawTileContainer()}}/>

                        <ConnectorEditComponent     
                            label="Left Connector" 
                            connectorName="Left"
                            currentConnection={rawTile.leftConnection.toString()}
                            onEdit={(a:string[])=>{rawTile.setConnection(MetricDirection2D.LEFT, a); this.rerenderRawTileContainer()}}/>
                            
                    </div>
                </div>
                <Button variant="contained" onClick={()=>{
                        this.rawTileContainer.setDefaultTileById(rawTile.tileId);
                        this.setState({rawTileContainer: this.rawTileContainer});
                    }}>
                    Set as default
                </Button>
            </div>;
            allImages.push(a);
        }
        return (
            <div>
                <div>Name of raw tiles: {allImages.length}</div>
                <div>ID Map of raw tiles: {this.state.rawTileContainer.idMap.size}</div>

                <div style={{display:'flex', flexDirection:'row'}}>
                    {allImages}
                </div>
                <Box component="form"
                    onSubmit={(e:any)=>{
                        const id = this.rawTileContainer.addTileByImageAddress(this.state.addRawTile.imageAddress);
    
                        const tile = this.rawTileContainer.getTileById(id);
    
                        tile.setConnection(MetricDirection2D.UP, ["A", "B", "A"]);
    
                        this.setState({rawTileContainer:this.rawTileContainer});
                        e.preventDefault();
                    }}>
                    <TextField
                        id="standard-disabled"
                        type="text"
                        label="Tile image address"
                        variant="outlined"
                        value={this.state.addRawTile.imageAddress} 
                        onChange={(e)=>{this.setState({addRawTile:{imageAddress:e.target.value}})}}
                        />
                    <Button variant="contained" type="submit">Add new tile</Button>
                </Box>

                <TextField
                    id="standard-disabled"
                    type="text"
                    label="Connectable ID"
                    variant="outlined"
                    value={this.state.findConnectableId} 
                    onChange={(e)=>{this.setState({findConnectableId:e.target.value})}}
                    />

                <Button variant="contained" onClick={()=>{
                        const dirs = this.rawTileContainer.getAllConnectableTilesId(this.state.findConnectableId, MetricDirection2D.UP);
                        for (const dir of dirs) {
                            console.log(`Id: ${dir.id}, direction: ${dir.direction}`);
                        }
                    }} 
                    value="">Find all connectables</Button>
            </div>  
        );
    }

}