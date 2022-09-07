// Core
import enquirer from 'enquirer';
import { resolve } from 'path';
import { path as PROJECT_ROOT } from 'app-root-path';

// Types
import * as types from '../types';

export const getSelectedItem = async (options: types.GenerateOptionsItem[]): Promise<types.GenerateOptionsItem> => {
    const templateQuestions = {
        type:    'autocomplete',
        name:    'optionChoice',
        message: 'What do you want to generate?',
        choices: options.map((configItem: types.GenerateOptionsItem) => configItem.name),
        suggest(input: string, choices: string[]) {
            return choices.filter((choice: any) => {
                return choice.message.toLowerCase().startsWith(input.toLowerCase());
            });
        },
    };
    const templateAnswers: { optionChoice: string } = await enquirer.prompt(templateQuestions);

    const foundOption = options.find(
        (item: types.GenerateOptionsItem) => item.name === templateAnswers.optionChoice,
    ) as types.GenerateOptionsItem;

    return {
        ...foundOption,
        pathTemplate: resolve(PROJECT_ROOT, foundOption.pathTemplate),
        outputPath:   resolve(PROJECT_ROOT, foundOption.outputPath),
    } as types.GenerateOptionsItem;
};

