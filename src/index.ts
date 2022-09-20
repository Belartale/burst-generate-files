//Utils
import { makeAbsolutePath } from './utils/makeAbsolutePath';
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { markers } from './utils/markers';
import { onComplete } from './utils/onComplete';
// import { checkError } from './utils/checkError';
import { catchErrors } from './utils/catchErrors';

// Types
import * as typesCommon from './types';
import * as types from './utils/types';

const mainActions = ({ configItem, selectedNames, PROJECT_ROOT }: typesCommon.MainActions) => {
    const configItemWithAbsolutePath = makeAbsolutePath({ PROJECT_ROOT, option: configItem });

    createFiles({
        pathToTemplate: configItemWithAbsolutePath.pathToTemplate,
        outputPath:     configItemWithAbsolutePath.outputPath,
        selectedNames,
    });

    if (configItemWithAbsolutePath.markers) {
        markers({
            markers: configItemWithAbsolutePath.markers,
            selectedNames,
        });
    }

    if (configItemWithAbsolutePath.onComplete) {
        onComplete({ configItem: configItemWithAbsolutePath, selectedNames });
    }
};

export const customGen = (
    PROJECT_ROOT: string, options: typesCommon.OptionCustomGen[],
) => {
    try {
        // checkError(PROJECT_ROOT, options, 'customGen');
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
    PROJECT_ROOT: string, options: typesCommon.OptionCLIGen[],
): Promise<void> => {
    try {
        // checkError(PROJECT_ROOT, options, 'CLIGen');
        const selectedConfigItem: typesCommon.OptionCLIGen = await getSelectedItem(options);

        selectedConfigItem.templates.forEach(async (option) => {
            const selectedNames: types.GetSelectedName[] = await getSelectedName(option.stringsReplacers);

            mainActions({ configItem: option, selectedNames, PROJECT_ROOT });
        });
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
