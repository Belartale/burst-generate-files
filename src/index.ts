// Core
import colors from 'colors';

//Utils
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { addRowFiles } from './utils/addRowFiles';

// Types
import { GenerateOptionsItem } from './types';

export const generateTemplateFiles = async (options: GenerateOptionsItem[]): Promise<void> => {
    try {
        const selectedConfigItem: GenerateOptionsItem = await getSelectedItem(options);

        const selectedName: string = await getSelectedName();

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
            addRowFiles(selectedConfigItem, selectedName);
        }


        if (selectedConfigItem.onComplete) {
            selectedConfigItem.onComplete();
        }
    } catch (error) {
        console.log(colors.red('error generateTemplateFiles'));
        console.log(error);
    }
};

