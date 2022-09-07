// Core
import enquirer from 'enquirer';

// Types
import * as types from '../types';

export const getSelectedName = async (): Promise<types.GetSelectedName> => {
    const replacerQuestion: any = {
        type:     'input',
        name:     'selectedName',
        message:  'Replace name on >>> ',
        validate: (replacerSlotValue: string) => {
            const isValid: boolean = Boolean(replacerSlotValue.trim());

            return isValid || 'You must provide an answer.';
        },
    };

    const answer: {selectedName: string} = await enquirer.prompt(replacerQuestion);

    const arrAnswer: types.GetSelectedName = answer.selectedName.trim().split(' ');

    return arrAnswer;
};

