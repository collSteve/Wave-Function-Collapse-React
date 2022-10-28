export class ImageModel {
    private _imageAddress: string;
    private _rotationDeg: number;

    constructor(imageAddress:string, rotationDeg?:number) {
        this._imageAddress = imageAddress;
        this._rotationDeg = rotationDeg ?? 0;
    }

    get imageAddress(): string {
        return this._imageAddress;
    }

    get rotationDeg(): number {
        return this._rotationDeg;
    }
}