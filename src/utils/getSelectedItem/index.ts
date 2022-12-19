// Core
import enquirer from 'enquirer';

// Constants
import { constantForRemovingEntity } from '../../constants';

// Types
import * as typesCommon from '../../types';

export const getSelectedItem = async (options: typesCommon.OptionCLIGen[]): Promise<typesCommon.OptionCLIGen> => {
    const getNamesForShowingInCLI = () => {
        const result = options.map((option) => option.name);

        return [ ...result, constantForRemovingEntity ];
    };

    const gotValue: { optionChoice: string } = await enquirer.prompt(
        {
            type:    'autocomplete',
            name:    'optionChoice',
            message: 'What do you want to generate?',
            choices: getNamesForShowingInCLI(),
        },
    );

    return [ ...options, { name: constantForRemovingEntity }].find(
        (item: Omit<typesCommon.OptionCLIGen, 'templates'>) => item.name === gotValue.optionChoice,
    ) as typesCommon.OptionCLIGen;
};

