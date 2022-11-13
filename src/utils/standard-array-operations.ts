export function extractSameElements<T>(array1:T[], array2:T[], isEqual:(a:T,b:T)=>boolean = (a,b)=>a===b) {
    const result:T[] = [];
    for (const element of array1) {
        if (include(array2, element, isEqual)) {
            result.push(element);
        }
    }
    return result;
}

export function include<T>(array:T[], element:T, isEqual:(a:T,b:T)=>boolean = (a,b)=>a===b) {
    for (const e of array) {
        if (isEqual(e, element)) {
            return true;
        }
    }
    return false;
}