// Core
import fs from 'fs';

// Types
import * as types from './types';

export const getDataTemplate = ({ template, tabs }: types.GetDataTemplate) => {
    if (fs.existsSync(template)) {
        const redFileMarker = fs.readFileSync(template, { encoding: 'utf-8' });

        const newString = redFileMarker
            .split(/\r?\n/)
            .map((line) => tabs + line)
            .join('\n')
            .trim();

        return tabs + newString;
    }

    return tabs + template;
};
