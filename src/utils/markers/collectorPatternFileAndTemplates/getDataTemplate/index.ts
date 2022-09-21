// Core
import fs from 'fs';
import { resolve } from 'path';

// Types
import * as types from './types';

export const getDataTemplate = ({ template, tabs, PROJECT_ROOT }: types.GetDataTemplate) => {
    const absolutePathToTemplate = resolve(PROJECT_ROOT, template);

    if (fs.existsSync(absolutePathToTemplate)) {
        const redFileMarker = fs.readFileSync(absolutePathToTemplate, { encoding: 'utf-8' });

        const newString = redFileMarker.split(/\r?\n/).map((line) => tabs + line)
            .join('\n')
            .trim();

        return tabs + newString;
    }

    return tabs + template;
};
