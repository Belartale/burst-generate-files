// Core
import enquirer from 'enquirer';

// Types
import * as types from '../types';

export const getSelectedItem = async (options: types.GetSelectedItem): Promise<types.Option> => {
    const templateQuestions = {
        type:    'autocomplete',
        name:    'optionChoice',
        message: 'What do you want to generate?',
        choices: options.map((configItem: types.OptionOCLI) => configItem.name),
        suggest(input: string, choices: string[]) {
            return choices.filter((choice: any) => {
                return choice.message.toLowerCase().startsWith(input.toLowerCase());
            });
        },
    };
    const templateAnswers: { optionChoice: string } = await enquirer.prompt(templateQuestions);

    return options.find(
        (item: types.OptionOCLI) => item.name === templateAnswers.optionChoice,
    ) as types.Option;
};

