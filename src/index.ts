//Utils
import {
    catchErrors,
    makeAbsolutePath,
} from './utils';

// Actions
import {
    checkError,
    createFiles,
    getSelectedItem,
    getSelectedName,
    markers,
    onComplete,
} from './actions';

// Constants
import { PROJECT_ROOT } from './constants';

// Types
import * as typesCommon from './types';
import * as typesActions from './actions/types';

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

        for await (const iteratorOption of selectedConfigItem.templates) {
            const selectedNames: typesActions.GetSelectedName[]
            = await getSelectedName(iteratorOption.stringsReplacers);

            mainActions({ configItem: iteratorOption, selectedNames, PROJECT_ROOT });
        }
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
