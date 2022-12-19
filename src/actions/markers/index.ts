// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Constants
import { nameConfigGenerateForOnceInsert } from '../../constants';

// Utils
import { replaceWordCase } from '../../utils';

// Functions
import { addConfigToFile } from './addConfigToFile';
import { defineMarkerAndAddMarkerTemplate } from './defineMarkerAndAddMarkerTemplate';
import { checkIsOnceInsertMarker } from './checkIsOnceInsertMarker';

// Types
import * as types from './types';

export const markers = ({ markers, selectedNames, PROJECT_ROOT }: types.AddMarkerFiles) => {
    const nameConfigGenerateForOnceInsertResolvedPath = resolve(PROJECT_ROOT, nameConfigGenerateForOnceInsert);

    if (
        (markers
        && markers.find((el) => el.onceInsert === true)
        && !fs.existsSync(nameConfigGenerateForOnceInsertResolvedPath))
        || (markers
        && markers.find((el) => el.onceInsert === true)
        && fs.readFileSync(nameConfigGenerateForOnceInsertResolvedPath, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(nameConfigGenerateForOnceInsertResolvedPath, JSON.stringify([]));
    }

    markers.forEach((optionsMarker: types.OptionsMarker) => {
        if (
            optionsMarker.onceInsert
            && checkIsOnceInsertMarker(
                { optionsMarker, nameConfigGenerateForOnceInsert: nameConfigGenerateForOnceInsertResolvedPath },
            )) {
            console.log(chalk.yellow('This marker previously inserted !!!'));
            console.log(optionsMarker);

            return;
        }

        const mainActionsWithMarkers = (pathFile: string) => {
            const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

            const dataRedFileAddedMarkers = defineMarkerAndAddMarkerTemplate(
                { optionsMarker, dataRedFile },
            );

            const resultData = replaceWordCase({
                string:            dataRedFileAddedMarkers,
                stringsForReplace: selectedNames,
            });
            fs.writeFileSync(
                pathFile,
                resultData,
            );
        };

        if (typeof optionsMarker.pathToMarker === 'string' && !Array.isArray(optionsMarker.pathToMarker)) {
            mainActionsWithMarkers(replaceWordCase({
                string:            optionsMarker.pathToMarker,
                stringsForReplace: selectedNames,
            }));
        }
        if (Array.isArray(optionsMarker.pathToMarker)) {
            optionsMarker.pathToMarker.forEach((path) => mainActionsWithMarkers(replaceWordCase({
                string:            path,
                stringsForReplace: selectedNames,
            })));
        }

        if (optionsMarker.onceInsert) {
            addConfigToFile(
                { optionsMarker, nameConfigGenerateForOnceInsert: nameConfigGenerateForOnceInsertResolvedPath },
            );
        }
    });
};
