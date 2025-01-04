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

    const regexpNo = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.NO}.`;
    if (result && new RegExp(regexpNo).test(result)) {
        // lorem lorem => lorem lorem
        const re = new RegExp(regexpNo, 'g');
        const modifiedToPascalCase = newString.join(' ');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    const regexpCamel = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.CAMEL}.`;
    if (result && new RegExp(regexpCamel).test(result)) {
        // Lorem lorem => loremLorem
        const re = new RegExp(regexpCamel, 'g');
        const modifiedToPascalCase = newString.map((word, index) => camelCase(word, index)).join('');

        newResult = newResult.replace(re, modifiedToPascalCase);
    }

    const regexpPascal = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.PASCAL}.`;
    if (result && new RegExp(regexpPascal).test(result)) {
        // lorem lorem => LoremLorem
        const re = new RegExp(regexpPascal, 'g');
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

    const regexpConstant = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.CONSTANT}.`;
    if (result && new RegExp(regexpConstant).test(result)) {
        // lorem lorem => LOREM_LOREM
        const re = new RegExp(regexpConstant, 'g');
        const modifiedToConstantCase = newString.map((word) => word.toUpperCase()).join('_');

        newResult = newResult.replace(re, modifiedToConstantCase);
    }

    const regexpKebab = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.KEBAB}.`;
    if (result && new RegExp(regexpKebab).test(result)) {
        // lorem lorem => lorem-lorem
        const re = new RegExp(regexpKebab, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('-');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    const regexpDot = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.DOT}.`;
    if (result && new RegExp(regexpDot).test(result)) {
        // lorem lorem => lorem.lorem
        const re = new RegExp(regexpDot, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('.');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    const regexpLower = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.LOWER}.`;
    if (result && new RegExp(regexpLower).test(result)) {
        // LOREM LoRem => loremlorem
        const re = new RegExp(regexpLower, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    const regexpPath = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.PATH}.`;
    if (result && new RegExp(regexpPath).test(result)) {
        // lorem lorem => lorem/lorem
        const re = new RegExp(regexpPath, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('/');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    const regexpSentence = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.SENTENCE}.`;
    if (result && new RegExp(regexpSentence).test(result)) {
        // lorem lorem => Lorem lorem
        const re = new RegExp(regexpSentence, 'g');
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

    const regexpSnake = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.SNAKE}.`;
    if (result && new RegExp(regexpSnake).test(result)) {
        // lorem lorem => lorem_lorem
        const re = new RegExp(regexpSnake, 'g');
        const modifiedToKebabCase = newString.map((word) => word.toLowerCase()).join('_');

        newResult = newResult.replace(re, modifiedToKebabCase);
    }

    const regexpTitle = `${stringReplace.replaceVar}.${DEFAULT_WORDS_CASES.TITLE}.`;
    if (result && new RegExp(regexpTitle).test(result)) {
        // lorem lorem => Lorem Lorem
        const re = new RegExp(regexpTitle, 'g');
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
    const defaultCamel = stringReplace.replaceVar;
    if (result && new RegExp(defaultCamel).test(result)) {
        // lorem lorem => loremLorem
        const re = new RegExp(defaultCamel, 'g');
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
