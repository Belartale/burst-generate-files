//Utils
import { makeAbsolutePath } from './utils/makeAbsolutePath';
import { getSelectedItem } from './utils/getSelectedItem';
import { getSelectedName } from './utils/getSelectedName';
import { createFiles } from './utils/createFiles';
import { markers } from './utils/markers';
import { onComplete } from './utils/onComplete';
import { checkError } from './utils/checkError';
import { catchErrors } from './utils/catchErrors';
import { removeEntity } from './utils/removeEntity';

// Constants
import { constantForRemovingEntity, PROJECT_ROOT } from './constants';

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
            PROJECT_ROOT,
        });
    }

    if (configItemWithAbsolutePath.onComplete) {
        onComplete({ configItem: configItemWithAbsolutePath });
    }
};

export const customGen = (
    options: typesCommon.OptionCustomGen[],
) => {
    try {
        checkError(options, 'customGen');
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
    options: typesCommon.OptionCLIGen[],
): Promise<void> => {
    try {
        checkError(options, 'CLIGen');
        const selectedConfigItem: typesCommon.OptionCLIGen = await getSelectedItem(options);
        console.log('selectedConfigItem', selectedConfigItem);

        if (typeof selectedConfigItem !== 'string' && Array.isArray(selectedConfigItem.templates)) {
            console.log('ARRAY First if');
            for await (const iteratorOption of selectedConfigItem.templates) {
                const selectedNames: types.GetSelectedName[] = await getSelectedName(iteratorOption.stringsReplacers);

                mainActions({ configItem: iteratorOption, selectedNames, PROJECT_ROOT });
            }

            return;
        }

        if (selectedConfigItem.name === constantForRemovingEntity) {
            console.log('remove GEN11');
            removeEntity({ options });

            return;
        }
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
