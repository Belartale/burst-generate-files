// Constants
import { DEFAULT_WORDS_CASES } from '../../constants';

// Types
import * as types from './types';

const cases = ({ stringReplace, result }: types.Cases) => {
    let newString = stringReplace.value.split(' ');
    if (newString.length <= 1 && /.*[A-Z]/.test(stringReplace.value) && stringReplace.value.toUpperCase() !== stringReplace.value) {
        const arrCamelCase = stringReplace.value.split('').map((letter, index) => {
            if (index !== 0 && /[A-Z]/.test(letter)) {
                return ' ' + letter;
            }

            return letter;
        });

        newString = arrCamelCase.join('').split(' ');
    }
    let newResult = result;

    const camelCase = (word: string, indexWord: number) => {
        if (indexWord === 0) {
            return word
                .split('')
                .map((letter) => letter.toLowerCase())
                .join('');
        }

        return (
            word[0].toUpperCase() +
            word
                .slice(1)
                .split('')
                .map((letter) => letter.toLowerCase())
                .join('')
        );
    };

    // todo replace .includes to regex >>> ) and (

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.NO})`)) {
        // lorem lorem => lorem lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.NO}.`, 'g');
        const modifiedToPascalCase = newString.join(' ');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.CAMEL})`)) {
        // Lorem lorem => loremLorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.CAMEL}.`, 'g');
        const modifiedToPascalCase = newString.map((word, index) => camelCase(word, index)).join('');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.PASCAL})`)) {
        // lorem lorem => LoremLorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.PASCAL}.`, 'g');
        const modifiedToPascalCase = newString
            .map(
                (word) =>
                    word[0].toUpperCase() +
                    word
                        .slice(1)
                        .split('')
                        .map((latter) => latter.toLowerCase())
                        .join(''),
            )
            .join('');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.CONSTANT})`)) {
        // lorem lorem => LOREM_LOREM
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.CONSTANT}.`, 'g');
        const modifiedToConstantCase = newString.map((word) => word.toUpperCase()).join('_');

        newResult = newResult.replace(re, modifiedToConstantCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.KEBAB})`)) {
        // lorem lorem => lorem-lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.KEBAB}.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('-');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.DOT})`)) {
        // lorem lorem => lorem.lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.DOT}.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('.');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.LOWER})`)) {
        // LOREM LoRem => loremlorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.LOWER}.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.PATH})`)) {
        // lorem lorem => lorem/lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.PATH}.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('/');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.SENTENCE})`)) {
        // lorem lorem => Lorem lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.SENTENCE}.`, 'g');
        const modifiedToKebabCase = newString
            .map((word, index) => {
                if (index === 0) {
                    return word
                        .split('')
                        .map((letter, index) => (index === 0 ? letter.toUpperCase() : letter))
                        .join('');
                }

                return word;
            })
            .join(' ');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.SNAKE})`)) {
        // lorem lorem => lorem_lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.SNAKE}.`, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('_');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    if (result && result.includes(`${stringReplace.replaceVar}(${DEFAULT_WORDS_CASES.TITLE})`)) {
        // lorem lorem => Lorem Lorem
        const re = new RegExp(`${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.TITLE}.`, 'g');
        const modifiedToKebabCase = newString
            .map(
                (word) =>
                    word[0].toUpperCase() +
                    word
                        .slice(1)
                        .split('')
                        .map((letter) => letter.toLowerCase())
                        .join(''),
            )
            .join(' ');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    // DEFAULT_WORDS_CASES.CAMEL
    if (result && result.includes(stringReplace.replaceVar)) {
        // lorem lorem => loremLorem
        const re = new RegExp(`${stringReplace.replaceVar}`, 'g');
        const modifiedToDefault = newString.map((word, index) => camelCase(word, index)).join('');

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
