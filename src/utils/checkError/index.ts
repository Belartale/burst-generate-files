// Core
import fs from 'fs';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: typesCommon.OptionCustomGen[] | typesCommon.OptionCLIGen[], whichFunction: 'customGen' | 'CLIGen') => {
    let errors = [];

    const betweenTwoLines = ':\n  ';
    const endErrorLine = '\n';

    // Setting First param
    if (!PROJECT_ROOT || typeof PROJECT_ROOT !== 'string') {
        errors.push(new Error(`${whichFunction} first argument!${betweenTwoLines}Type '${ typeof PROJECT_ROOT }' is not assignable to type 'string'.${endErrorLine}`));
    }
    if (typeof PROJECT_ROOT === 'string' && !fs.existsSync(PROJECT_ROOT)) {
        errors.push(new Error(`${whichFunction} first argument!${betweenTwoLines}Root path of your application is incorrect.${endErrorLine}`));
    }

    // Setting Second param
    if (!options || !Array.isArray(options)) {
        errors.push(new Error(`${whichFunction} second argument!${betweenTwoLines}Type '${typeof options}' is not assignable to type 'array'.${endErrorLine}`));
    }

    const checkArraySecondParam = (
        {
            option,
            beginOfLine,
        }: {
            option: typesCommon.OptionCustomGen | typesCommon.OptionCLIGenTemplate | any
            beginOfLine: string
        },
    ) => {
        if (Array.isArray(options)) {
            // Setting Objects of Array
            if (typeof option !== 'object') {
                errors.push(new Error(`${beginOfLine}${betweenTwoLines}Type '${typeof option}' is not assignable to type 'object'.${endErrorLine}`));
            }

            // Setting stringsReplacers
            if (whichFunction === 'customGen') {
                if (typeof option.stringsReplacers !== 'object') {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof option.stringsReplacers}' is not assignable to type 'object' | 'array'.${endErrorLine}`));
                }
                if (typeof option.stringsReplacers === 'object' && !Array.isArray(option.stringsReplacers)) {
                    if (typeof option.stringsReplacers.replaceVar !== 'string') {
                        errors.push(new Error(`${beginOfLine}/stringsReplacers/replaceVar${betweenTwoLines}Type '${typeof option.stringsReplacers.replaceVar}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                    if (typeof option.stringsReplacers.value !== 'string') {
                        errors.push(new Error(`${beginOfLine}/stringsReplacers/value${betweenTwoLines}Type '${typeof option.stringsReplacers.value}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                }
                if (Array.isArray(option.stringsReplacers)) {
                    option.stringsReplacers.forEach(
                        (obj: typesCommon.OptionStringsReplacersCustomGen, indexStringsReplacers: number) => {
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
                if (typeof option.stringsReplacers !== 'string' && !Array.isArray(option.stringsReplacers)) {
                    errors.push(new Error(`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof option.stringsReplacers}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                }
                if (Array.isArray(option.stringsReplacers)) {
                    option.stringsReplacers.forEach(
                        (string: string, indexString: number) => {
                            if (typeof string !== 'string') {
                                errors.push(new Error(`${beginOfLine}/stringsReplacers[${indexString}]${betweenTwoLines}Type '${typeof string}' is not assignable to type 'string'.${endErrorLine}`));
                            }
                        },
                    );
                }
            }

            // Setting pathToTemplate
            if (typeof option.pathToTemplate !== 'string' && !Array.isArray(option.pathToTemplate)) {
                errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}Type '${typeof option.pathToTemplate}' is not assignable to type 'string'.${endErrorLine}`));
            }
            if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                errors.push(new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}${option.pathToTemplate} no such directory!${endErrorLine}`));
            }
            if (Array.isArray(option.pathToTemplate)) {
                option.pathToTemplate.forEach((path: string, indexPathToTemplate: number) => {
                    if (typeof path !== 'string') {
                        errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                    if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
                        errors.push(new Error(`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}${path} no such directory!${endErrorLine}`));
                    }
                });
            }

            // Setting outputPath
            if (typeof option.outputPath !== 'string' && !Array.isArray(option.outputPath)) {
                errors.push(new Error(`${beginOfLine}/outputPath${betweenTwoLines}Type '${typeof option.outputPath}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
            }

            if (Array.isArray(option.outputPath)) {
                option.outputPath.forEach((path: typesCommon.OptionCommonTypes['outputPath'], indexOutputPath: number) => {
                    if (typeof path !== 'string') {
                        errors.push(new Error(`${beginOfLine}/outputPath[${indexOutputPath}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                    }
                });
            }

            // Setting markers
            if (option.markers) {
                if (!Array.isArray(option.markers)) {
                    errors.push(new Error(`${beginOfLine}/markers${betweenTwoLines}Type '${typeof option.markers}' is not assignable to type 'array'.${endErrorLine}`));
                }
                if (Array.isArray(option.markers)) {
                    option.markers.forEach((optionMarker: types.OptionsMarker, indexMarker: number) => {
                        // Setting pattern
                        if (typeof optionMarker.pattern !== 'string' && optionMarker.pattern !== RegExp(optionMarker.pattern)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pattern${betweenTwoLines}Type '${typeof optionMarker.pattern}' is not assignable to type 'string' | 'RegExp'.${endErrorLine}`));
                        }

                        // Setting pathToMarker
                        if (typeof optionMarker.pathToMarker !== 'string' && !Array.isArray(optionMarker.pathToMarker)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}Type '${typeof optionMarker.pathToMarker}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                        }

                        if (whichFunction === 'customGen') {
                            if (typeof optionMarker.pathToMarker === 'string') {
                                if (
                                    (typeof option.stringsReplacers === 'object' && !Array.isArray(option.stringsReplacers) && !optionMarker.pathToMarker.includes(option.stringsReplacers.replaceVar) && !fs.existsSync(optionMarker.pathToMarker))
                                    || (Array.isArray(option.stringsReplacers)
                                    && !option.stringsReplacers.some(
                                        (
                                            srtRep: typesCommon.OptionStringsReplacersCustomGen,
                                        ) => optionMarker.pathToMarker.includes(srtRep.replaceVar),
                                    )
                                    && !option.stringsReplacers.some(
                                        (
                                            strRep: typesCommon.OptionStringsReplacersCustomGen,
                                        ) => fs.existsSync(strRep.value),
                                    ))
                                ) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}${optionMarker.pathToMarker} no such directory!${endErrorLine}`));
                                }
                            }
                            if (Array.isArray(optionMarker.pathToMarker)) {
                                optionMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                                    }
                                    if (typeof path === 'string') {
                                        if (
                                            (typeof option.stringsReplacers === 'string' && !path.includes(option.stringsReplacers) && !fs.existsSync(path))
                                            || (Array.isArray(option.stringsReplacers)
                                        && !option.stringsReplacers.some(
                                            (srtRep: string) => path.includes(srtRep),
                                        )
                                            && !option.stringsReplacers.some(
                                                (strRep: string) => fs.existsSync(strRep),
                                            ))
                                        ) {
                                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}${path} no such directory!${endErrorLine}`));
                                        }
                                    }
                                });
                            }
                        }

                        if (whichFunction === 'CLIGen') {
                            if (typeof optionMarker.pathToMarker === 'string') {
                                if (
                                    (typeof option.stringsReplacers === 'string' && !optionMarker.pathToMarker.includes(option.stringsReplacers) && !fs.existsSync(optionMarker.pathToMarker))
                                    || (Array.isArray(option.stringsReplacers)
                                    && !option.stringsReplacers.some(
                                        (srtRep: string) => optionMarker.pathToMarker.includes(srtRep),
                                    )
                                    && !option.stringsReplacers.some(
                                        (strRep: string) => fs.existsSync(strRep),
                                    ))
                                ) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}${optionMarker.pathToMarker} no such directory!${endErrorLine}`));
                                }
                            }
                            if (Array.isArray(optionMarker.pathToMarker)) {
                                optionMarker.pathToMarker.forEach((path, indexPathToMarker) => {
                                    if (typeof path !== 'string') {
                                        errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`));
                                    }
                                    if (typeof path === 'string') {
                                        if (
                                            (typeof option.stringsReplacers === 'string' && !path.includes(option.stringsReplacers) && !fs.existsSync(path))
                                            || (Array.isArray(option.stringsReplacers)
                                        && !option.stringsReplacers.some(
                                            (srtRep: string) => path.includes(srtRep),
                                        )
                                            && !option.stringsReplacers.some(
                                                (strRep: string) => fs.existsSync(strRep),
                                            ))
                                        ) {
                                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}${path} no such directory!${endErrorLine}`));
                                        }
                                    }
                                });
                            }
                        }

                        // Setting markerTemplate
                        if (typeof optionMarker.markerTemplate !== 'string' && !Array.isArray(optionMarker.markerTemplate)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}Type '${typeof optionMarker.markerTemplate}' is not assignable to type 'string' | 'array'.${endErrorLine}`));
                        }
                        if (typeof optionMarker.markerTemplate === 'string' && !fs.existsSync(optionMarker.markerTemplate)) {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}${optionMarker.markerTemplate} no such directory!${endErrorLine}`));
                        }
                        if (Array.isArray(optionMarker.markerTemplate)) {
                            optionMarker.markerTemplate.forEach((string, indexMarkerTemplate: number) => {
                                if (typeof string !== 'string') {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}Type '${typeof string}' is not assignable to type 'string'.${endErrorLine}`));
                                }
                                if (typeof string === 'string' && !fs.existsSync(string)) {
                                    errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}${string} no such directory!${endErrorLine}`));
                                }
                            });
                        }

                        // Setting genDirection
                        if (typeof optionMarker.genDirection !== 'undefined' && optionMarker.genDirection !== 'after' && optionMarker.genDirection !== 'before') {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/genDirection${betweenTwoLines}Type '${typeof optionMarker.genDirection}' is not assignable to type 'after' | 'before' | 'undefined'.${endErrorLine}`));
                        }

                        // Setting onceInsert
                        if (optionMarker.onceInsert && typeof optionMarker.onceInsert !== 'boolean') {
                            errors.push(new Error(`${beginOfLine}/markers[${indexMarker}]/onceInsert${betweenTwoLines}Type '${typeof optionMarker.onceInsert}' is not assignable to type 'boolean'.${endErrorLine}`));
                        }
                    });
                }
            }

            // Setting onComplete
            if (option.onComplete && typeof option.onComplete !== 'function') {
                errors.push(new Error(`${beginOfLine}/onComplete${betweenTwoLines}Type '${typeof option.onComplete}' is not assignable to type 'function'.${endErrorLine}`));
            }
        }
    };

    if (whichFunction === 'customGen' && Array.isArray(options)) {
        options.forEach((option, indexOption) => {
            checkArraySecondParam({ option, beginOfLine: `${whichFunction}/Config[${indexOption}]` });
        });
    }

    if (whichFunction === 'CLIGen') {
        if (Array.isArray(options)) {
            options.forEach((optionCLIGen: typesCommon.OptionCLIGen | any, indexCLIGen: number) => {
                if (typeof optionCLIGen.name !== 'string') {
                    errors.push(new Error(`${whichFunction}/ConfigCLIGen[${indexCLIGen}]/name${betweenTwoLines}Type '${typeof optionCLIGen.name}' is not assignable to type 'string'.${endErrorLine}`));
                }
                if (!Array.isArray(optionCLIGen.templates)) {
                    errors.push(new Error(`${whichFunction}/ConfigCLIGen[${indexCLIGen}]/templates${betweenTwoLines}Type '${typeof optionCLIGen.templates}' is not assignable to type 'array'.${endErrorLine}`));
                }
                if (Array.isArray(optionCLIGen.templates)) {
                    optionCLIGen.templates.forEach((option: any, indexOption: number) => {
                        checkArraySecondParam({ option, beginOfLine: `${whichFunction}/ConfigCLIGen[${indexCLIGen}]/templates[${indexOption}]` });
                    });
                }
            });
        }
    }

    if (errors.length > 0) {
        throw errors;
    }
};
