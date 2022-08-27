// Core
import enquirer from 'enquirer';

// Types
import { GenerateOptionsItem } from '../types';

export const getSelectedItem = async (options: GenerateOptionsItem[]): Promise<GenerateOptionsItem> => {
    const templateQuestions = {
        type:    'autocomplete',
        name:    'optionChoice',
        message: 'What do you want to generate?',
        choices: options.map((configItem: GenerateOptionsItem) => configItem.name),
        suggest(input: string, choices: string[]) {
            return choices.filter((choice: any) => {
                return choice.message.toLowerCase().startsWith(input.toLowerCase());
            });
        },
    };
    const templateAnswers: { optionChoice: string } = await enquirer.prompt(templateQuestions);

    return options.find(
        (item: GenerateOptionsItem) => item.name === templateAnswers.optionChoice,
    ) as GenerateOptionsItem;
};

