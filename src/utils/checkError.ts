import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: types.GenerateOptionsItem[]) => {
    if (typeof PROJECT_ROOT !== 'string') {
        throw new Error('First argument must be string!');
    }

    if (!Array.isArray(options)) {
        throw new Error('Second argument must be array!');
    }

    options.forEach((option) => {
        if (typeof option !== 'object') {
            throw new Error('Second argument must be object!');
        }

        if (typeof option.name !== 'string') {
            throw new Error('Name must be string');
        }

        if (!Array.isArray(option.stringsReplacers)) {
            throw new Error('stringsReplacers must be Array');
        }

        if (typeof option.pathTemplate !== 'string') {
            throw new Error('pathTemplate must be string');
        }

        if (typeof option.outputPath !== 'string') {
            throw new Error('Name must be string');
        }

        if (typeof option.stringsReplacers !== 'string') {
            throw new Error('Name must be string');
        }
    });
};
