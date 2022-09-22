// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Constants
import { configGenerateNameForOnceInsert } from '../../constants';

// Utils
import { replaceWordCase } from '../replaceWordCase';
import { addConfigToFile } from './addConfigToFile';
import { defineMarkerAndAddMarkerTemplate } from './defineMarkerAndAddMarkerTemplate';
import { checkIsOnceInsertMarker } from './checkIsOnceInsertMarker';

// Types
import * as types from './types';

export const markers = ({ markers, selectedNames, PROJECT_ROOT }: types.AddMarkerFiles) => {
    const configGenerateNameForOnceInsertResolvedPath = resolve(PROJECT_ROOT, configGenerateNameForOnceInsert);

    if (
        (markers
        && markers.find((el) => el.onceInsert === true)
        && !fs.existsSync(configGenerateNameForOnceInsertResolvedPath))
        || (markers
        && markers.find((el) => el.onceInsert === true)
        && fs.readFileSync(configGenerateNameForOnceInsertResolvedPath, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(configGenerateNameForOnceInsertResolvedPath, JSON.stringify([]));
    }

    markers.forEach((optionsMarker: types.OptionsMarker) => {
        if (
            optionsMarker.onceInsert
            && checkIsOnceInsertMarker(
                { optionsMarker, configGenerateNameForOnceInsert: configGenerateNameForOnceInsertResolvedPath },
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

        if (Array.isArray(optionsMarker.pathToMarker)) {
            optionsMarker.pathToMarker.forEach((element) => mainActionsWithMarkers(element));
        }

        if (typeof optionsMarker.pathToMarker === 'string' && !Array.isArray(optionsMarker.pathToMarker)) {
            mainActionsWithMarkers(optionsMarker.pathToMarker);
        }

        if (optionsMarker.onceInsert) {
            addConfigToFile(
                { optionsMarker, configGenerateNameForOnceInsert: configGenerateNameForOnceInsertResolvedPath },
            );
        }
    });
};
