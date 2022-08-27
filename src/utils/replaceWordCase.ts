// Types
import { TypesGetWordCase } from '../types';

export const replaceWordCase = ({ string, stringReplacers, selectedName }: TypesGetWordCase) => {
    let result = string;


    if (result && result.includes(`${stringReplacers}(pascalCase)`)) {
        const re = new RegExp(`${stringReplacers}.pascalCase.`, 'g');

        const firstLetterToUpperCase = selectedName[ 0 ].toUpperCase() + selectedName.slice(1);

        result = result.replace(re, firstLetterToUpperCase);
    }

    if (result && result.includes(`${stringReplacers}(constantCase)`)) {
        const re = new RegExp(`${stringReplacers}.constantCase.`, 'g');

        const firstLetterToUpperCase = selectedName.toUpperCase();

        result = result.replace(re, firstLetterToUpperCase);
    }

    if (result && result.includes(stringReplacers)) {
        const re = new RegExp(`${stringReplacers}`, 'g');

        result = result.replace(re, selectedName);
    }

    return result;
};
