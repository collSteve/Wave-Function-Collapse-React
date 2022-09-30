export function areArraysSameLength<T>(...args:T[][]) {
    for (let i=1; i<args.length; i++) {
        if (args[i].length !== args[i-1].length) {
            return false;
        }
    }
    return true;
}