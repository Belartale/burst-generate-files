// Core
import fs from 'fs';
import { resolve } from 'path';

// Utils
import { replaceWordCase } from './replaceWordCase';

// Types
import { GenerateOptionsItem, optionsGenerationRow } from '../types';

export const addRowFiles = (selectedConfigItem: GenerateOptionsItem, selectedName: string) => {
    selectedConfigItem.addRowFiles?.forEach((element: optionsGenerationRow) => {
        const pathFile = resolve(
            replaceWordCase({
                string:          selectedConfigItem.outputPath,
                stringReplacers: selectedConfigItem.stringReplacers,
                selectedName:    selectedName,
            }) + '/' + element.pathFromOutputPath,
        );

        const dataRedFile = fs.readFileSync(pathFile, { encoding: 'utf-8' });

        const reg = new RegExp(element.marker, 'g');
        const dataRedFileReplaced = dataRedFile.replace(reg, element.marker + ' ' + element.generationRow);


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
