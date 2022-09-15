// Core
import enquirer from 'enquirer';

// Types
import * as types from '../types';

export const getSelectedName = async (strings: string[]): Promise<types.GetSelectedName[]> => {
    let result: [] | types.GetSelectedName[] = [];

    for await (const string of strings) {
        const replacerQuestion: any = {
            type:     'input',
            name:     'selectedName',
            message:  `Replace ${string} on >>> `,
            validate: (value: string) => {
                const isValid: boolean = Boolean(value.trim());

                return isValid || 'You must provide an answer!!!';
            },
        };

        const gotValue: {selectedName: string} = await enquirer.prompt(replacerQuestion);

        result = [
            ...result, {
                replaceVar: string,
                value:      gotValue.selectedName.trim(),
            },
        ];
    }

    return result;
};
