// Core
import fs from 'fs'; // todo PROJECT_ROOT

// Constants
import { betweenTwoLines, endErrorLine } from '../constants';

// Types
import * as types from './types';
import * as typesActions from '../../types';
import * as typesCommon from '../../../types';
import { resolve } from 'path';

export const checkFirstSetting = (
    {
        whichFunction,
        settings,
        errors,
        PROJECT_ROOT,
    }: types.CheckFirstSettings,
) => {
    const checkSettings = ({
        setting,
        beginOfLine,
    }: types.CheckSettings) => {
        if (Array.isArray(settings)) {
        // Setting Objects of Array
            if (typeof setting !== 'object') {
                errors.push(new Error(`${beginOfLine}${betweenTwoLines}Type '${typeof setting}' is not assignable to type 'object'.${endErrorLine}`));
            }

            // Setting stringsReplacers
            if (whichFunction === 'customGen') {
                if (typeof setting.stringsReplacers !== 'object') {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof setting.stringsReplacers}' is not assignable to type 'object' | 'array'.${endErrorLine}`));
                }
                if (typeof setting.stringsReplacers === 'object' && !Array.isArray(setting.stringsReplacers)) {
                    if (typeof setting.stringsReplacers.replaceVar !== 'string') {
                        errors.push(new Error(`${beginOfLine}/stringsReplacers/replaceVar${betweenTwoLines}Type '${typeof setting.stringsReplacers.replaceVar}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                    if (typeof setting.stringsReplacers.value !== 'string') {
                        errors.push(new Error(`${beginOfLine}/stringsReplacers/value${betweenTwoLines}Type '${typeof setting.stringsReplacers.value}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                }
                if (Array.isArray(setting.stringsReplacers)) {
                    setting.stringsReplacers.forEach(
                        (obj: typesCommon.SettingStringsReplacersCustomGen, indexStringsReplacers: number) => {
                            if (typeof obj !== 'object' || (typeof obj !== 'object' && Array.isArray(obj))) {
                                errors.push(new Error(`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]${betweenTwoLines}Type '${typeof obj}' is not assignable to type 'object'.${endErrorLine}`));
                            }
                            if (typeof obj === 'object' && !Array.isArray(obj)) {
                                if (typeof obj.replaceVar !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]/replaceVar${betweenTwoLines}Type '${typeof obj.replaceVar}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                                if (typeof obj.value !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]/value${betweenTwoLines}Type '${typeof obj.value}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                            }
                        },
                    );
                }
            }
            if (whichFunction === 'CLIGen') {
                if (typeof setting.stringsReplacers !== 'string' && !Array.isArray(setting.stringsReplacers)) {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof setting.stringsReplacers}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                }
                if (Array.isArray(setting.stringsReplacers)) {
                    setting.stringsReplacers.forEach(
                        (string: string, indexString: number) => {
                            if (typeof string !== 'string') {
                                errors.push(new Error(`${beginOfLine}/stringsReplacers[${indexString}]${betweenTwoLines}Type '${typeof string}' is not assignable to type 'string'.${endErrorLine}`));
                            }
                        },
                    );
                }
            }

            // Setting pathToTemplate
            if (typeof setting.pathToTemplate !== 'string' && !Array.isArray(setting.pathToTemplate)) {
                errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}Type '${typeof setting.pathToTemplate}' is not assignable to type 'string'.${endErrorLine}`));
            }
            if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, setting.pathToTemplate))) {
                errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}No such directory, '${setting.pathToTemplate}'.${endErrorLine}`));
            }
            if (Array.isArray(setting.pathToTemplate)) {
                setting.pathToTemplate.forEach((path: string, indexPathToTemplate: number) => {
                    if (typeof path !== 'string') {
                        errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                    if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, setting.pathToTemplate))) {
                        errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}No such directory, '${path}'.${endErrorLine}`));
                    }
                });
            }

            // Setting outputPath
            if (typeof setting.outputPath !== 'string' && !Array.isArray(setting.outputPath)) {
                errors.push(new Error(`${beginOfLine}/outputPath${betweenTwoLines}Type '${typeof setting.outputPath}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
            }

            if (Array.isArray(setting.outputPath)) {
                setting.outputPath.forEach((path: typesCommon.SettingCommonTypes['outputPath'], indexOutputPath: number) => {
                    if (typeof path !== 'string') {
                        errors.push(new Error(`${beginOfLine}/outputPath[${indexOutputPath}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                });
            }

            // Setting markers
            if (setting.markers) {
                if (!Array.isArray(setting.markers)) {
                    errors.push(new Error(`${beginOfLine}/markers${betweenTwoLines}Type '${typeof setting.markers}' is not assignable to type 'array'.${endErrorLine}`));
                }
                if (Array.isArray(setting.markers)) {
                    setting.markers.forEach((settingMarker: typesActions.SettingsMarker, indexMarker: number) => {
                    // Setting pattern
                        if (typeof settingMarker.pattern !== 'string' && settingMarker.pattern !== RegExp(settingMarker.pattern)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pattern${betweenTwoLines}Type '${typeof settingMarker.pattern}' is not assignable to type 'string' | 'RegExp'.${endErrorLine}`));
                        }

                        // Setting pathToMarker
                        if (typeof settingMarker.pathToMarker !== 'string' && !Array.isArray(settingMarker.pathToMarker)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}Type '${typeof settingMarker.pathToMarker}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                        }

                        if (whichFunction === 'customGen') {
                            if (typeof settingMarker.pathToMarker === 'string') {
                                if (
                                    (typeof setting.stringsReplacers === 'object' && !Array.isArray(setting.stringsReplacers) && !settingMarker.pathToMarker.includes(setting.stringsReplacers.replaceVar) && !fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker)))
                                    || (Array.isArray(setting.stringsReplacers)
                                    && !setting.stringsReplacers.some(
                                        (
                                            srtRep: typesCommon.SettingStringsReplacersCustomGen,
                                        ) => settingMarker.pathToMarker.includes(srtRep.replaceVar),
                                    )
                                    && !setting.stringsReplacers.some(
                                        (
                                            strRep: typesCommon.SettingStringsReplacersCustomGen,
                                        ) => fs.existsSync(resolve(PROJECT_ROOT, strRep.value)),
                                    ))
                                ) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`));
                                }
                            }
                            if (Array.isArray(settingMarker.pathToMarker)) {
                                settingMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                                    }
                                    if (typeof path === 'string') {
                                        if (
                                            (typeof setting.stringsReplacers === 'string' && !path.includes(setting.stringsReplacers) && !fs.existsSync(resolve(PROJECT_ROOT, path)))
                                            || (Array.isArray(setting.stringsReplacers)
                                        && !setting.stringsReplacers.some(
                                            (srtRep: string) => path.includes(srtRep),
                                        )
                                            && !setting.stringsReplacers.some(
                                                (strRep: string) => fs.existsSync(resolve(PROJECT_ROOT, strRep)),
                                            ))
                                        ) {
                                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${path}'.${endErrorLine}`));
                                        }
                                    }
                                });
                            }
                        }

                        if (whichFunction === 'CLIGen') {
                            if (typeof settingMarker.pathToMarker === 'string') {
                                if (
                                    (typeof setting.stringsReplacers === 'string' && !settingMarker.pathToMarker.includes(setting.stringsReplacers) && !fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker)))
                                    || (Array.isArray(setting.stringsReplacers)
                                    && !setting.stringsReplacers.some(
                                        (srtRep: string) => settingMarker.pathToMarker.includes(srtRep),
                                    )
                                    && !setting.stringsReplacers.some(
                                        (strRep: string) => fs.existsSync(resolve(PROJECT_ROOT, strRep)),
                                    ))
                                ) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`));
                                }
                            }
                            if (Array.isArray(settingMarker.pathToMarker)) {
                                settingMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                                    }
                                    if (typeof path === 'string') {
                                        if (
                                            (typeof setting.stringsReplacers === 'string' && !path.includes(setting.stringsReplacers) && !fs.existsSync(resolve(PROJECT_ROOT, path)))
                                            || (Array.isArray(setting.stringsReplacers)
                                        && !setting.stringsReplacers.some(
                                            (srtRep: string) => path.includes(srtRep),
                                        )
                                            && !setting.stringsReplacers.some(
                                                (strRep: string) => fs.existsSync(resolve(PROJECT_ROOT, strRep)),
                                            ))
                                        ) {
                                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${path}'.${endErrorLine}`));
                                        }
                                    }
                                });
                            }
                        }

                        // Setting markerTemplate
                        if (typeof settingMarker.markerTemplate !== 'string' && !Array.isArray(settingMarker.markerTemplate)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}Type '${typeof settingMarker.markerTemplate}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                        }
                        if (typeof settingMarker.markerTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, settingMarker.markerTemplate))) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}No such directory, '${settingMarker.markerTemplate}'.${endErrorLine}`));
                        }
                        if (Array.isArray(settingMarker.markerTemplate)) {
                            settingMarker.markerTemplate.forEach((string, indexMarkerTemplate: number) => {
                                if (typeof string !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}Type '${typeof string}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                                if (typeof string === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, string))) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}No such directory, '${string}'.${endErrorLine}`));
                                }
                            });
                        }

                        // Setting genDirection
                        if (typeof settingMarker.genDirection !== 'undefined' && settingMarker.genDirection !== 'after' && settingMarker.genDirection !== 'before') {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/genDirection${betweenTwoLines}Type '${typeof settingMarker.genDirection}' is not assignable to type 'after' | 'before' | 'undefined'.${endErrorLine}`));
                        }

                        // Setting onceInsert
                        if (settingMarker.onceInsert && typeof settingMarker.onceInsert !== 'boolean') {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/onceInsert${betweenTwoLines}Type '${typeof settingMarker.onceInsert}' is not assignable to type 'boolean'.${endErrorLine}`));
                        }
                    });
                }
            }

            // Setting onComplete
            if (setting.onComplete && typeof setting.onComplete !== 'function') {
                errors.push(new Error(`${beginOfLine}/onComplete${betweenTwoLines}Type '${typeof setting.onComplete}' is not assignable to type 'function'.${endErrorLine}`));
            }
        }
    };

    if (!settings || !Array.isArray(settings)) {
        errors.push(new Error(`${whichFunction}/FirstSetting(Array)${betweenTwoLines}Type '${typeof settings}' is not assignable to type 'array'.${endErrorLine}`));
    }

    if (whichFunction === 'customGen' && Array.isArray(settings)) {
        settings.forEach((setting, indexSetting) => {
            checkSettings({
                setting,
                beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexSetting}]`,
            });
        });
    }

    if (whichFunction === 'CLIGen' && Array.isArray(settings)) {
        settings.forEach((settingCLIGen: typesCommon.SettingCLIGen | any, indexCLIGen: number) => {
            if (typeof settingCLIGen.name !== 'string') {
                errors.push(new Error(`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/name${betweenTwoLines}Type '${typeof settingCLIGen.name}' is not assignable to type 'string'.${endErrorLine}`));
            }
            if (!Array.isArray(settingCLIGen.templates)) {
                errors.push(new Error(`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates${betweenTwoLines}Type '${typeof settingCLIGen.templates}' is not assignable to type 'array'.${endErrorLine}`));
            }
            if (Array.isArray(settingCLIGen.templates)) {
                settingCLIGen.templates.forEach((setting: any, indexSetting: number) => {
                    checkSettings({
                        setting,
                        beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates[${indexSetting}]`,
                    });
                });
            }
        });
    }
};
