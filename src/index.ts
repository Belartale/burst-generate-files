//Utils
import {
    catchErrors,
    makeAbsolutePath,
} from './utils';

// Actions
import {
    checkError,
    createFiles,
    directorySelection,
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

const mainActions = ({ setting, selectedNames, PROJECT_ROOT }: typesCommon.MainActions) => {
    const settingWithAbsolutePath = makeAbsolutePath({ PROJECT_ROOT, setting });

    createFiles({
        pathToTemplate: settingWithAbsolutePath.pathToTemplate,
        outputPath:     settingWithAbsolutePath.outputPath,
        selectedNames,
    });

    if (settingWithAbsolutePath.markers) {
        markers({
            markers: settingWithAbsolutePath.markers,
            selectedNames,
            PROJECT_ROOT,
        });
    }

    if (settingWithAbsolutePath.onComplete) {
        onComplete({ setting: settingWithAbsolutePath });
    }
};

export const customGen = (
    settings: typesCommon.SettingCustomGen[],
    optionalSettings: typesCommon.OptionalSettings,
) => {
    try {
        checkError({
            whichFunction: 'customGen',
            settings,
            optionalSettings,
        });
        settings.forEach((setting) => {
            mainActions({
                setting,
                selectedNames: setting.stringsReplacers,
                PROJECT_ROOT:  optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT,
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
        checkError({
            whichFunction: 'CLIGen',
            settings,
            optionalSettings,
        });
        const selectedConfigItem: typesCommon.SettingCLIGen = await getSelectedItem(settings);

        for await (const iteratorSetting of selectedConfigItem.templates) {
            const selectedNames: typesActions.GetSelectedName[]
            = await getSelectedName(iteratorSetting.stringsReplacers);

            directorySelection({
                template:     iteratorSetting,
                PROJECT_ROOT: optionalSettings && optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT,
                selectedNames,
                // PROJECT_ROOT: optionalSettings && optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT,
            });

            mainActions({
                setting:      iteratorSetting,
                selectedNames,
                PROJECT_ROOT: optionalSettings && optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT,
            });
        }
    } catch (error: any) {
        catchErrors(error);
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
