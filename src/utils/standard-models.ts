export class Cord2D{
    public x:number = 0;
    public y:number = 0;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    toString(): string {
        return `<x: ${this.x}, y: ${this.y}>`;
    }

    equals(cord: Cord2D): boolean {
        return this.x === cord.x && this.y === cord.y;
    }
}