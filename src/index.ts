// Core
import chalk from 'chalk';

//Utils
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { addRowFiles } from './utils/addRowFiles';
import { checkError } from './utils/checkError';

// Types
import * as types from './types';
import { onComplete } from './utils/onComplete';

const mainActions = ({ selectedConfigItem, selectedNames }: types.MainActions) => {
    createFiles({
        fromFolderPath: selectedConfigItem.pathTemplate,
        toPath:         replaceWordCase(
            {
                string:                  selectedConfigItem.outputPath,
                arrayStringAndNewString: selectedNames,
            },
        ),
        selectedNames,
    });

    if (selectedConfigItem.addRowFiles) {
        addRowFiles({ selectedConfigItem, selectedNames });
    }

    if (selectedConfigItem.onComplete) {
        onComplete({ selectedConfigItem, selectedNames });
    }
};

const optionsMutate = (options: types.OptionO[]): types.Option[] => {
    const result = options.map((option) =>  {
        if (!Array.isArray(option.stringsReplacers) && typeof option.stringsReplacers === 'string') {
            return {
                ...option,
                stringsReplacers: [ option.stringsReplacers ],
            };
        }

        return option;
    });

    return result as types.Option[];
};


// export const generateTemplateFile = (
//     { PROJECT_ROOT, option }: types.GenerateTemplateFile,
// ) => {
//     const getStringsReplacers = (option: types.OptionGTF) => {
//         let result: [] | string[] = [];

//         option.stringsReplacers.forEach((obj) => {
//             result = [ ...result, obj.string ];
//         });

//         return result;
//     };
//     const getNewStrings = (option: types.OptionGTF) => {
//         let result: [] | types.GetSelectedName[] = [];

//         option.stringsReplacers.forEach((obj) => {
//             result = [
//                 ...result, {
//                     ...obj,
//                     newString: obj.newString.split(' '),
//                 },
//             ];
//         });

//         return result;
//     };

//     try {
//         checkError(PROJECT_ROOT, [{ ...option, stringsReplacers: getStringsReplacers(option) }]);

//         mainActions({ selectedConfigItem: { ...option, stringsReplacers: getStringsReplacers(option) },
//             selectedNames:      getNewStrings(option),
//         });

//         return true;
//     } catch (error: any) {
//         console.error(chalk.red('Error burst-generate-files ↓'));
//         console.error(error.message);

//         return JSON.parse(replaceWordCase({
//             string:                  JSON.stringify(option),
//             arrayStringAndNewString: getNewStrings(option),
//         }));
//     }
// };

export const generationCLI = async (
    PROJECT_ROOT: string, options: types.OptionO[],
): Promise<void> => {
    try {
        const optionsMutated = optionsMutate(options);
        checkError(PROJECT_ROOT, optionsMutated);

        const selectedConfigItem: types.Option = await getSelectedItem({ options: optionsMutated, PROJECT_ROOT });

        const selectedNames: types.GetSelectedName[] = await getSelectedName(selectedConfigItem.stringsReplacers);

        mainActions({ selectedConfigItem, selectedNames });
    } catch (error: any) {
        console.error(chalk.red('Error burst-generate-files ↓'));
        console.error(error.message);
    }
};

// exports.generateTemplateFile = generateTemplateFile;
exports.generationCLI = generationCLI;
