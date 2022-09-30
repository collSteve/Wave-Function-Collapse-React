import { MetricDirection2D } from "../../utils/enums"
import { areArraysSameLength } from "../../utils/native-data-type-operations";


export class MetricConnector2D {
    connections: Map<MetricDirection2D,string[]>;

    constructor(up:string[],right:string[],down:string[],left:string[]) {
        if (!areArraysSameLength(up,right,down,left)) {
            throw new Error("Connections not same langth");
        }

        this.connections = new Map();
        this.connections.set(MetricDirection2D.UP,up);
        this.connections.set(MetricDirection2D.RIGHT,right);
        this.connections.set(MetricDirection2D.DOWN,down);
        this.connections.set(MetricDirection2D.LEFT,left);
    }

    public get up():string[] {
        const up = this.connections.get(MetricDirection2D.UP);
        if (!up) throw new Error("Up connection not exist");
        return up;
    }

    public get right():string[] {
        const right = this.connections.get(MetricDirection2D.RIGHT);
        if (!right) throw new Error("Up connection not exist");
        return right;
    }

    public get down():string[] {
        const down = this.connections.get(MetricDirection2D.DOWN);
        if (!down) throw new Error("Up connection not exist");
        return down;
    }

    public get left():string[] {
        const left = this.connections.get(MetricDirection2D.LEFT);
        if (!left) throw new Error("Up connection not exist");
        return left;
    }
}