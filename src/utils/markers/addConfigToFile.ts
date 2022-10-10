// Core
import fs from 'fs';

// Types
import * as types from './types';

export const addConfigToFile = ({ optionsMarker, configGenerateNameForOnceInsert }: types.AddConfigToFile) => {
    if (optionsMarker.onceInsert) {
        const configGenerateFile = fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const newData = parsedData.map((el) => ({ ...el, onceInsert: optionsMarker.onceInsert }));

        if (!parsedData.some((el) => el.id.pattern.toString() === optionsMarker.pattern.toString()
        && el.id.pathToMarker.toString() === optionsMarker.pathToMarker.toString()
        && el.id.markerTemplate.toString() === optionsMarker.markerTemplate.toString())) {
            newData.push({
                id: {
                    pattern:        optionsMarker.pattern.toString(),
                    pathToMarker:   optionsMarker.pathToMarker,
                    markerTemplate: optionsMarker.markerTemplate,
                },
                onceInsert: true,
            });
        }

        fs.writeFileSync(configGenerateNameForOnceInsert, JSON.stringify(newData));
    }
};
