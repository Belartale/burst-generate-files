// Core
import fs from 'fs';

// Types
import * as types from './types';

export const isLineOrTemplate = (markerTemplate: types.OptionsMarker['markerTemplate'], tabs: string) => {
    const checkIsFile = (element: string) => {
        const isFileExists = fs.existsSync(element);

        if (isFileExists) {
            const redFileMarker = fs.readFileSync(element, { encoding: 'utf-8' });

            const newString = redFileMarker.split(/\r?\n/).map((line) => tabs + line)
                .join('\n')
                .trim();

            return tabs + newString;
        }

        return tabs + element;
    };

    if (Array.isArray(markerTemplate)) {
        let templates: [] | string[] = [];

        markerTemplate.forEach((pathToFile: string) => {
            const newString = checkIsFile(pathToFile);

            if (typeof newString === 'string') {
                templates = [ ...templates, newString ];
            }
        });

        return templates.join('\n');
    }

    if (typeof markerTemplate === 'string') {
        return checkIsFile(markerTemplate);
    }

    return tabs + markerTemplate;
};
