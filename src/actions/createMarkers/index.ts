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

export const createMarkers = ({ markers, selectedNames, rootPath }: types.CreateMarkers) => {
    const nameConfigGenerateForOnceInsertResolvedPath = resolve(rootPath, nameConfigGenerateForOnceInsert);

    if (
        (markers && markers.find((el) => el.onceInsert === true) && !fs.existsSync(nameConfigGenerateForOnceInsertResolvedPath)) ||
        (markers &&
            markers.find((el) => el.onceInsert === true) &&
            fs.readFileSync(nameConfigGenerateForOnceInsertResolvedPath, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(nameConfigGenerateForOnceInsertResolvedPath, JSON.stringify([]));
    }

    markers.forEach((settingsMarker: types.SettingsMarker) => {
        if (
            settingsMarker.onceInsert &&
            checkIsOnceInsertMarker({ settingsMarker, nameConfigGenerateForOnceInsert: nameConfigGenerateForOnceInsertResolvedPath })
        ) {
            console.warn(chalk.yellow('This marker previously inserted !!!'));
            console.warn(settingsMarker);

            return;
        }

        const mainActionsWithMarkers = (pathFile: string) => {
            const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

            const dataRedFileAddedMarkers = defineMarkerAndAddMarkerTemplate({ settingsMarker, dataRedFile });

            const resultData = replaceWordCase({
                string: dataRedFileAddedMarkers,
                stringsForReplace: selectedNames,
            });
            fs.writeFileSync(pathFile, resultData);
        };

        if (typeof settingsMarker.pathToMarker === 'string' && !Array.isArray(settingsMarker.pathToMarker)) {
            mainActionsWithMarkers(
                replaceWordCase({
                    string: settingsMarker.pathToMarker,
                    stringsForReplace: selectedNames,
                }),
            );
        }
        if (Array.isArray(settingsMarker.pathToMarker)) {
            settingsMarker.pathToMarker.forEach((path) =>
                mainActionsWithMarkers(
                    replaceWordCase({
                        string: path,
                        stringsForReplace: selectedNames,
                    }),
                ),
            );
        }

        if (settingsMarker.onceInsert) {
            addConfigToFile({ settingsMarker, nameConfigGenerateForOnceInsert: nameConfigGenerateForOnceInsertResolvedPath });
        }
    });
};
