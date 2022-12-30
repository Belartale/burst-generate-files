//Utils
import {
    catchErrors,
    makeAbsolutePath,
} from './utils';

// Actions
import {
    checkError,
    getSelectedItem,
    getSelectedName,
    selectDirectory,
    createFiles,
    markers,
    onComplete,
} from './actions';

// Constants
import { PROJECT_ROOT } from './constants';

// Types
import * as typesCommon from './types';
import * as typesActions from './actions/types';

const mainActions = ({ setting, selectedNames, PROJECT_ROOT }: typesCommon.MainActions) => {
    createFiles({
        pathToTemplate: setting.pathToTemplate,
        outputPath:     setting.outputPath,
        selectedNames,
    });

    if (setting.markers) {
        markers({
            markers: setting.markers,
            selectedNames,
            PROJECT_ROOT,
        });
    }

    if (setting.onComplete) {
        onComplete({ setting: setting });
    }
};

export const customGen = (
    settings: typesCommon.SettingCustomGen[],
    optionalSettings: typesCommon.OptionalSettings,
) => {
    try {
        const NEW_PROJECT_ROOT = optionalSettings && optionalSettings.rootPath
            ? optionalSettings.rootPath : PROJECT_ROOT;

        checkError({
            whichFunction: 'customGen',
            settings,
            optionalSettings,
            PROJECT_ROOT:  NEW_PROJECT_ROOT,
        });
        settings.forEach((setting) => {
            mainActions({
                setting:       makeAbsolutePath({ PROJECT_ROOT: NEW_PROJECT_ROOT, setting }),
                selectedNames: setting.stringsReplacers,
                PROJECT_ROOT:  NEW_PROJECT_ROOT,
            });
        });
    } catch (error: any) {
        catchErrors(error);
    }
};

export const CLIGen = async (
    settings: typesCommon.SettingCLIGen[],
    optionalSettings?: typesCommon.OptionalSettings,
): Promise<void> => {
    try {
        const NEW_PROJECT_ROOT = optionalSettings && optionalSettings.rootPath
            ? optionalSettings.rootPath : PROJECT_ROOT;

        checkError({
            whichFunction: 'CLIGen',
            settings,
            optionalSettings,
            PROJECT_ROOT:  NEW_PROJECT_ROOT,
        });
        const selectedConfigItem: typesCommon.SettingCLIGen = await getSelectedItem(settings);

        for await (const iteratorTemplate of selectedConfigItem.templates) {
            const selectedNames: typesActions.GetSelectedName[]
            = await getSelectedName(iteratorTemplate.stringsReplacers);

            const iteratorTemplateWithAbsolutePaths = makeAbsolutePath({
                PROJECT_ROOT: NEW_PROJECT_ROOT,
                setting:      iteratorTemplate,
            }) as typesCommon.SettingCLIGenTemplate;

            await selectDirectory({
                template: iteratorTemplateWithAbsolutePaths,
                selectedNames,
            });

            mainActions({
                setting:      iteratorTemplateWithAbsolutePaths,
                selectedNames,
                PROJECT_ROOT: NEW_PROJECT_ROOT,
            });
        }
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
