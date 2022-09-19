// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Constants
import { configGenerateNameForOnceInsert } from '../../constants';

// Utils
import { replaceWordCase } from '../replaceWordCase';
import { addConfigToFile } from './addConfigToFile';
import { defineMarkerAndAdd } from './defineMarkerAndAdd';
import { checkIsOnceInsertMarker } from './checkIsOnceInsertMarker';

// Types
import * as types from './types';

export const markers = ({ markers, selectedNames, PROJECT_ROOT }: types.AddMarkerFiles) => {
    if (
        (markers
        && markers.find((el) => el.onceInsert === true)
        && !fs.existsSync(configGenerateNameForOnceInsert))
        || (markers
        && markers.find((el) => el.onceInsert === true)
        && fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(configGenerateNameForOnceInsert, JSON.stringify([]));
    }

    markers.forEach((optionsMarker: types.OptionsMarker) => {
        if (optionsMarker.onceInsert && checkIsOnceInsertMarker({ optionsMarker, configGenerateNameForOnceInsert })) {
            console.log(chalk.yellow('This marker previously inserted !!!'));
            console.table(optionsMarker);

            return;
        }

        const pathFile = resolve(PROJECT_ROOT, optionsMarker.pathToMarker);

        const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

        const dataRedFileReplaced = defineMarkerAndAdd({ optionsMarker, dataRedFile });

        const resultData = replaceWordCase({
            string:            dataRedFileReplaced,
            stringsForReplace: selectedNames,
        });
        fs.writeFileSync(
            pathFile,
            resultData,
        );

        if (optionsMarker.onceInsert) {
            addConfigToFile({ optionsMarker, configGenerateNameForOnceInsert });
        }
    });
};
