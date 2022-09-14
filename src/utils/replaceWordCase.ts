// Types
import * as types from '../types';

export const replaceWordCase = ({ string, stringsForReplace }: types.ReplaceWordCase) => {
    let result = string;


    stringsForReplace.forEach((stringAndNewString) => {
        const newString = stringAndNewString.newString.split(' ');
        if (result && result.includes(`${stringAndNewString.string}(noCase)`)) { // lorem lorem => LoremLorem
            const re = new RegExp(`${stringAndNewString.string}.noCase.`, 'g');
            const modifiedToPascalCase = newString.join(' ');
            result = result.replace(re, modifiedToPascalCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(pascalCase)`)) { // lorem lorem => LoremLorem
            const re = new RegExp(`${stringAndNewString.string}.pascalCase.`, 'g');
            const modifiedToPascalCase = newString.map((word) => word[ 0 ].toUpperCase() + word.slice(1)).join('');
            result = result.replace(re, modifiedToPascalCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(constantCase)`)) { // lorem lorem => LOREM_LOREM
            const re = new RegExp(`${stringAndNewString.string}.constantCase.`, 'g');
            const modifiedToConstantCase = newString.map((word) => word.toUpperCase()).join('_');
            result = result.replace(re, modifiedToConstantCase);
        }

        if (result && result.includes(`${stringAndNewString.string}(kebabCase)`)) { // lorem lorem => lorem-lorem
            const re = new RegExp(`${stringAndNewString.string}.kebabCase.`, 'g');
            const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('-');
            result = result.replace(re, modifiedToKebabCase);
        }

        if (result && result.includes(stringAndNewString.string)) { // lorem lorem => loremLorem
            const re = new RegExp(`${stringAndNewString.string}`, 'g');
            const modifiedToDefault = newString.map((word, index) => index > 0 ? word[ 0 ].toUpperCase() + word.slice(1) : word).join('');
            result = result.replace(re, modifiedToDefault);
        }
    });


    return result;
};
