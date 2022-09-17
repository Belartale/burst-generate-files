export {};
// // Core
// import fs from 'fs';

// // Types
// import * as types from '../types';

// export const checkError = (PROJECT_ROOT: string, options: types.OptionCustomGenO[] | types.OptionCLIGenO[], whichFunction: 'customGen' | 'CLIGen') => {
//     let errors = [];

//     // Setting First param
//     if (!PROJECT_ROOT || typeof PROJECT_ROOT !== 'string') {
//         errors.push(new Error(`First argument: The argument must be string and must be root path of your application! But you use ${typeof PROJECT_ROOT}!`));
//     }
//     if (typeof PROJECT_ROOT === 'string' && !fs.existsSync(PROJECT_ROOT)) {
//         errors.push(new Error('Root path of your application is incorrect! You must check the first argument!'));
//     }

//     // Setting Second param
//     if (!options || !Array.isArray(options)) {
//         errors.push(new Error(`Second argument: The argument must be array with objects! But you use ${typeof PROJECT_ROOT}!`));
//     }
//     if (Array.isArray(options)) {
//         // Setting Array >>> Objects
//         if (options.some((obj) => typeof obj !== 'object')) {
//             errors.push(new Error('Settings of second argument: settings must be object!'));
//         }
//         options.forEach((option: any, index: number) => { // todo remove any
//             if (whichFunction === 'CLIGen') {
//                 if (typeof option.name !== 'string') {
//                     errors.push(new Error(`name of number ${index} object must be string!`));
//                 }
//             }

//             // Setting stringsReplacers
//             if (whichFunction === 'customGen') {
//                 if (typeof option.stringsReplacers !== 'object') {
//                     errors.push(new Error(`stringsReplacers of number ${index} object must be object or array!`));
//                 }
//                 if (typeof option.stringsReplacers === 'object' && !Array.isArray(option.stringsReplacers)) {
//                     if (typeof option.stringsReplacers.replaceVar !== 'string') {
//                         errors.push(new Error(`replaceVar of stringsReplacers in number ${index} object must be string!`));
//                     }
//                     if (typeof option.stringsReplacers.value !== 'string') {
//                         errors.push(new Error(`value of stringsReplacers in number ${index} object must be string!`));
//                     }
//                 }
//                 if (Array.isArray(option.stringsReplacers)) {
//                     option.stringsReplacers.forEach((obj: types.OptionStringsReplacersCustomGen) => {
//                         if (typeof obj.replaceVar !== 'string') {
//                             errors.push(new Error(`replaceVar of stringsReplacers in number ${index} object must be string!`));
//                         }
//                         if (typeof obj.value !== 'string') {
//                             errors.push(new Error(`value of stringsReplacers in number ${index} object must be string!`));
//                         }
//                     });
//                 }
//             }
//             if (whichFunction === 'CLIGen') {
//                 if (typeof option.stringsReplacers !== 'string' && !Array.isArray(option.stringsReplacers)) {
//                     errors.push(new Error(`stringsReplacers of number ${index} object must be string or array!`));
//                     console.log('text');
//                 }
//                 if (Array.isArray(option.stringsReplacers)) {
//                     option.stringsReplacers.forEach((string: types.OptionCLIGenO['stringsReplacers']) => {
//                         if (typeof string !== 'string') {
//                             errors.push(new Error(`value of stringsReplacers in number ${index} object must be string!`));
//                         }
//                     });
//                 }
//             }

//             // Setting pathToTemplate
//             if (typeof option.pathToTemplate !== 'string') {
//                 errors.push(new Error(`pathToTemplate of number ${index} object must be string!`));
//             }
//             if (typeof option.pathToTemplate === 'string' && !fs.existsSync(option.pathToTemplate)) {
//                 errors.push(new Error(`pathToTemplate of number ${index} object, ${option.pathToTemplate} no such directory!`));
//             }

//             // Setting outputPath
//             if (typeof option.outputPath !== 'string') {
//                 errors.push(new Error(`outputPath of number ${index} object must be string!`));
//             }

//             // Setting markers
//             if (!Array.isArray(option.markers)) {
//                 errors.push(new Error(`markers of number ${index} object must be array!`));
//             }

//             if (Array.isArray(option.markers)) {
//                 option.markers.forEach((objectMarker: types.OptionsMarker, indexMarker: number) => {
//                     // Setting pathToMarker
//                     if (typeof objectMarker.pathToMarker !== 'string') {
//                         errors.push(new Error(`markers of number ${index} object, pathToMarker of number markers ${indexMarker} must be string!`));
//                     }

//                     // Setting marker
//                     //! todo replace marker: string | RegExps !!!!!!!!!!
//                     if (typeof objectMarker.marker !== 'string' && (typeof objectMarker.marker !== 'object' && !Array.isArray(objectMarker.marker))) {
//                         errors.push(new Error(`markers of number ${index} object, marker of number ${indexMarker} markers must be string or object!`));
//                     }
//                     if (typeof objectMarker.marker === 'object' && !Array.isArray(objectMarker.marker)) {
//                         // Setting marker.value
//                         if (typeof objectMarker.marker.value !== 'string') {
//                             errors.push(new Error(`markers of number ${index} object, value of marker in number ${indexMarker} object must be string!`));
//                         }

//                         // Setting marker.regExpValue
//                         if (typeof objectMarker.marker.regExpValue !== 'string') {
//                             errors.push(new Error(`markers of number ${index} object, regExpValue of marker in number ${indexMarker} object must be string!`));
//                         }

//                         // Setting marker.regExpFlags
//                         if (objectMarker.marker.regExpFlags && typeof objectMarker.marker.regExpFlags !== 'string') {
//                             errors.push(new Error(`markers of number ${index} object, regExpFlags of marker in number ${indexMarker} object must be string!`));
//                         }
//                     }

//                     // Setting genDirection
//                     if (objectMarker.genDirection && objectMarker.genDirection !== 'after marker' && objectMarker.genDirection !== 'before marker') {
//                     // if (typeof objectMarker.genDirection !== 'string') {
//                         errors.push(new Error(`markers of number ${index} object, genDirection of number ${indexMarker} object must be string or incorrect value!`));
//                     }

//                     // Setting markerTemplate
//                     if (typeof objectMarker.markerTemplate !== 'string') {
//                         errors.push(new Error(`markers of number ${index} object, markerTemplate of number ${indexMarker} object must be string!`));
//                     }

//                     // Setting onceInsert
//                     if (objectMarker.onceInsert && typeof objectMarker.onceInsert !== 'boolean') {
//                         errors.push(new Error(`markers of number ${index} object, onceInsert of number ${indexMarker} object must be boolean!`));
//                     }
//                 });
//             }

//             // Setting onComplete
//             if (option.onComplete && typeof option.onComplete !== 'function') {
//                 errors.push(new Error(`onComplete of number ${index} object is not function!`));
//             }
//         });
//     }

//     if (errors.length > 0) {
//         // const removedDuplicate = [ ...new Set(errors) ]; // to remove duplicates
//         // throw removedDuplicate;
//         throw errors;
//     }
// };
