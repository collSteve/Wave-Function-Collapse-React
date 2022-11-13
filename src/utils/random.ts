/**
 * 
 * @param array 
 * @returns a ramdom item from array,
 *          or null if array is empty
 */
export function randomItemFromArrayGeneral<T>(array:T[]): T|null {
    if (array.length <=0) {
        return null;
    }
    return array[Math.floor(Math.random()*array.length)];
}

/**
 * Error thrown if array has no item
 * @param array 
 * @returns a ramdom item from array,
 * 
 */
 export function randomItemFromArrayStrict<T>(array:T[]): T {
    if (array.length <=0) {
        throw new Error("Array is empty");
    }
    return array[Math.floor(Math.random()*array.length)];
}