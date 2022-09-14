// Core
import chalk from 'chalk';

//Utils
import { makeAbsolutePath } from './utils/makeAbsolutePath';
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { addRowFiles } from './utils/addRowFiles';
import { onComplete } from './utils/onComplete';

// Types
import * as types from './types';

const mainActions = ({ configItem, selectedNames, PROJECT_ROOT }: types.MainActions) => {
    const configItemWithAbsolutePath = makeAbsolutePath({ PROJECT_ROOT, option: configItem });

    createFiles({
        fromFolderPath: configItemWithAbsolutePath.pathTemplate,
        toPath:         replaceWordCase({
            string:            configItemWithAbsolutePath.outputPath,
            stringsForReplace: selectedNames,
        }),
        selectedNames,
    });

    if (configItemWithAbsolutePath.addRowFiles) {
        addRowFiles({
            addRowFiles: configItemWithAbsolutePath.addRowFiles,
            outputPath:  configItemWithAbsolutePath.outputPath,
            selectedNames,
        });
    }

    if (configItemWithAbsolutePath.onComplete) {
        onComplete({ configItem: configItemWithAbsolutePath, selectedNames });
    }
};

export const generation = (
    PROJECT_ROOT: string, options: types.OptionOG[],
) => {
    try {
        options.forEach((option) => {
            if (!Array.isArray(option.stringsReplacers) && typeof option.stringsReplacers === 'object') {
                mainActions(
                    {
                        configItem:    option,
                        selectedNames: [ option.stringsReplacers ],
                        PROJECT_ROOT,
                    },
                );
            }
            if (Array.isArray(option.stringsReplacers)) {
                mainActions(
                    {
                        configItem:    option,
                        selectedNames: option.stringsReplacers,
                        PROJECT_ROOT,
                    },
                );
            }
        });
    } catch (error: any) {
        console.error(chalk.red('Error burst-generate-files ↓'));
        console.error(error.message);
    }
};

export const generationCLI = async (
    PROJECT_ROOT: string, options: types.OptionOCLI[],
): Promise<void> => {
    try {
        const selectedConfigItem: types.Option = await getSelectedItem(options);

        const selectedNames: types.GetSelectedName[] = await getSelectedName(selectedConfigItem.stringsReplacers);

        mainActions({ configItem: selectedConfigItem, selectedNames, PROJECT_ROOT });
    } catch (error: any) {
        console.error(chalk.red('Error burst-generate-files ↓'));
        console.error(error.message);
    }
};

exports.generation = generation;
exports.generationCLI = generationCLI;
