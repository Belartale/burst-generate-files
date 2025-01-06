// Core
import enquirer from 'enquirer';

// Types
import * as types from './types';

const getNameFromCLI = async ({ message, name }: types.GetName) => {
    const gotValue: types.GotValueOfEnquirerPrompt = await enquirer.prompt({
        type: 'input',
        name: name,
        message: message,
        validate: (value: string) => {
            const isValid: boolean = Boolean(value.trim());

            return isValid || 'You must provide an answer!!!';
        },
    });

    return gotValue.selectedName.trim();
};

export const getSelectedName = async (strings: string | string[]): Promise<types.GetSelectedName[]> => {
    let result: [] | types.GetSelectedName[] = [];

    if (Array.isArray(strings)) {
        for await (const string of strings) {
            result = [
                ...result,
                {
                    replaceVar: string,
                    value: await getNameFromCLI({ message: `Replace ${string} on`, name: 'selectedName' }),
                },
            ];
        }
    }
    if (!Array.isArray(strings)) {
        result = [
            ...result,
            {
                replaceVar: strings,
                value: await getNameFromCLI({ message: `Replace ${strings} on`, name: 'selectedName' }),
            },
        ];
    }

    return result;
};
