// Core
import enquirer from 'enquirer';

// Types
import * as typesCommon from '../../types';
import * as types from '../types';

export const getSelectedItem = async (options: types.GetSelectedItem): Promise<typesCommon.OptionCLIGen> => {
    const templateQuestions = {
        type:    'autocomplete',
        name:    'optionChoice',
        message: 'What do you want to generate?',
        choices: options.map((configItem: typesCommon.OptionCLIGen) => configItem.name),
        suggest(input: string, choices: string[]) {
            return choices.filter((choice: any) => {
                return choice.message.toLowerCase().startsWith(input.toLowerCase());
            });
        },
    };
    const templateAnswers: { optionChoice: string } = await enquirer.prompt(templateQuestions);

    return options.find(
        (item: typesCommon.OptionCLIGen) => item.name === templateAnswers.optionChoice,
    ) as typesCommon.OptionCLIGen;
};

