import React from "react";
import { rotation } from "../app/shared/utils/style/rotation";
import { RawTileContainer } from "../app/WFC/models/rawTileContainer";
import { RawTile } from "../models/wfc/tile";
import { MetricDirection2D } from "../utils/enums";

interface WFCRawTilePage2DProps {
    rawTileContainer: RawTileContainer
}

interface WFCRawTilePage2DState {
    addRawTile: {
        imageAddress:string
    },
    rawTileContainer: RawTileContainer
}

export default class WFCTRawTilePage2D extends React.Component<WFCRawTilePage2DProps, WFCRawTilePage2DState>{
    private rawTileContainer: RawTileContainer;

    constructor(props:WFCRawTilePage2DProps) {
        super(props);
        this.rawTileContainer = props.rawTileContainer;

        this.state = {
            addRawTile:{imageAddress: ""},
            rawTileContainer: this.rawTileContainer
        }
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
                <img key={id} style={cellStyle} src={image.imageAddress} alt=""/>
                <p>Image address:</p>
                <input type="text" value={rawTile.imageAddress} onChange={()=>{}}/>
                <button onClick={()=>{}}>change</button>

                <div>
                    <p>connectors:</p>
                    <div>
                            <p>Up</p>
                            <input type="text" value={rawTile.upConnection} onChange={()=>{}}/>
                            <button onClick={()=>{}}>change</button>
                        
                    </div>
                </div>
                <button onClick={()=>{
                        this.rawTileContainer.setDefaultTileById(rawTile.tileId);
                        this.setState({rawTileContainer: this.rawTileContainer});
                    }}>
                    Set as default
                </button>
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

                <form onSubmit={(e)=>{
                    const id = this.rawTileContainer.addTileByImageAddress(this.state.addRawTile.imageAddress);

                    const tile = this.rawTileContainer.getTileById(id);

                    tile.setConnection(MetricDirection2D.UP, ["A", "B", "A"]);

                    this.setState({rawTileContainer:this.rawTileContainer});
                    e.preventDefault();
                }}>
                    <input type="text" 
                        value={this.state.addRawTile.imageAddress} 
                        onChange={(e)=>{this.setState({addRawTile:{imageAddress:e.target.value}})}} />
                    <input type="submit" value="Add new tile" />
                </form>
            </div>  
        );
    }

}