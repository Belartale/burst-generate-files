// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Constants
import { configGenerateNameForOnceInsert } from '../constants';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import * as types from '../types';

const addConfigToFile = ({ optionsMarker, configGenerateNameForOnceInsert }: types.AddConfigToFile) => {
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
        && el.id.pathMarker === optionsMarker.pathMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate)) {
            newData.push({
                id: {
                    pathMarker:     optionsMarker.pathMarker,
                    pattern:        convertIfRegExpToString(optionsMarker.pattern),
                    markerTemplate: optionsMarker.markerTemplate,
                },
                onceInsert: true,
            });
        }

        fs.writeFileSync(configGenerateNameForOnceInsert, JSON.stringify(newData));
    }
};

const defineMarkerAndAdd = ({ optionsMarker, dataRedFile }: types.DefineMarkerAndAdd) => {
    const isLineOrTemplate = (markerTemplate: types.OptionsMarker['markerTemplate'], tabs: string) => {
        if (fs.existsSync(markerTemplate)) {
            const redFileMarker = fs.readFileSync(markerTemplate, { encoding: 'utf-8' });

            const newString = redFileMarker.split(/\r?\n/).map((line) => tabs + line)
                .join('\n')
                .trim();

            return tabs + newString;
        }

        return tabs + markerTemplate;
    };

    const newDataRedFile: string = dataRedFile.split(/\r?\n/).map((line: string) => {
        const reg = new RegExp(`^.*(${optionsMarker.pattern})$`, 'g');

        if (
            (typeof optionsMarker.pattern === 'string' && line.match(reg))
            || (optionsMarker.pattern === RegExp(optionsMarker.pattern) && line.match(optionsMarker.pattern))
        ) {
            let tabs: string = '';

            line.split('').every((symbolOfLine) => {
                if (symbolOfLine === ' ') {
                    tabs += ' ';

                    return true;
                }

                return false;
            });

            if (typeof optionsMarker.genDirection === 'undefined' || optionsMarker.genDirection === 'after') {
                return line + '\n' + isLineOrTemplate(optionsMarker.markerTemplate, tabs);
            }
            if (optionsMarker.genDirection === 'before') {
                console.log(`tabs >>> ${ tabs.length }`);

                return isLineOrTemplate(optionsMarker.markerTemplate, tabs) + '\n' + line;
            }
        }

        return line;
    })
        .join('\n');

    return newDataRedFile;
};

const checkIsOnceInsertMarker = ({ optionsMarker, configGenerateNameForOnceInsert }: types.CheckIsOnceInsertMarker) => {
    const dataFile = fs.readFileSync(configGenerateNameForOnceInsert, { encoding: 'utf-8' });

    const parsedData = JSON.parse(dataFile);

    const foundElement: types.GenerateFiles = parsedData.find(
        (el: types.GenerateFiles) => el.id.pattern === String(optionsMarker.pattern)
        && el.id.pathMarker === optionsMarker.pathMarker
        && el.id.markerTemplate === optionsMarker.markerTemplate,
    );
    if (typeof foundElement === 'object') {
        return foundElement.onceInsert;
    }

    return false;
};

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

        const pathFile = resolve(PROJECT_ROOT, optionsMarker.pathMarker);

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
