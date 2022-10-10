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
        (el: types.GenerateFiles) => el.id.pattern.toString() === optionsMarker.pattern.toString()
        && el.id.pathToMarker.toString() === optionsMarker.pathToMarker.toString()
        && el.id.markerTemplate.toString() === optionsMarker.markerTemplate.toString(),
    );
    if (typeof foundElement === 'object') {
        return foundElement.onceInsert;
    }

    return false;
};
