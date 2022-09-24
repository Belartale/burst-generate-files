// Types
import * as types from './types';

const cases = ({ stringReplace, result }: types.Cases) => {
    const newString = stringReplace.value.split(' ');
    let newResult = result;

    if (result && result.includes(`${stringReplace.replaceVar}(noCase)`)) { // lorem lorem => loremlorem
        const re = new RegExp(`${stringReplace.replaceVar}.noCase.`, 'g');
        const modifiedToPascalCase = newString.join(' ');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(pascalCase)`)) { // lorem lorem => LoremLorem
        const re = new RegExp(`${stringReplace.replaceVar}.pascalCase.`, 'g');
        const modifiedToPascalCase = newString.map((word) => word[ 0 ].toUpperCase() + word.slice(1)).join('');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(constantCase)`)) { // lorem lorem => LOREM_LOREM
        const re = new RegExp(`${stringReplace.replaceVar}.constantCase.`, 'g');
        const modifiedToConstantCase = newString.map((word) => word.toUpperCase()).join('_');

        newResult = newResult.replace(re, modifiedToConstantCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(kebabCase)`)) { // lorem lorem => lorem-lorem
        const re = new RegExp(`${stringReplace.replaceVar}.kebabCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word).join('-');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(dotCase)`)) { // lorem lorem => lorem.lorem
        const re = new RegExp(`${stringReplace.replaceVar}.dotCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word).join('.');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(lowerCase)`)) { // LOREM LoRem => loremlorem
        const re = new RegExp(`${stringReplace.replaceVar}.lowerCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(pathCase)`)) { // lorem lorem => lorem/lorem
        const re = new RegExp(`${stringReplace.replaceVar}.pathCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word).join('/');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(sentenceCase)`)) { // lorem lorem => Lorem lorem
        const re = new RegExp(`${stringReplace.replaceVar}.sentenceCase.`, 'g');
        const modifiedToKebabCase = newString.map((word, index) => {
            if (index === 0) {
                return word.split('').map((letter, index) => index === 0 ? letter.toUpperCase() : letter)
                    .join('');
            }

            return word;
        }).join(' ');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(snakeCase)`)) { // lorem lorem => lorem_lorem
        const re = new RegExp(`${stringReplace.replaceVar}.snakeCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word).join('_');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(titleCase)`)) { // lorem lorem => Lorem Lorem
        const re = new RegExp(`${stringReplace.replaceVar}.titleCase.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word[ 0 ].toUpperCase() + word.slice(1)).join(' ');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(stringReplace.replaceVar)) { // lorem lorem => loremLorem
        const re = new RegExp(`${stringReplace.replaceVar}`, 'g');
        const modifiedToDefault = newString.map((word, index) => index > 0 ? word[ 0 ].toUpperCase() + word.slice(1) : word).join('');

        newResult = newResult.replace(re, modifiedToDefault);
    }

    return newResult;
};

export const replaceWordCase = ({ string, stringsForReplace }: types.ReplaceWordCase) => {
    let result = string;

    if (Array.isArray(stringsForReplace)) {
        stringsForReplace.forEach((stringReplace) => {
            result = cases({ stringReplace, result });
        });
    }

    if (!Array.isArray(stringsForReplace) && stringsForReplace.replaceVar) {
        result = cases({ stringReplace: stringsForReplace, result });
    }

    return result;
};
