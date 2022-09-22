// Core
import fs from 'fs';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: typesCommon.OptionCustomGen[] | typesCommon.OptionCLIGen[], whichFunction: 'customGen' | 'CLIGen') => {
    let errors = [];

    // Setting First param
    if (!PROJECT_ROOT || typeof PROJECT_ROOT !== 'string') {
        errors.push(new Error(`First argument of ${whichFunction} function must be string and must be root path of your application! But you use ${typeof PROJECT_ROOT}!`));
    }
    if (typeof PROJECT_ROOT === 'string' && !fs.existsSync(PROJECT_ROOT)) {
        errors.push(new Error(`Root path of your application is incorrect! You must check the first argument! You use this path: ${PROJECT_ROOT}.`));
    }

    // Setting Second param
    if (!options || !Array.isArray(options)) {
        errors.push(new Error(`Second argument of ${whichFunction} argument must be array with objects! But you use ${typeof options}!`));
    }

    const checkArraySecondParam = (
        options: typesCommon.OptionCustomGen[] | typesCommon.OptionCLIGenTemplate[] | any,
    ) => {
        if (Array.isArray(options)) {
            // Setting Objects of Array
            options.forEach((option, indexOption: number) => {
                if (typeof option !== 'object') {
                    errors.push(new Error(`Number ${indexOption} value of array in second argument must be object! But you use ${typeof option}`));
                }

                // Setting stringsReplacers
                if (whichFunction === 'customGen') {
                    if (typeof option.stringsReplacers !== 'object') {
                        errors.push(new Error(`"stringsReplacers" of number ${indexOption} object must be object or array! But you use ${typeof option.stringsReplacers}!`));
                    }
                    if (typeof option.stringsReplacers === 'object' && !Array.isArray(option.stringsReplacers)) {
                        if (typeof option.stringsReplacers.replaceVar !== 'string') {
                            errors.push(new Error(`"replaceVar" of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof option.stringsReplacers.replaceVar}!`));
                        }
                        if (typeof option.stringsReplacers.value !== 'string') {
                            errors.push(new Error(`"value" of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof option.stringsReplacers.value}!`));
                        }
                    }
                    if (Array.isArray(option.stringsReplacers)) {
                        option.stringsReplacers.forEach((obj: typesCommon.OptionStringsReplacersCustomGen) => {
                            if (typeof obj === 'object' && !Array.isArray(obj)) {
                                if (typeof obj.replaceVar !== 'string') {
                                    errors.push(new Error(`"replaceVar" of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof obj.replaceVar}!`));
                                }
                                if (typeof obj.value !== 'string') {
                                    errors.push(new Error(`"value" of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof obj.value}!`));
                                }
                            }
                        });
                    }
                }
                if (whichFunction === 'CLIGen') {
                    if (typeof option.stringsReplacers !== 'string' && !Array.isArray(option.stringsReplacers)) {
                        errors.push(new Error(`"stringsReplacers" of number ${indexOption} object must be string or array! But you use ${typeof option.stringsReplacers}!`));
                    }
                    if (Array.isArray(option.stringsReplacers)) {
                        option.stringsReplacers.forEach(
                            (string: string) => {
                                if (typeof string !== 'string') {
                                    errors.push(new Error(`value of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof string}!`));
                                }
                            },
                        );
                    }
                }

                // Setting pathToTemplate
                if (typeof option.pathToTemplate !== 'string' && !Array.isArray(option.pathToTemplate)) {
                    errors.push(new Error(`"pathToTemplate" of number ${indexOption} object must be string of array! But you use ${typeof option.pathToTemplate}!`));
                }
                if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                    errors.push(new Error(`"pathToTemplate" of number ${indexOption} object, ${option.pathToTemplate} no such directory!`));
                }
                if (Array.isArray(option.pathToTemplate)) {
                    option.pathToTemplate.forEach((path: string, indexPathToTemplate: number) => {
                        if (typeof path !== 'string') {
                            errors.push(new Error(`Value number ${indexPathToTemplate} of "pathToTemplate" in number ${indexOption} object must be string! But you use ${typeof option.pathToTemplate}!`));
                        }
                        if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                            errors.push(new Error(`Value of "pathToTemplate" in number ${indexPathToTemplate} object, in number ${indexOption} object, ${path} no such directory!`));
                        }
                    });
                }

                // Setting outputPath
                if (typeof option.outputPath !== 'string' && !Array.isArray(option.outputPath)) {
                    errors.push(new Error(`"outputPath" of number ${indexOption} object must be string or array! But you use ${typeof option.outputPath}!`));
                }

                if (Array.isArray(option.outputPath)) {
                    option.outputPath.forEach((path: typesCommon.OptionCommonTypes['outputPath'], indexOutputPath: number) => {
                        if (typeof path !== 'string') {
                            errors.push(new Error(`Value of "outputPath" in number ${indexOutputPath} object, in number ${indexOption} object, must be string! But you use ${typeof path}!`));
                        }
                    });
                }


                // Setting markers
                if (option.markers) {
                    if (!Array.isArray(option.markers)) {
                        errors.push(new Error(`"markers" of number ${indexOption} object must be array! But you use ${typeof option.markers}!`));
                    }
                    if (Array.isArray(option.markers)) {
                        option.markers.forEach((optionMarker: types.OptionsMarker, indexMarker: number) => {
                            // Setting pattern
                            if (typeof optionMarker.pattern !== 'string' && optionMarker.pattern !== RegExp(optionMarker.pattern)) {
                                errors.push(new Error(`"pattern" of number ${indexMarker} "markers" in number ${indexOption} object must be string or object! But you use ${typeof optionMarker.pattern}!`));
                            }

                            // Setting pathToMarker
                            if (typeof optionMarker.pathToMarker !== 'string' && !Array.isArray(optionMarker.pathToMarker)) {
                                errors.push(new Error(`"pathToMarker" of number ${indexMarker} "markers" in number ${indexOption} object must be string or array! But you use ${typeof optionMarker.pathToMarker}!`));
                            }

                            if (typeof optionMarker.pathToMarker === 'string' && !fs.existsSync(optionMarker.pathToMarker)) {
                                errors.push(new Error(`"pathToMarker" of number ${indexOption} "markers" in number ${indexOption} object, ${optionMarker.pathToMarker} no such directory!`));
                            }
                            if (Array.isArray(optionMarker.pathToMarker)) {
                                optionMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`Value number ${indexPathToMarker} of "pathToMarker" in number ${indexMarker} "markers" of number ${indexOption} object, must be string! But you use ${typeof optionMarker.pathToMarker}!`));
                                    }
                                    if (typeof path === 'string' && !fs.existsSync(path)) {
                                        errors.push(new Error(`Value number ${indexPathToMarker} of "pathToMarker" in number ${indexOption} "markers" in number ${indexOption}, ${optionMarker.pathToMarker} no such directory!`));
                                    }
                                });
                            }

                            // Setting markerTemplate
                            if (typeof optionMarker.markerTemplate !== 'string' && !Array.isArray(optionMarker.markerTemplate)) {
                                errors.push(new Error(`"markerTemplate" of number ${indexMarker} "markers" in number ${indexOption} object must be string or array! But you use ${typeof optionMarker.markerTemplate}!`));
                            }
                            if (Array.isArray(optionMarker.markerTemplate)) {
                                optionMarker.markerTemplate.forEach((string, indexMarkerTemplate: number) => {
                                    if (typeof string !== 'string') {
                                        errors.push(new Error(`value of number ${indexMarkerTemplate} "markerTemplate" of number ${indexMarker} "markers" in number ${indexOption} object must be string or array! But you use ${typeof string}!`));
                                    }
                                });
                            }

                            // Setting genDirection
                            if (typeof optionMarker.genDirection !== 'undefined' && optionMarker.genDirection !== 'after' && optionMarker.genDirection !== 'before') {
                                errors.push(new Error(`"genDirection" of number ${indexMarker} "markers" in number ${indexOption} object must be string or this is incorrect value! But you use ${typeof optionMarker.genDirection}!`));
                            }

                            // Setting onceInsert
                            if (optionMarker.onceInsert && typeof optionMarker.onceInsert !== 'boolean') {
                                errors.push(new Error(`"onceInsert" of number ${indexMarker} "markers" in number ${indexOption} object must be boolean! But you use ${typeof optionMarker.onceInsert}!`));
                            }
                        });
                    }
                }

                // Setting onComplete
                if (option.onComplete && typeof option.onComplete !== 'function') {
                    errors.push(new Error(`"onComplete" of number ${indexOption} object must be function! But you use ${typeof option.onComplete}!`));
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
                    errors.push(new Error(`"name" of number ${indexCLIGen} object must be string. But you use ${typeof optionCLIGen}!`));
                }
                if (!Array.isArray(optionCLIGen.templates)) {
                    errors.push(new Error(`"templates" of number ${indexCLIGen} object in templates must be array. But you use ${typeof optionCLIGen}!`));
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
