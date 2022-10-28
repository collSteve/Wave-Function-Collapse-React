import React from "react";
import { Cord2D } from "../../../../utils/standard-models";
import { ImageModel } from "../../models/image";
import { rotation } from "../../utils/style/rotation";
import appStyle from "./style.module.css"

export interface IImageGrid {
    getImageByPos(pos:Cord2D): ImageModel;
}

export interface ImageGridProps {
    gridWidth:number,
    gridHeight:number,
    imageWidth:number,
    imageHeight:number,
    imageGrid: IImageGrid
}

export default class ImageGridComponent extends React.Component<ImageGridProps> {
    private gridWidth: number;
    private gridHeight: number;
    private imageGrid: IImageGrid;

    constructor(props: ImageGridProps) {
        super(props);

        this.gridHeight = props.gridHeight;
        this.gridWidth = props.gridWidth;
        this.imageGrid = props.imageGrid;
    }

    render(): React.ReactNode {
        let images = [];

        for (let y=0; y<this.gridHeight; y++) {
            let row = [];
            for (let x=0; x<this.gridWidth; x++) {
                const pos = new Cord2D(x,y);
                const image = this.imageGrid.getImageByPos(pos);
                const cellStyle = {
                    margin:0,
                    'width': `${this.props.imageWidth}px`,
                    'height': `${this.props.imageHeight}px`,
                    ...rotation(image.rotationDeg)
                };

                row.push(<img key={pos.toString()} style={cellStyle} src={image.imageAddress} alt=""/>);
            }
            images.push(<div key={`row: ${y}`} className={appStyle.image_grid_row}>{[...row]}</div>)
        }

        return (
            <div>
                <div className={appStyle.image_grid_container}>
                    {images}
                </div>
            </div>
        );
    }
}