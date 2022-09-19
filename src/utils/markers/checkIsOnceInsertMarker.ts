// Core
import fs from 'fs';

// Types
import * as types from './types';

export const checkIsOnceInsertMarker = (
    { optionsMarker, configGenerateNameForOnceInsert }: types.CheckIsOnceInsertMarker,
) => {
    const dataFile = fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' });

    const parsedData = JSON.parse(dataFile);

    const foundElement: types.GenerateFiles = parsedData.find(
        (el: types.GenerateFiles) => el.id.pattern === String(optionsMarker.pattern)
        && el.id.pathToMarker === optionsMarker.pathToMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate,
    );
    if (typeof foundElement === 'object') {
        return foundElement.onceInsert;
    }

    return false;
};
