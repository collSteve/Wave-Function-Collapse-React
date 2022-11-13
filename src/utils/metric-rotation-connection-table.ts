import { index2MetricRotation, MetricDirection2D, metricRotation2Index, MetricRotationAngle, METRIC_DIRECTION_ORDER, REVERSE_METRIC_DIRECTION_ORDER } from "./enums";
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

export function absoluteDirectionFromRotatedDirection(currentDir:MetricDirection2D, rotation:MetricRotationAngle) {

    const currentDirIndex = REVERSE_METRIC_DIRECTION_ORDER.findIndex((item)=>item===currentDir);

    const fromDirIndex = (currentDirIndex + metricRotation2Index[rotation]) % REVERSE_METRIC_DIRECTION_ORDER.length;

    return REVERSE_METRIC_DIRECTION_ORDER[fromDirIndex];
}

export const ALL_METRIC_ROTATIONS: MetricRotationAngle[] = [MetricRotationAngle.CW1,
MetricRotationAngle.CW2, MetricRotationAngle.CW3, MetricRotationAngle.O];

/**
 * @param dirA 
 * @param dirB 
 * @return rotation how much angle to rotate dirA to dirB
 */
export function rotationByRotatingDirA2B(dirA:MetricDirection2D, dirB: MetricDirection2D): MetricRotationAngle {
    const dirAIndex = METRIC_DIRECTION_ORDER.findIndex((item)=>item===dirA);
    const dirBIndex = METRIC_DIRECTION_ORDER.findIndex((item)=>item===dirB);

    const stepToRotate = (dirBIndex - dirAIndex) % METRIC_DIRECTION_ORDER.length;
    
    return index2MetricRotation[stepToRotate];
}