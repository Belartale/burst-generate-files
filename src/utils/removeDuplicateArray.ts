export const removeDuplicateArray = <T = unknown>(array: T[]): T[] => {
    return [ ...new Set(array) ];
};
