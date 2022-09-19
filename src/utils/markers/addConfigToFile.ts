// Core
import fs from 'fs';

// Types
import * as types from './types';

export const addConfigToFile = ({ optionsMarker, configGenerateNameForOnceInsert }: types.AddConfigToFile) => {
    if (optionsMarker.onceInsert) {
        const configGenerateFile = fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const data: types.GenerateFiles[] = [ ...parsedData ];

        const newData = data.map((el) => ({ ...el, onceInsert: optionsMarker.onceInsert }));

        const convertIfRegExpToString = (pattern: types.OptionsMarker['pattern']) => {
            if (pattern === RegExp(pattern)) {
                return String(pattern);
            }

            return String(pattern);
        };

        if (!parsedData.some((el) => el.id.pattern === optionsMarker.pattern
        && el.id.pathToMarker === optionsMarker.pathToMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate)) {
            newData.push({
                id: {
                    pathToMarker:   optionsMarker.pathToMarker,
                    pattern:        convertIfRegExpToString(optionsMarker.pattern),
                    markerTemplate: optionsMarker.markerTemplate,
                },
                onceInsert: true,
            });
        }

        fs.writeFileSync(configGenerateNameForOnceInsert, JSON.stringify(newData));
    }
};
