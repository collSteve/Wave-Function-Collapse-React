export function rotation(angleDeg:number) {
    return {
        'WebkitTransform':`rotate(${angleDeg}deg)`,
        'MozTransform': `rotate(${angleDeg}deg)`,
        'msTransform': `rotate(${angleDeg}deg)`,
        'OTransform': `rotate(${angleDeg}deg)`,
        'transform': `rotate(${angleDeg}deg)`};
}