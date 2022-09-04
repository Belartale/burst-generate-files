// Types
import { TypesReplaceWordCase } from '../types';

export const replaceWordCase = ({ string, stringReplacers, selectedName }: TypesReplaceWordCase) => {
    let result = string;

    if (result && result.includes(`${stringReplacers}(noCase)`)) { // lorem lorem => LoremLorem
        const re = new RegExp(`${stringReplacers}.noCase.`, 'g');
        const modifiedToPascalCase = selectedName.join(' ');
        result = result.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplacers}(pascalCase)`)) { // lorem lorem => LoremLorem
        const re = new RegExp(`${stringReplacers}.pascalCase.`, 'g');
        const modifiedToPascalCase = selectedName.map((word) => word[ 0 ].toUpperCase() + word.slice(1)).join('');
        result = result.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplacers}(constantCase)`)) { // lorem lorem => LOREM_LOREM
        const re = new RegExp(`${stringReplacers}.constantCase.`, 'g');
        const modifiedToConstantCase = selectedName.map((word) => word.toUpperCase()).join('_');
        result = result.replace(re, modifiedToConstantCase);
    }

    if (result && result.includes(`${stringReplacers}(kebabCase)`)) { // lorem lorem => lorem-lorem
        const re = new RegExp(`${stringReplacers}.kebabCase.`, 'g');
        const modifiedToKebabCase = selectedName.map((word) => word.toLowerCase()).join('-');
        result = result.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(stringReplacers)) { // lorem lorem => loremLorem
        const re = new RegExp(`${stringReplacers}`, 'g');
        const modifiedToDefault = selectedName.map((word, index) => index > 0 ? word[ 0 ].toUpperCase() + word.slice(1) : word).join('');
        result = result.replace(re, modifiedToDefault);
    }

    return result;
};
