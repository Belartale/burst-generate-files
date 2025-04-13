//Utils
import { catchErrors, makeAbsolutePath } from './utils';

// Actions
import {
    checkCLIGen,
    getSelectedItem,
    getSelectedName,
    selectDirectory,
    createFiles,
    createMarkers,
    onComplete,
    checkCustomGen,
    checkMarkersGen,
    checkMarkersOfCLIGen,
} from './actions';

// Constants
import { PROJECT_ROOT } from './constants';

// Types
import * as typesCommon from './types';
import * as typesActions from './actions/types';

const mainActions = ({ initSetting, setting, selectedNames, rootPath }: typesCommon.MainActions) => {
    createFiles({
        pathToTemplate: setting.pathToTemplate,
        outputPath: setting.outputPath,
        selectedNames,
    });

    if (setting.markers) {
        createMarkers({
            markers: setting.markers,
            selectedNames,
            rootPath: rootPath,
        });
    }

    if (setting.onComplete) {
        onComplete({
            init: initSetting,
            result: setting,
        });
    }
};

export const customGen = (settings: typesCommon.SettingCustomGen[], optionalSettings?: typesCommon.OptionalSettingsCustomGen) => {
    const newRootPath =
        optionalSettings && optionalSettings.rootPath && typeof optionalSettings.rootPath === 'string'
            ? optionalSettings.rootPath
            : PROJECT_ROOT;

    checkCustomGen({
        settings,
        optionalOfSettings: optionalSettings,
        rootPath: newRootPath,
    });

    settings.forEach((setting) => {
        const settingCopy = structuredClone({ ...setting, onComplete: null });

        mainActions({
            initSetting: settingCopy,
            setting: makeAbsolutePath({
                rootPath: newRootPath,
                setting,
            }) as typesCommon.SettingCustomGen,
            selectedNames: setting.stringsReplacers,
            rootPath: newRootPath,
        });
    });
};

export const CLIGen = async (
    settings: typesCommon.SettingCLIGen[],
    optionalSettings?: typesCommon.OptionalSettingsCLIGen,
): Promise<void> => {
    try {
        const newRootPath =
            optionalSettings && optionalSettings.rootPath && typeof optionalSettings.rootPath === 'string'
                ? optionalSettings.rootPath
                : PROJECT_ROOT;

        checkCLIGen({
            settings,
            optionalOfSettings: optionalSettings,
            rootPath: newRootPath,
        });

        const selectedConfigItem: typesCommon.SettingCLIGen = await getSelectedItem(settings);

        let indexOfIteratorTemplate = 0;

        for await (const iteratorTemplate of selectedConfigItem.templates) {
            const iteratorTemplateCopy = structuredClone({ ...iteratorTemplate, onComplete: null });

            const selectedNames: typesActions.GetSelectedName[] = await getSelectedName(iteratorTemplate.stringsReplacers);

            const iteratorTemplateWithAbsolutePaths = makeAbsolutePath({
                rootPath: newRootPath,
                setting: iteratorTemplate,
            }) as typesCommon.SettingCLIGenTemplate;

            if (!iteratorTemplate.outputPath || iteratorTemplate.selectDirectory === true) {
                const iteratorTemplateWithAbsolutePathsAndRequiredOutputPath: typesCommon.SettingCLIGenTemplateRequiredOutputPath = {
                    ...iteratorTemplateWithAbsolutePaths,
                    outputPath: iteratorTemplateWithAbsolutePaths.outputPath || newRootPath,
                };

                await selectDirectory({
                    template: iteratorTemplateWithAbsolutePathsAndRequiredOutputPath,
                    selectedNames,
                }).then(() => {
                    if (iteratorTemplate.markers) {
                        checkMarkersOfCLIGen({
                            settings: iteratorTemplate,
                            rootPath: newRootPath,
                            index: indexOfIteratorTemplate,
                        });
                    }
                });

                mainActions({
                    initSetting: iteratorTemplateCopy as typesCommon.SettingCLIGenTemplateRequiredOutputPath,
                    setting: iteratorTemplateWithAbsolutePathsAndRequiredOutputPath,
                    selectedNames,
                    rootPath: newRootPath,
                });

                return;
            }

            mainActions({
                initSetting: iteratorTemplateCopy as typesCommon.SettingCLIGenTemplateRequiredOutputPath,
                setting: iteratorTemplateWithAbsolutePaths as typesCommon.SettingCLIGenTemplateRequiredOutputPath,
                selectedNames,
                rootPath: newRootPath,
            });

            indexOfIteratorTemplate += 1;
        }
    } catch (error) {
        catchErrors({ error, showFullError: optionalSettings?.showFullError });
    }
};

export const markersGen = (settings: typesCommon.SettingMarkersGen, optionalSettings: typesCommon.OptionalSettingsMarkersGen) => {
    const newRootPath =
        optionalSettings && optionalSettings.rootPath && typeof optionalSettings.rootPath === 'string'
            ? optionalSettings.rootPath
            : PROJECT_ROOT;

    checkMarkersGen({
        settings,
        optionalOfSettings: optionalSettings,
        rootPath: newRootPath,
    });

    createMarkers({ ...settings, rootPath: newRootPath });
};

exports.customGen = customGen;
exports.CLIGen = CLIGen;
exports.markersGen = markersGen;
