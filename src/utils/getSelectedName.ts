// Core
import enquirer from 'enquirer';

// Types

export const getSelectedName = async (): Promise<string> => {
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

    const arrAnswer = answer.selectedName.split(' ');

    for (let index = 1; index < arrAnswer.length; index++) {
        const str = arrAnswer[ index ];
        arrAnswer[ index ] = str[ 0 ].toUpperCase() + str.slice(1);
    }

    return arrAnswer.join('');
};

