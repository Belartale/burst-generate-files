// Core
import fs from 'fs';

// Types
import * as types from './types';

export const addConfigToFile = ({ optionsMarker, configGenerateNameForOnceInsert }: types.AddConfigToFile) => {
    if (optionsMarker.onceInsert) {
        const configGenerateFile = fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const newData = parsedData.map((el) => ({ ...el, onceInsert: optionsMarker.onceInsert }));

        if (!parsedData.some((el) => String(el.id.pathToMarker) === String(optionsMarker.pathToMarker)
        && String(el.id.markerTemplate) === String(optionsMarker.markerTemplate))) {
            newData.push({
                id: {
                    pathToMarker:   optionsMarker.pathToMarker,
                    markerTemplate: optionsMarker.markerTemplate,
                },
                onceInsert: true,
            });
        }

        fs.writeFileSync(configGenerateNameForOnceInsert, JSON.stringify(newData));
    }
};
