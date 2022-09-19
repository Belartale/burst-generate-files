//Utils
import { makeAbsolutePath } from './utils/makeAbsolutePath';
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { replaceWordCase } from './utils/replaceWordCase';
import { markers } from './utils/markers';
import { onComplete } from './utils/onComplete';
import { checkError } from './utils/checkError';
import { catchErrors } from './utils/catchErrors';

// Types
import * as types from './types';

const mainActions = ({ configItem, selectedNames, PROJECT_ROOT }: types.MainActions) => {
    const configItemWithAbsolutePath = makeAbsolutePath({ PROJECT_ROOT, option: configItem });

    createFiles({
        pathToTemplate: configItemWithAbsolutePath.pathToTemplate,
        outputPath:     replaceWordCase({
            string:            configItemWithAbsolutePath.outputPath,
            stringsForReplace: selectedNames,
        }),
        selectedNames,
    });

    if (configItemWithAbsolutePath.markers) {
        markers({
            markers: configItemWithAbsolutePath.markers,
            selectedNames,
            PROJECT_ROOT,
        });
    }

    if (configItemWithAbsolutePath.onComplete) {
        onComplete({ configItem: configItemWithAbsolutePath, selectedNames });
    }
};

export const customGen = (
    PROJECT_ROOT: string, options: types.OptionCustomGenO[],
) => {
    try {
        checkError(PROJECT_ROOT, options, 'customGen');
        options.forEach((option) => {
            mainActions(
                {
                    configItem:    option,
                    selectedNames: option.stringsReplacers,
                    PROJECT_ROOT,
                },
            );
        });
    } catch (error: any) {
        catchErrors(error);
    }
};

export const CLIGen = async (
    PROJECT_ROOT: string, options: types.OptionCLIGenO[],
): Promise<void> => {
    try {
        checkError(PROJECT_ROOT, options, 'CLIGen');
        const selectedConfigItem: types.OptionCLIGenO = await getSelectedItem(options);

        const selectedNames: types.GetSelectedName[] = await getSelectedName(selectedConfigItem.stringsReplacers);

        mainActions({ configItem: selectedConfigItem, selectedNames, PROJECT_ROOT });
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
