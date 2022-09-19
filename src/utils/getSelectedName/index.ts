// Core
import enquirer from 'enquirer';

// Types
import * as types from './types';

const getName = async ({ replaceVar, result }: types.GetName) => {
    const replacerQuestion: any = {
        type:     'input',
        name:     'selectedName',
        message:  `Replace ${replaceVar} on >>> `,
        validate: (value: string) => {
            const isValid: boolean = Boolean(value.trim());

            return isValid || 'You must provide an answer!!!';
        },
    };

    const gotValue: {selectedName: string} = await enquirer.prompt(replacerQuestion);

    return [
        ...result, {
            replaceVar,
            value: gotValue.selectedName.trim(),
        },
    ];
};

export const getSelectedName = async (strings: string | string[]): Promise<types.GetSelectedName[]> => {
    let result: [] | types.GetSelectedName[] = [];

    if (Array.isArray(strings)) {
        for await (const string of strings) {
            result = await getName({ replaceVar: string, result });
        }
    }
    if (!Array.isArray(strings)) {
        result = await getName({ replaceVar: strings, result });
    }

    return result;
};
