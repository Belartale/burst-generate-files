// Core
import chalk from 'chalk';

//Utils
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { addRowFiles } from './utils/addRowFiles';

// Types
import { TypesGenerateOptionsItem, TypesGetSelectedName } from './types';

const generateTemplateFiles = async (options: TypesGenerateOptionsItem[]): Promise<void> => {
    try {
        const selectedConfigItem: TypesGenerateOptionsItem = await getSelectedItem(options);

        const selectedName: TypesGetSelectedName = await getSelectedName();

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
        console.log(chalk.red('error generateTemplateFiles'));
        console.log(error);
    }
};

exports.generateTemplateFiles = generateTemplateFiles;
