// Types
import * as types from '../types';

export const replaceWordCase = ({ string, arrayStringAndNewString }: types.ReplaceWordCase) => {
    let result = string;

    arrayStringAndNewString.forEach((stringAndNewString) => {
        if (result && result.includes(`${stringAndNewString.string}(noCase)`)) { // lorem lorem => LoremLorem
            const re = new RegExp(`${stringAndNewString.string}.noCase.`, 'g');
            const modifiedToPascalCase = stringAndNewString.newString.join(' ');
            result = result.replace(re, modifiedToPascalCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(pascalCase)`)) { // lorem lorem => LoremLorem
            const re = new RegExp(`${stringAndNewString.string}.pascalCase.`, 'g');
            const modifiedToPascalCase = stringAndNewString.newString.map((word) => word[ 0 ].toUpperCase() + word.slice(1)).join('');
            result = result.replace(re, modifiedToPascalCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(constantCase)`)) { // lorem lorem => LOREM_LOREM
            const re = new RegExp(`${stringAndNewString.string}.constantCase.`, 'g');
            const modifiedToConstantCase = stringAndNewString.newString.map((word) => word.toUpperCase()).join('_');
            result = result.replace(re, modifiedToConstantCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(kebabCase)`)) { // lorem lorem => lorem-lorem
            const re = new RegExp(`${stringAndNewString.string}.kebabCase.`, 'g');
            const modifiedToKebabCase = stringAndNewString.newString.map((word) => word.toLowerCase()).join('-');
            result = result.replace(re, modifiedToKebabCase);
        }

        if (result && result.includes(stringAndNewString.string)) { // lorem lorem => loremLorem
            const re = new RegExp(`${stringAndNewString.string}`, 'g');
            const modifiedToDefault = stringAndNewString.newString.map((word, index) => index > 0 ? word[ 0 ].toUpperCase() + word.slice(1) : word).join('');
            result = result.replace(re, modifiedToDefault);
        }
    });


    return result;
};
