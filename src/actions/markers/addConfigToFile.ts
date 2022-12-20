// Core
import fs from 'fs';

// Types
import * as types from './types';

export const addConfigToFile = ({ settingsMarker, nameConfigGenerateForOnceInsert }: types.AddConfigToFile) => {
    if (settingsMarker.onceInsert) {
        const configGenerateFile = fs.readFileSync(nameConfigGenerateForOnceInsert, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const newData = parsedData.map((el) => ({ ...el, onceInsert: settingsMarker.onceInsert }));

        if (!parsedData.some((el) => el.id.pattern.toString() === settingsMarker.pattern.toString()
        && el.id.pathToMarker.toString() === settingsMarker.pathToMarker.toString()
        && el.id.markerTemplate.toString() === settingsMarker.markerTemplate.toString())) {
            newData.push({
                id: {
                    pattern:        settingsMarker.pattern.toString(),
                    pathToMarker:   settingsMarker.pathToMarker,
                    markerTemplate: settingsMarker.markerTemplate,
                },
                onceInsert: true,
            });
        }

        fs.writeFileSync(nameConfigGenerateForOnceInsert, JSON.stringify(newData));
    }
};
