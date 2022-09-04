// Core
import fs from 'fs';
import { resolve } from 'path';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import {
    TypesOptionsGenerationRow,
    TypesDefineMarkerAndAddRow,
    TypesAddRowFiles,
} from '../types';

const defineMarkerAndAddRow = ({ element, dataRedFile, tabs }: TypesDefineMarkerAndAddRow) => {
    const reg = new RegExp(element.marker, 'g');
    let dataRedFileReplaced = dataRedFile;

    if (typeof element.whereInsertRow === 'undefined'
                || element.whereInsertRow === 'after marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, element.marker + '\n' + tabs + element.generationRow);
    }
    if (element.whereInsertRow === 'before marker') {
        dataRedFileReplaced = dataRedFile.replace(reg, element.generationRow + '\n' + tabs + element.marker);
    }

    return dataRedFileReplaced;
};

export const addRowFiles = ({ selectedConfigItem, selectedName }: TypesAddRowFiles) => {
    selectedConfigItem.addRowFiles?.forEach((element: TypesOptionsGenerationRow) => {
        const pathFile = resolve(
            replaceWordCase({
                string:          selectedConfigItem.outputPath,
                stringReplacers: selectedConfigItem.stringReplacers,
                selectedName:    selectedName,
            }) + '/' + element.pathFromOutputPath,
        );

        let tabs: TypesDefineMarkerAndAddRow['tabs'] = '';

        const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

        dataRedFile
            .split(/\r?\n/)
            .forEach((string: string) => {
                if (string.includes(element.marker)) {
                    string.split('').every((symbolOfLine) => {
                        if (symbolOfLine === ' ') {
                            tabs += ' ';

                            return true;
                        }

                        return false;
                    });
                }
            });

        const dataRedFileReplaced = defineMarkerAndAddRow({ element, dataRedFile, tabs });

        const resultData = replaceWordCase({
            string:          dataRedFileReplaced,
            stringReplacers: selectedConfigItem.stringReplacers,
            selectedName:    selectedName,
        });
        fs.writeFileSync(
            pathFile,
            resultData,
        );
    });
};
