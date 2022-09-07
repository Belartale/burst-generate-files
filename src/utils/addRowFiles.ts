// Core
import fs from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import * as types from '../types';

const defineMarkerAndAddRow = ({ optionsGenerateRow, dataRedFile, tabs }: types.DefineMarkerAndAddRow) => {
    const reg = new RegExp(optionsGenerateRow.marker, 'g');
    let dataRedFileReplaced = dataRedFile;

    if (typeof optionsGenerateRow.whereInsertRow === 'undefined'
                || optionsGenerateRow.whereInsertRow === 'after marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, optionsGenerateRow.marker + '\n' + tabs + optionsGenerateRow.generationRow);
    }
    if (optionsGenerateRow.whereInsertRow === 'before marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, optionsGenerateRow.generationRow + '\n' + tabs + optionsGenerateRow.marker);
    }

    return dataRedFileReplaced;
};

const addConfigToFile = ({ optionsGenerateRow, fileNameConfig }: types.AddConfigToFile) => {
    if (optionsGenerateRow.onceInsertRow) {
        const configGenerateFile = fs.readFileSync(fileNameConfig, { encoding: 'utf-8' });

        const parsedData: types.GenerateFiles[] = JSON.parse(configGenerateFile);

        const data: types.GenerateFiles[] = [ ...parsedData ];

        const newData = data.map((el) => ({ ...el, wasInsertRow: optionsGenerateRow.onceInsertRow }));

        if (!parsedData.some((el) => el.id.marker === optionsGenerateRow.marker
        && el.id.pathFromOutputPath === optionsGenerateRow.pathFromOutputPath
        && el.id.generationRow === optionsGenerateRow.generationRow)) {
            newData.push({
                id: {
                    pathFromOutputPath: optionsGenerateRow.pathFromOutputPath,
                    marker:             optionsGenerateRow.marker,
                    generationRow:      optionsGenerateRow.generationRow,
                },
                wasInsertRow: true,
            });
        }

        fs.writeFileSync(fileNameConfig, JSON.stringify(newData));
    }
};
const checkIsOnceInsertRow = ({ optionsGenerateRow, fileNameConfig }: types.CheckIsOnceInsertRow) => {
    const dataFile = fs.readFileSync(fileNameConfig, { encoding: 'utf-8' });

    const parsedData = JSON.parse(dataFile);

    const foundElement: types.GenerateFiles = parsedData.find(
        (el: types.GenerateFiles) => el.id.marker === optionsGenerateRow.marker
        && el.id.pathFromOutputPath === optionsGenerateRow.pathFromOutputPath
        && el.id.generationRow === optionsGenerateRow.generationRow,
    );
    if (typeof foundElement === 'object') {
        return foundElement.wasInsertRow;
    }

    return false;
};

export const addRowFiles = ({ selectedConfigItem, selectedName }: types.AddRowFiles) => {
    const fileNameConfig = 'config.generate.files.json';

    if (
        (selectedConfigItem.addRowFiles
        && selectedConfigItem.addRowFiles.find((el) => el.onceInsertRow === true)
        && !fs.existsSync(fileNameConfig))
        || (selectedConfigItem.addRowFiles
        && selectedConfigItem.addRowFiles.find((el) => el.onceInsertRow === true)
        && fs.readFileSync(fileNameConfig, { encoding: 'utf-8' }) === '')
    ) {
        fs.writeFileSync(fileNameConfig, JSON.stringify([]));
    }

    selectedConfigItem.addRowFiles?.forEach((optionsGenerateRow: types.OptionsGenerateRow) => {
        if (optionsGenerateRow.onceInsertRow && checkIsOnceInsertRow({ optionsGenerateRow, fileNameConfig })) {
            console.log(chalk.yellow('This row previously inserted !!!'));
            console.table(optionsGenerateRow);

            return;
        }

        const pathFile = resolve(
            replaceWordCase({
                string:          selectedConfigItem.outputPath,
                stringReplacers: selectedConfigItem.stringReplacers,
                selectedName:    selectedName,
            }) + '/' + optionsGenerateRow.pathFromOutputPath,
        );

        let tabs: types.DefineMarkerAndAddRow['tabs'] = '';

        const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

        dataRedFile
            .split(/\r?\n/)
            .forEach((string: string) => {
                if (string.includes(optionsGenerateRow.marker)) {
                    string.split('').every((symbolOfLine) => {
                        if (symbolOfLine === ' ') {
                            tabs += ' ';

                            return true;
                        }

                        return false;
                    });
                }
            });

        const dataRedFileReplaced = defineMarkerAndAddRow({ optionsGenerateRow, dataRedFile, tabs });

        const resultData = replaceWordCase({
            string:          dataRedFileReplaced,
            stringReplacers: selectedConfigItem.stringReplacers,
            selectedName:    selectedName,
        });
        fs.writeFileSync(
            pathFile,
            resultData,
        );

        if (optionsGenerateRow.onceInsertRow) {
            addConfigToFile({ optionsGenerateRow, fileNameConfig });
        }
    });
};
