export function getDiscreteRangeInclusive(from:{x:number,y:number},to:{x:number,y:number}) {
    let range:{x:number,y:number}[] = [];
    for (let x=from.x; x<=to.x; x++) {
        for (let y=from.y; y<=to.y; y++) {
            range.push({x:x,y:y});
        }
    }
    return range;
}