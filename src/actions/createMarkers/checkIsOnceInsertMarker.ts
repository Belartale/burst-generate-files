// Core
import fs from 'fs';

// Types
import * as types from './types';

export const checkIsOnceInsertMarker = ({ settingsMarker, nameConfigGenerateForOnceInsert }: types.CheckIsOnceInsertMarker) => {
    const dataFile = fs.readFileSync(nameConfigGenerateForOnceInsert, { encoding: 'utf-8' });

    const parsedData = JSON.parse(dataFile);

    const foundElement: types.GenerateFiles = parsedData.find(
        (el: types.GenerateFiles) =>
            el.id.pattern.toString() === settingsMarker.pattern.toString() &&
            el.id.pathToMarker.toString() === settingsMarker.pathToMarker.toString() &&
            el.id.markerTemplate.toString() === settingsMarker.markerTemplate.toString(),
    );
    if (typeof foundElement === 'object') {
        return foundElement.onceInsert;
    }

    return false;
};
