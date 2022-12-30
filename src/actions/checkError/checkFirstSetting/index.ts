// Core
import fs from 'fs';

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
        const settingCustomGem = setting as typesCommon.SettingCustomGen;
        const settingCLIGen = setting as typesCommon.SettingCLIGenTemplate;

        // Setting Objects of Array
        if (typeof setting !== 'object') {
            errors.push(new Error(`${beginOfLine}${betweenTwoLines}Type '${typeof setting}' is not assignable to type 'object'.${endErrorLine}`));
        }

        // Setting stringsReplacers
        if (whichFunction === 'customGen') {
            if (typeof settingCustomGem.stringsReplacers !== 'object') {
                errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof settingCustomGem.stringsReplacers}' is not assignable to type 'object' | 'array'.${endErrorLine}`));
            }
            if (typeof settingCustomGem.stringsReplacers === 'object' && !Array.isArray(settingCustomGem.stringsReplacers)) {
                if (typeof settingCustomGem.stringsReplacers.replaceVar !== 'string') {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers/replaceVar${betweenTwoLines}Type '${typeof settingCustomGem.stringsReplacers.replaceVar}' is not assignable to type 'string'.${endErrorLine}`));
                }
                if (typeof settingCustomGem.stringsReplacers.value !== 'string') {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers/value${betweenTwoLines}Type '${typeof settingCustomGem.stringsReplacers.value}' is not assignable to type 'string'.${endErrorLine}`));
                }
            }
            if (Array.isArray(settingCustomGem.stringsReplacers)) {
                settingCustomGem.stringsReplacers.forEach(
                    (obj, indexStringsReplacers) => {
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
            if (typeof settingCLIGen.stringsReplacers !== 'string' && !Array.isArray(settingCLIGen.stringsReplacers)) {
                errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof settingCLIGen.stringsReplacers}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
            }
            if (Array.isArray(settingCLIGen.stringsReplacers)) {
                settingCLIGen.stringsReplacers.forEach(
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
            errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}Type '${typeof setting.pathToTemplate}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
        }
        if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, setting.pathToTemplate))) {
            errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}No such directory, '${setting.pathToTemplate}'.${endErrorLine}`));
        }
        if (Array.isArray(setting.pathToTemplate)) {
            setting.pathToTemplate.forEach((path, indexPathToTemplate) => {
                if (typeof path !== 'string') {
                    errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                }
                if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, path))) {
                    errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}No such directory, '${path}'.${endErrorLine}`));
                }
            });
        }

        // Setting outputPath
        if (typeof setting.outputPath !== 'string' && !Array.isArray(setting.outputPath)) {
            errors.push(new Error(`${beginOfLine}/outputPath${betweenTwoLines}Type '${typeof setting.outputPath}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
        }

        if (Array.isArray(setting.outputPath)) {
            setting.outputPath.forEach((path, indexOutputPath) => {
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
                        if (
                            typeof settingMarker.pathToMarker === 'string'
                            && (((typeof settingCustomGem.stringsReplacers === 'object' && !Array.isArray(settingCustomGem.stringsReplacers)
                                && !settingMarker.pathToMarker.includes(
                                    settingCustomGem.stringsReplacers.replaceVar,
                                ))
                                || (Array.isArray(settingCustomGem.stringsReplacers)
                                && !settingCustomGem.stringsReplacers.some(
                                    (srtRep) => settingMarker.pathToMarker.includes(srtRep.replaceVar),
                                )))
                            && !fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker)))
                        ) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`));
                        }
                        if (Array.isArray(settingMarker.pathToMarker)) {
                            settingMarker.pathToMarker.forEach((pathToMarker, indexPathToMarker) => {
                                if (typeof pathToMarker !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof pathToMarker}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                                if (typeof pathToMarker === 'string') {
                                    if (
                                        typeof pathToMarker === 'string'
                                        && (((typeof settingCustomGem.stringsReplacers === 'object' && !Array.isArray(settingCustomGem.stringsReplacers)
                                            && !pathToMarker.includes(
                                                settingCustomGem.stringsReplacers.replaceVar,
                                            ))
                                            || (Array.isArray(settingCustomGem.stringsReplacers)
                                            && !settingCustomGem.stringsReplacers.some(
                                                (srtRep) => pathToMarker.includes(srtRep.replaceVar),
                                            ))) && !fs.existsSync(resolve(PROJECT_ROOT, pathToMarker)))
                                    ) {
                                        errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${pathToMarker}'.${endErrorLine}`));
                                    }
                                }
                            });
                        }
                    }

                    if (whichFunction === 'CLIGen') {
                        if (typeof settingMarker.pathToMarker === 'string') {
                            if (
                                ((typeof settingCLIGen.stringsReplacers === 'string' && !settingMarker.pathToMarker.includes(settingCLIGen.stringsReplacers))
                                    || (Array.isArray(settingCLIGen.stringsReplacers)
                                    && !settingCLIGen.stringsReplacers.some(
                                        (srtRep) => settingMarker.pathToMarker.includes(srtRep),
                                    )))
                                && !fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker))
                            ) {
                                errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`));
                            }
                        }
                        if (Array.isArray(settingMarker.pathToMarker)) {
                            settingMarker.pathToMarker.forEach((pathToMarker, indexPathToMarker) => {
                                if (typeof pathToMarker !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof pathToMarker}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                                if (
                                    typeof pathToMarker === 'string'
                                        && (((typeof settingCLIGen.stringsReplacers === 'string' && !pathToMarker.includes(settingCLIGen.stringsReplacers))
                                            || (Array.isArray(settingCLIGen.stringsReplacers)
                                            && !settingCLIGen.stringsReplacers.some(
                                                (srtRep: string) => pathToMarker.includes(srtRep),
                                            ))) && !fs.existsSync(resolve(PROJECT_ROOT, pathToMarker)))
                                ) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${pathToMarker}'.${endErrorLine}`));
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
                        settingMarker.markerTemplate.forEach((markerTemplate, indexMarkerTemplate) => {
                            if (typeof markerTemplate !== 'string') {
                                errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}Type '${typeof markerTemplate}' is not assignable to type 'string'.${endErrorLine}`));
                            }
                            if (typeof markerTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, markerTemplate))) {
                                errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}No such directory, '${markerTemplate}'.${endErrorLine}`));
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
    };

    if (!settings || !Array.isArray(settings)) {
        errors.push(new Error(`${whichFunction}/FirstSetting(Array)${betweenTwoLines}Type '${typeof settings}' is not assignable to type 'array'.${endErrorLine}`));
    }

    if (whichFunction === 'customGen' && Array.isArray(settings)) {
        settings.forEach((setting, indexSetting) => {
            checkSettings({
                setting:     setting as typesCommon.SettingCustomGen,
                beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexSetting}]`,
            });
        });
    }

    if (whichFunction === 'CLIGen' && Array.isArray(settings)) {
        settings.forEach((setting, indexCLIGen: number) => {
            const settingCLIGen = setting as typesCommon.SettingCLIGen;
            if (typeof settingCLIGen.name !== 'string') {
                errors.push(new Error(`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/name${betweenTwoLines}Type '${typeof settingCLIGen.name}' is not assignable to type 'string'.${endErrorLine}`));
            }
            if (!Array.isArray(settingCLIGen.templates)) {
                errors.push(new Error(`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates${betweenTwoLines}Type '${typeof settingCLIGen.templates}' is not assignable to type 'array'.${endErrorLine}`));
            }
            if (Array.isArray(settingCLIGen.templates)) {
                settingCLIGen.templates.forEach((setting, indexSetting: number) => {
                    checkSettings({
                        setting,
                        beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates[${indexSetting}]`,
                    });
                });
            }
        });
    }
};
