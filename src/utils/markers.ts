// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import * as types from '../types';


const addConfigToFile = ({ optionsMarker, fileNameConfig }: types.AddConfigToFile) => {
    if (optionsMarker.onceInsert) {
        const configGenerateFile = fs.readFileSync(fileNameConfig, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const data: types.GenerateFiles[] = [ ...parsedData ];

        const newData = data.map((el) => ({ ...el, wasInsertMarker: optionsMarker.onceInsert }));

        if (!parsedData.some((el) => el.id.marker === optionsMarker.marker
        && el.id.pathToMarker === optionsMarker.pathToMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate)) {
            newData.push({
                id: {
                    pathToMarker:   optionsMarker.pathToMarker,
                    marker:         typeof optionsMarker.marker === 'object' ? optionsMarker.marker.value : optionsMarker.marker,
                    markerTemplate: optionsMarker.markerTemplate,
                },
                wasInsertMarker: true,
            });
        }

        fs.writeFileSync(fileNameConfig, JSON.stringify(newData));
    }
};

const defineMarkerAndAdd = ({ optionsMarker, dataRedFile, tabs }: types.DefineMarkerAndAdd) => {
    const getOptionMarkerValue = (): string => {
        if (typeof optionsMarker.marker === 'object' && optionsMarker.marker.value) {
            return optionsMarker.marker.value;
        }

        return optionsMarker.marker as string;
    };

    const reg = new RegExp(
        typeof optionsMarker.marker === 'object' && optionsMarker.marker.regExpValue ? optionsMarker.marker.regExpValue : optionsMarker.marker as string,
        typeof optionsMarker.marker === 'object' && optionsMarker.marker.regExpFlags ? optionsMarker.marker.regExpFlags : 'g',
    );
    let dataRedFileReplaced = dataRedFile;

    if (typeof optionsMarker.whereInsertMarker === 'undefined' || optionsMarker.whereInsertMarker === 'after marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, getOptionMarkerValue() + '\n' + tabs + optionsMarker.markerTemplate);
    }
    if (optionsMarker.whereInsertMarker === 'before marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, optionsMarker.markerTemplate + '\n' + tabs + getOptionMarkerValue());
    }

    return dataRedFileReplaced;
};

const checkIsOnceInsertMarker = ({ optionsMarker, fileNameConfig }: types.CheckIsOnceInsertMarker) => {
    const dataFile = fs.readFileSync(fileNameConfig, { encoding: 'utf-8' });

    const parsedData = JSON.parse(dataFile);

    const foundElement: types.GenerateFiles = parsedData.find(
        (el: types.GenerateFiles) => el.id.marker === optionsMarker.marker
        && el.id.pathToMarker === optionsMarker.pathToMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate,
    );
    if (typeof foundElement === 'object') {
        return foundElement.wasInsertMarker;
    }

    return false;
};

export const markers = ({ markers, selectedNames, PROJECT_ROOT }: types.AddMarkerFiles) => {
    const fileNameConfig = 'config.generate.files.json';

    if (
        (markers
        && markers.find((el) => el.onceInsert === true)
        && !fs.existsSync(fileNameConfig))
        || (markers
        && markers.find((el) => el.onceInsert === true)
        && fs.readFileSync(fileNameConfig, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(fileNameConfig, JSON.stringify([]));
    }

    markers?.forEach((optionsMarker: types.OptionsMarker) => {
        if (optionsMarker.onceInsert && checkIsOnceInsertMarker({ optionsMarker, fileNameConfig })) {
            console.log(chalk.yellow('This marker previously inserted !!!'));
            console.table(optionsMarker);

            return;
        }

        const pathFile = resolve(PROJECT_ROOT, optionsMarker.pathToMarker);

        let tabs: types.DefineMarkerAndAdd['tabs'] = '';

        const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

        dataRedFile
            .split(/\r?\n/)
            .forEach((string: string) => {
                if (string.includes(
                    typeof optionsMarker.marker === 'string' ? optionsMarker.marker : optionsMarker.marker.value,
                )) {
                    string.split('').every((symbolOfLine) => {
                        if (symbolOfLine === ' ') {
                            tabs += ' ';

                            return true;
                        }

                        return false;
                    });
                }
            });

        const dataRedFileReplaced = defineMarkerAndAdd({ optionsMarker, dataRedFile, tabs });

        const resultData = replaceWordCase({
            string:            dataRedFileReplaced,
            stringsForReplace: selectedNames,
        });
        fs.writeFileSync(
            pathFile,
            resultData,
        );

        if (optionsMarker.onceInsert) {
            addConfigToFile({ optionsMarker, fileNameConfig });
        }
    });
};
