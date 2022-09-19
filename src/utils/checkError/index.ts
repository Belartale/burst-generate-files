// Core
import fs from 'fs';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: typesCommon.OptionCustomGenO[] | typesCommon.OptionCLIGen[], whichFunction: 'customGen' | 'CLIGen') => {
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
    if (Array.isArray(options)) {
        // Setting Objects of Array
        options.forEach((obj, indexOption: number) => {
            if (typeof obj !== 'object') {
                errors.push(new Error(`Number ${indexOption} value of array in second argument must be object! But you use ${typeof obj}`));
            }
        });
        options.forEach((
            option: typesCommon.OptionCustomGenO | typesCommon.OptionCLIGen | any, indexOption: number,
        ) => {
            // Setting name
            if (whichFunction === 'CLIGen') {
                if (typeof option.name !== 'string') {
                    errors.push(new Error(`"name" of number ${indexOption} object must be string! But you use ${typeof option.name}!`));
                }
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
                        errors.push(new Error(`value of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof option.stringsReplacers.value}!`));
                    }
                }
                if (Array.isArray(option.stringsReplacers)) {
                    option.stringsReplacers.forEach((obj: string | typesCommon.OptionStringsReplacersCustomGen) => {
                        if (typeof obj === 'object' && !Array.isArray(obj)) {
                            if (typeof obj.replaceVar !== 'string') {
                                errors.push(new Error(`"replaceVar" of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof obj.replaceVar}!`));
                            }
                            if (typeof obj.value !== 'string') {
                                errors.push(new Error(`value of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof obj.value}!`));
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
                    option.stringsReplacers.forEach((string: string | typesCommon.OptionStringsReplacersCustomGen) => {
                        if (typeof string !== 'string') {
                            errors.push(new Error(`value of "stringsReplacers" in number ${indexOption} object must be string! But you use ${typeof string}!`));
                        }
                    });
                }
            }

            // Setting pathToTemplate
            if (typeof option.pathToTemplate !== 'string') {
                errors.push(new Error(`"pathToTemplate" of number ${indexOption} object must be string! But you use ${typeof option.pathToTemplate}!`));
            }
            if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                errors.push(new Error(`"pathToTemplate" of number ${indexOption} object, ${option.pathToTemplate} no such directory! But you use ${option.pathToTemplate}!`));
            }
            if (Array.isArray(option.pathToTemplate)) {
                option.pathToTemplate.forEach((element: string, indexPathToTemplate: number) => {
                    if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                        errors.push(new Error(`Value of "pathToTemplate" in number ${indexPathToTemplate} object, in number ${indexOption} object, ${element} no such directory! But you use ${element}!`));
                    }
                });
            }

            // Setting outputPath
            if (typeof option.outputPath !== 'string') {
                errors.push(new Error(`"outputPath" of number ${indexOption} object must be string! But you use ${typeof option.outputPath}!`));
            }

            // Setting markers
            if (!Array.isArray(option.markers)) {
                errors.push(new Error(`"markers" of number ${indexOption} object must be array! But you use ${typeof option.markers}!`));
            }

            if (Array.isArray(option.markers)) {
                option.markers.forEach((objectMarker: types.OptionsMarker, indexMarker: number) => {
                    // Setting pattern
                    if (typeof objectMarker.pattern !== 'string' && objectMarker.pattern !== RegExp(objectMarker.pattern)) {
                        errors.push(new Error(`"pattern" of number ${indexMarker} "markers" in number ${indexOption} object must be string or object! But you use ${typeof objectMarker.pattern}!`));
                    }

                    // Setting pathToMarker
                    if (typeof objectMarker.pathToMarker !== 'string') {
                        errors.push(new Error(`"pathToMarker" of number ${indexMarker} "markers" in number ${indexOption} object must be string! But you use ${typeof objectMarker.pathToMarker}!`));
                    }

                    if (typeof objectMarker.pathToMarker === 'string' && !fs.existsSync(objectMarker.pathToMarker)) {
                        errors.push(new Error(`"pathToMarker" of number ${indexOption} "markers" in number ${indexOption}, ${objectMarker.pathToMarker} no such directory! But you use ${objectMarker.pathToMarker}!`));
                    }

                    // Setting markerTemplate
                    if (typeof objectMarker.markerTemplate !== 'string' && !Array.isArray(objectMarker.markerTemplate)) {
                        errors.push(new Error(`"markerTemplate" of number ${indexMarker} "markers" in number ${indexOption} object must be string or array! But you use ${typeof objectMarker.markerTemplate}!`));
                    }
                    if (Array.isArray(objectMarker.markerTemplate)) {
                        objectMarker.markerTemplate.forEach((string, indexMarkerTemplate: number) => {
                            if (typeof string !== 'string') {
                                errors.push(new Error(`value of number ${indexMarkerTemplate} "markerTemplate" of number ${indexMarker} "markers" in number ${indexOption} object must be string or array! But you use ${typeof string}!`));
                            }
                        });
                    }

                    // Setting genDirection
                    if (typeof objectMarker.genDirection !== 'undefined' && objectMarker.genDirection !== 'after' && objectMarker.genDirection !== 'before') {
                        errors.push(new Error(`"genDirection" of number ${indexMarker} "markers" in number ${indexOption} object must be string or this is incorrect value! But you use ${typeof objectMarker.genDirection}!`));
                    }

                    // Setting onceInsert
                    if (objectMarker.onceInsert && typeof objectMarker.onceInsert !== 'boolean') {
                        errors.push(new Error(`"onceInsert" of number ${indexMarker} "markers" in number ${indexOption} object must be boolean! But you use ${typeof objectMarker.onceInsert}!`));
                    }
                });
            }

            // Setting onComplete
            if (option.onComplete && typeof option.onComplete !== 'function') {
                errors.push(new Error(`"onComplete" of number ${indexOption} object must be function! But you use ${typeof option.onComplete}!`));
            }
        });
    }

    if (errors.length > 0) {
        throw errors;
    }
};
