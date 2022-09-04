// Core
import enquirer from 'enquirer';

// Types
import { TypesGetSelectedName } from '../types';

export const getSelectedName = async (): Promise<TypesGetSelectedName> => {
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

    const arrAnswer: TypesGetSelectedName = answer.selectedName.trim().split(' ');

    return arrAnswer;
};

