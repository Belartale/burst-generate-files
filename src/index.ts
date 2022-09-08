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

export const generateTemplateFiles = async (
    PROJECT_ROOT: string, options: types.GenerateOptionsItem[],
): Promise<void> => {
    try {
        const selectedConfigItem: types.GenerateOptionsItem = await getSelectedItem({ options, PROJECT_ROOT });

        const selectedName: types.GetSelectedName = await getSelectedName();

        createFiles({
            fromFolderPath: selectedConfigItem.pathTemplate,
            toPath:         replaceWordCase(
                {
                    string:          selectedConfigItem.outputPath,
                    stringReplacers: selectedConfigItem.stringReplacers,
                    selectedName,
                },
            ),
            selectedConfigItem,
            selectedName,
        });

        if (selectedConfigItem.addRowFiles) {
            addRowFiles({ selectedConfigItem, selectedName });
        }


        if (selectedConfigItem.onComplete) {
            selectedConfigItem.onComplete();
        }
    } catch (error) {
        console.log(chalk.red('Error generate files'));
        console.log(error);
    }
};

exports.generateTemplateFiles = generateTemplateFiles;
