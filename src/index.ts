// Core
import chalk from 'chalk';

//Utils
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { addRowFiles } from './utils/addRowFiles';

// Types
import * as types from './types';

// Cases
// lorem lorem =>
// __name__(noCase) === lorem Lorem lorem
// __name__(pascalCase) === LoremLorem
// __name__(constantCase) === LOREM_LOREM
// __name__(kebabCase) === lorem-lorem
// __name__ === loremLorem

// Example
// generateTemplateFiles([
//     {
//         name:            'Bus: /bus/__entityName__',
//         stringReplacers: '__entityName__',
//         pathTemplate:    './scripts/generate/templates/busEntity',
//         outputPath:      './src/bus/__entityName__',
//         addRowFiles:     [
//             {
//                 pathFromOutputPath: '../../init/redux/index.ts',
//                 marker:             '// Reducers MarkerGen',
//                 whereInsertRow:     'after marker',
//                 generationRow:      'import __entityName__ from \'../../bus/__entityName__/slice\';',
//                 onceInsertRow:      true,
//             },
//             {
//                 pathFromOutputPath: '../../init/redux/index.ts',
//                 marker:             '// MarkerGen add reducer',
//                 whereInsertRow:     'after marker',
//                 generationRow:      '__entityName__,',
//             },
//         ],
//         onComplete: () => {
//             console.log(chalk.green('Created bus entity !!!'));
//         },
//     },
// ]);

var fs = require('fs');

export const generateTemplateFiles = () => {
    console.log('text');


    fs.writeFile('filename.txt', 'Текст', function(error: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Файл создан');
        }
    });
};

// export const generateTemplateFiles = async (options: types.GenerateOptionsItem[]): Promise<void> => {
//     try {
//         const selectedConfigItem: types.GenerateOptionsItem = await getSelectedItem(options);

//         const selectedName: types.GetSelectedName = await getSelectedName();

//         createFiles({
//             fromFolderPath: selectedConfigItem.pathTemplate,
//             toPath:         replaceWordCase(
//                 {
//                     string:          selectedConfigItem.outputPath,
//                     stringReplacers: selectedConfigItem.stringReplacers,
//                     selectedName,
//                 },
//             ),
//             selectedConfigItem,
//             selectedName,
//         });

//         if (selectedConfigItem.addRowFiles) {
//             addRowFiles({ selectedConfigItem, selectedName });
//         }


//         if (selectedConfigItem.onComplete) {
//             selectedConfigItem.onComplete();
//         }
//     } catch (error) {
//         console.log(chalk.red('Error generate files'));
//         console.log(error);
//     }
// };

exports.generateTemplateFiles = generateTemplateFiles;
