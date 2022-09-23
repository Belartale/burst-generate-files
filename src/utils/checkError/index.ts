// Core
import fs from 'fs';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: typesCommon.OptionCustomGen[] | typesCommon.OptionCLIGen[], whichFunction: 'customGen' | 'CLIGen') => {
    let errors = [];

    const spacesFirstError = ':';
    const spacesSecondError = '  ';

    // Setting First param
    if (!PROJECT_ROOT || typeof PROJECT_ROOT !== 'string') {
        errors.push(new Error(`${whichFunction} first argument!${spacesFirstError}\n${spacesSecondError}Type '${ typeof PROJECT_ROOT }' is not assignable to type 'string'. \n`));
    }
    if (typeof PROJECT_ROOT === 'string' && !fs.existsSync(PROJECT_ROOT)) {
        errors.push(new Error(`${whichFunction} first argument!${spacesFirstError}\n${spacesSecondError}Root path of your application is incorrect. \n`));
    }

    // Setting Second param
    if (!options || !Array.isArray(options)) {
        errors.push(new Error(`${whichFunction} second argument!${spacesFirstError}\n${spacesSecondError}Type '${typeof options}' is not assignable to type 'array'. \n`));
    }

    const checkArraySecondParam = (
        options: typesCommon.OptionCustomGen[] | typesCommon.OptionCLIGenTemplate[] | any,
    ) => {
        if (Array.isArray(options)) {
            // Setting Objects of Array
            options.forEach((option, indexOption: number) => {
                if (typeof option !== 'object') {
                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]${spacesFirstError}\n${spacesSecondError}Type '${typeof option}' is not assignable to type 'object'. \n`));
                }

                // Setting stringsReplacers
                if (whichFunction === 'customGen') {
                    if (typeof option.stringsReplacers !== 'object') {
                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers${spacesFirstError}\n${spacesSecondError}Type '${typeof option.stringsReplacers}' is not assignable to type 'object' | 'array'. \n`));
                    }
                    if (typeof option.stringsReplacers === 'object' && !Array.isArray(option.stringsReplacers)) {
                        if (typeof option.stringsReplacers.replaceVar !== 'string') {
                            errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers/replaceVar${spacesFirstError}\n${spacesSecondError}Type '${typeof option.stringsReplacers.replaceVar}' is not assignable to type 'string'. \n`));
                        }
                        if (typeof option.stringsReplacers.value !== 'string') {
                            errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers/value${spacesFirstError}\n${spacesSecondError}Type '${typeof option.stringsReplacers.value}' is not assignable to type 'string'. \n`));
                        }
                    }
                    if (Array.isArray(option.stringsReplacers)) {
                        option.stringsReplacers.forEach(
                            (obj: typesCommon.OptionStringsReplacersCustomGen, indexStringsReplacers: number) => {
                                if (typeof obj !== 'object' || (typeof obj !== 'object' && Array.isArray(obj))) {
                                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers[${indexStringsReplacers}]${spacesFirstError}\n${spacesSecondError}Type '${typeof obj}' is not assignable to type 'object'. \n`));
                                }
                                if (typeof obj === 'object' && !Array.isArray(obj)) {
                                    if (typeof obj.replaceVar !== 'string') {
                                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers[${indexStringsReplacers}]/replaceVar${spacesFirstError}\n${spacesSecondError}Type '${typeof obj.replaceVar}' is not assignable to type 'string'. \n`));
                                    }
                                    if (typeof obj.value !== 'string') {
                                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers[${indexStringsReplacers}]/value${spacesFirstError}\n${spacesSecondError}Type '${typeof obj.value}' is not assignable to type 'string'. \n`));
                                    }
                                }
                            },
                        );
                    }
                }
                if (whichFunction === 'CLIGen') {
                    if (typeof option.stringsReplacers !== 'string' && !Array.isArray(option.stringsReplacers)) {
                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers${spacesFirstError}\n${spacesSecondError}Type '${typeof option.stringsReplacers}' is not assignable to type 'string' | 'array'. \n`));
                    }
                    if (Array.isArray(option.stringsReplacers)) {
                        option.stringsReplacers.forEach(
                            (string: string, indexString: number) => {
                                if (typeof string !== 'string') {
                                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/stringsReplacers[${indexString}]${spacesFirstError}\n${spacesSecondError}Type '${typeof string}' is not assignable to type 'string'. \n`));
                                }
                            },
                        );
                    }
                }

                // Setting pathToTemplate
                if (typeof option.pathToTemplate !== 'string' && !Array.isArray(option.pathToTemplate)) {
                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/pathToTemplate${spacesFirstError}\n${spacesSecondError}Type '${typeof option.pathToTemplate}' is not assignable to type 'string'. \n`));
                }
                if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/pathToTemplate${spacesFirstError}\n${spacesSecondError}${option.pathToTemplate} no such directory! \n`));
                }
                if (Array.isArray(option.pathToTemplate)) {
                    option.pathToTemplate.forEach((path: string, indexPathToTemplate: number) => {
                        if (typeof path !== 'string') {
                            errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/pathToTemplate[${indexPathToTemplate}]${spacesFirstError}\n${spacesSecondError}Type '${typeof path}' is not assignable to type 'string'. \n`));
                        }
                        if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                            errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/pathToTemplate[${indexPathToTemplate}]${spacesFirstError}\n${spacesSecondError}${path} no such directory! \n`));
                        }
                    });
                }

                // Setting outputPath
                if (typeof option.outputPath !== 'string' && !Array.isArray(option.outputPath)) {
                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/outputPath${spacesFirstError}\n${spacesSecondError}Type '${typeof option.outputPath}' is not assignable to type 'string' | 'array'. \n`));
                }

                if (Array.isArray(option.outputPath)) {
                    option.outputPath.forEach((path: typesCommon.OptionCommonTypes['outputPath'], indexOutputPath: number) => {
                        if (typeof path !== 'string') {
                            errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/outputPath[${indexOutputPath}]${spacesFirstError}\n${spacesSecondError}Type '${typeof path}' is not assignable to type 'string'. \n`));
                        }
                    });
                }


                // Setting markers
                if (option.markers) {
                    if (!Array.isArray(option.markers)) {
                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers${spacesFirstError}\n${spacesSecondError}Type '${typeof option.markers}' is not assignable to type 'array'. \n`));
                    }
                    if (Array.isArray(option.markers)) {
                        option.markers.forEach((optionMarker: types.OptionsMarker, indexMarker: number) => {
                            // Setting pattern
                            if (typeof optionMarker.pattern !== 'string' && optionMarker.pattern !== RegExp(optionMarker.pattern)) {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/pattern${spacesFirstError}\n${spacesSecondError}Type '${typeof optionMarker.pattern}' is not assignable to type 'string' | 'RegExp'. \n`));
                            }

                            // Setting pathToMarker
                            if (typeof optionMarker.pathToMarker !== 'string' && !Array.isArray(optionMarker.pathToMarker)) {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/pathToMarker${spacesFirstError}\n${spacesSecondError}Type '${typeof optionMarker.pathToMarker}' is not assignable to type 'string' | 'array'. \n`));
                            }

                            if (typeof optionMarker.pathToMarker === 'string' && !fs.existsSync(optionMarker.pathToMarker)) {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/pathToMarker${spacesFirstError}\n${spacesSecondError}${optionMarker.pathToMarker} no such directory! \n`));
                            }
                            if (Array.isArray(optionMarker.pathToMarker)) {
                                optionMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${spacesFirstError}\n${spacesSecondError}Type '${typeof path}' is not assignable to type 'string'. \n`));
                                    }
                                    if (typeof path === 'string' && !fs.existsSync(path)) {
                                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${spacesFirstError}\n${spacesSecondError}${path} no such directory! \n`));
                                    }
                                });
                            }

                            // Setting markerTemplate
                            if (typeof optionMarker.markerTemplate !== 'string' && !Array.isArray(optionMarker.markerTemplate)) {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/markerTemplate${spacesFirstError}\n${spacesSecondError}Type '${typeof optionMarker.markerTemplate}' is not assignable to type 'string'. \n`));
                            }
                            if (Array.isArray(optionMarker.markerTemplate)) {
                                optionMarker.markerTemplate.forEach((string, indexMarkerTemplate: number) => {
                                    if (typeof string !== 'string') {
                                        errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${spacesFirstError}\n${spacesSecondError}Type '${typeof string}' is not assignable to type 'string'. \n`));
                                    }
                                });
                            }

                            // Setting genDirection
                            if (typeof optionMarker.genDirection !== 'undefined' && optionMarker.genDirection !== 'after' && optionMarker.genDirection !== 'before') {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/genDirection${spacesFirstError}\n${spacesSecondError}Type '${typeof optionMarker.genDirection}' is not assignable to type 'after' | 'before' | 'undefined'. \n`));
                            }

                            // Setting onceInsert
                            if (optionMarker.onceInsert && typeof optionMarker.onceInsert !== 'boolean') {
                                errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/markers[${indexMarker}]/onceInsert${spacesFirstError}\n${spacesSecondError}Type '${typeof optionMarker.onceInsert}' is not assignable to type 'boolean'. \n`));
                            }
                        });
                    }
                }

                // Setting onComplete
                if (option.onComplete && typeof option.onComplete !== 'function') {
                    errors.push(new Error(`${whichFunction}/Configs[${indexOption}]/onComplete${spacesFirstError}\n${spacesSecondError}Type '${typeof option.onComplete}' is not assignable to type 'function'. \n`));
                }
            });
        }
    };

    if (whichFunction === 'customGen' && Array.isArray(options)) {
        checkArraySecondParam(options);
    }

    if (whichFunction === 'CLIGen') {
        if (Array.isArray(options)) {
            options.forEach((optionCLIGen: typesCommon.OptionCLIGen | any, indexCLIGen: number) => {
                if (typeof optionCLIGen.name !== 'string') {
                    errors.push(new Error(`${whichFunction}/Configs[${indexCLIGen}]/name${spacesFirstError}\n${spacesSecondError}Type '${typeof optionCLIGen.name}' is not assignable to type 'string'. \n`));
                }
                if (!Array.isArray(optionCLIGen.templates)) {
                    errors.push(new Error(`${whichFunction}/Configs[${indexCLIGen}]/name${spacesFirstError}\n${spacesSecondError}Type '${typeof optionCLIGen.templates}' is not assignable to type 'array'. \n`));
                }
                if (Array.isArray(optionCLIGen.templates)) {
                    checkArraySecondParam(optionCLIGen.templates);
                }
            });
        }
    }

    if (errors.length > 0) {
        throw errors;
    }
};
