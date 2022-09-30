import { MetricDirection2D, metricRotation2Index, MetricRotationAngle, REVERSE_METRIC_DIRECTION_ORDER } from "./enums";
import { EnumDictionary } from "./native-extension-types";

export const metricDirectionRotateTable:EnumDictionary<MetricDirection2D,EnumDictionary<MetricRotationAngle,MetricDirection2D>> = {
    [MetricDirection2D.UP]: {
        [MetricRotationAngle.O]:MetricDirection2D.UP,
        [MetricRotationAngle.CW1]:MetricDirection2D.RIGHT,
        [MetricRotationAngle.CW2]:MetricDirection2D.DOWN,
        [MetricRotationAngle.CW3]:MetricDirection2D.LEFT,
    },
    [MetricDirection2D.RIGHT]: {
        [MetricRotationAngle.O]:MetricDirection2D.RIGHT,
        [MetricRotationAngle.CW1]:MetricDirection2D.DOWN,
        [MetricRotationAngle.CW2]:MetricDirection2D.LEFT,
        [MetricRotationAngle.CW3]:MetricDirection2D.UP,
    },
    [MetricDirection2D.DOWN]: {
        [MetricRotationAngle.O]:MetricDirection2D.DOWN,
        [MetricRotationAngle.CW1]:MetricDirection2D.LEFT,
        [MetricRotationAngle.CW2]:MetricDirection2D.UP,
        [MetricRotationAngle.CW3]:MetricDirection2D.RIGHT,
    },
    [MetricDirection2D.LEFT]: {
        [MetricRotationAngle.O]:MetricDirection2D.LEFT,
        [MetricRotationAngle.CW1]:MetricDirection2D.UP,
        [MetricRotationAngle.CW2]:MetricDirection2D.RIGHT,
        [MetricRotationAngle.CW3]:MetricDirection2D.DOWN,
    }
}

export function metricDirectionRotateFrom(currentDir:MetricDirection2D, rotation:MetricRotationAngle) {

    const currentDirIndex = REVERSE_METRIC_DIRECTION_ORDER.findIndex((item)=>item===currentDir);

    const fromDirIndex = (currentDirIndex + metricRotation2Index[rotation]) % REVERSE_METRIC_DIRECTION_ORDER.length;

    return REVERSE_METRIC_DIRECTION_ORDER[fromDirIndex];
}