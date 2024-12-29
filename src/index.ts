//Utils
import { catchErrors, makeAbsolutePath } from './utils';

// Actions
import { checkError, getSelectedItem, getSelectedName, selectDirectory, createFiles, markers, onComplete } from './actions';

// Constants
import { PROJECT_ROOT } from './constants';

// Types
import * as typesCommon from './types';
import * as typesActions from './actions/types';

const mainActions = ({ setting, selectedNames, PROJECT_ROOT }: typesCommon.MainActions) => {
    createFiles({
        pathToTemplate: setting.pathToTemplate,
        outputPath: setting.outputPath,
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

export const customGen = (settings: typesCommon.SettingCustomGen[], optionalSettings?: typesCommon.OptionalSettings) => {
    try {
        const NEW_PROJECT_ROOT = optionalSettings && optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT;

        checkError({
            settings,
            optionalSettings,
            PROJECT_ROOT: NEW_PROJECT_ROOT,
        });
        settings.forEach((setting) => {
            mainActions({
                setting: makeAbsolutePath({
                    PROJECT_ROOT: NEW_PROJECT_ROOT,
                    setting,
                }) as typesCommon.SettingCustomGen,
                selectedNames: setting.stringsReplacers,
                PROJECT_ROOT: NEW_PROJECT_ROOT,
            });
        });
    } catch (error) {
        catchErrors({ error, showFullError: optionalSettings?.showFullError });
    }
};

export const CLIGen = async (settings: typesCommon.SettingCLIGen[], optionalSettings?: typesCommon.OptionalSettings): Promise<void> => {
    try {
        const NEW_PROJECT_ROOT = optionalSettings && optionalSettings.rootPath ? optionalSettings.rootPath : PROJECT_ROOT;

        checkError({
            settings,
            optionalSettings,
            PROJECT_ROOT: NEW_PROJECT_ROOT,
        });
        const selectedConfigItem: typesCommon.SettingCLIGen = await getSelectedItem(settings);

        for await (const iteratorTemplate of selectedConfigItem.templates) {
            const selectedNames: typesActions.GetSelectedName[] = await getSelectedName(iteratorTemplate.stringsReplacers);

            const iteratorTemplateWithAbsolutePaths = makeAbsolutePath({
                PROJECT_ROOT: NEW_PROJECT_ROOT,
                setting: iteratorTemplate,
            }) as typesCommon.SettingCLIGenTemplate;

            if (!iteratorTemplate.outputPath || iteratorTemplate.selectDirectory === true) {
                // toto add error to checkError, if outputPath === undefined and selectDirectory === false >>> error
                const iteratorTemplateWithAbsolutePathsAndRequiredOutputPath: typesCommon.SettingCLIGenTemplateRequiredOutputPath = {
                    ...iteratorTemplateWithAbsolutePaths,
                    outputPath: iteratorTemplateWithAbsolutePaths.outputPath || NEW_PROJECT_ROOT,
                };

                await selectDirectory({
                    template: iteratorTemplateWithAbsolutePathsAndRequiredOutputPath,
                    selectedNames,
                });

                mainActions({
                    setting: iteratorTemplateWithAbsolutePathsAndRequiredOutputPath,
                    selectedNames,
                    PROJECT_ROOT: NEW_PROJECT_ROOT,
                });

                return;
            }

            mainActions({
                setting: iteratorTemplateWithAbsolutePaths as typesCommon.SettingCLIGenTemplateRequiredOutputPath,
                selectedNames,
                PROJECT_ROOT: NEW_PROJECT_ROOT,
            });
        }
    } catch (error) {
        catchErrors({ error, showFullError: optionalSettings?.showFullError });
    }
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
