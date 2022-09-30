import { EnumDictionary } from "./native-extension-types";

export enum MetricDirection2D {
    UP="up",
    DOWN="down",
    RIGHT="right",
    LEFT="left"
}

export enum MetricRotationAngle {
    O=0,
    CW1=90,
    CW2=180,
    CW3=270
}

export const METRIC_DIRECTION_ORDER = [
    MetricDirection2D.UP,
    MetricDirection2D.RIGHT,
    MetricDirection2D.DOWN,
    MetricDirection2D.LEFT
];

export const REVERSE_METRIC_DIRECTION_ORDER = [
    MetricDirection2D.UP,
    MetricDirection2D.LEFT,
    MetricDirection2D.DOWN,
    MetricDirection2D.RIGHT
];

export const metricRotation2Index:EnumDictionary<MetricRotationAngle,number> = {
    [MetricRotationAngle.O]:0,
    [MetricRotationAngle.CW1]:1,
    [MetricRotationAngle.CW2]:2,
    [MetricRotationAngle.CW3]:3,
}