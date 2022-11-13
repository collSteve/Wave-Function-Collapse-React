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

    toStringId(): string {
        return `${this.x},${this.y}`;
    }

    public static fromStringId(s: string): Cord2D {
        const rawIds = s.split(",");
        const x = parseInt(rawIds[0]);
        const y = parseInt(rawIds[1]);

        return new Cord2D(x,y);
    }

    equals(cord: Cord2D): boolean {
        return this.x === cord.x && this.y === cord.y;
    }
}