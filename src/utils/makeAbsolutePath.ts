// Core
import { resolve } from 'path';

// Types
import * as types from '../types';

export const makeAbsolutePath = ({ PROJECT_ROOT, option }: types.MakeAbsolutePath) => {
    return {
        ...option,
        pathToTemplate: resolve(PROJECT_ROOT, option.pathToTemplate),
        outputPath:   resolve(PROJECT_ROOT, option.outputPath),
    };
};
