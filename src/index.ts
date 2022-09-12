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

export const generateTemplateFiles = async (
    PROJECT_ROOT: string, options: types.GenerateOptionsItem[],
): Promise<void> => {
    try {
        checkError(PROJECT_ROOT, options);

        const selectedConfigItem: types.GenerateOptionsItem = await getSelectedItem({ options, PROJECT_ROOT });

        const selectedNames: types.GetSelectedName[] = await getSelectedName(selectedConfigItem.stringsReplacers);

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
    } catch (error: any) {
        console.error(chalk.red('Error burst-generate-files ↓'));
        console.error(error.message);
    }
};

exports.generateTemplateFiles = generateTemplateFiles;
