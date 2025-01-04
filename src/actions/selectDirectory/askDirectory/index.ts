// Core
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { AutoComplete } = require('enquirer');
import { resolve } from 'path';

// Constants
import { DEFAULT_WORDS_CASES_ARRAY } from '../../../constants';
import {
    CONTROLLERS,
    CONTROLLERS_CREATE_NEW_FOLDER,
    CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS,
    controllersDirectories,
    firstPartOfMessage,
    firstPartOfMessageForSelectingWordCase,
    getOptionsOfCreateNewFolder,
} from './constants';

// Functions
import { getDirectories } from './getDirectories';

// Types
import * as types from './types';

export const askDirectory = async ({ outputPath, selectedNames }: types.AskDirectory): Promise<string> => {
    class CustomAutoComplete extends AutoComplete {
        mode: null | CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.MAIN;

        constructor(options: types.OptionsConstructorOfCustomAutoComplete) {
            super(options);
            this.outputPath = options.outputPath;
            this.currentDirectory = options.outputPath;
            this.mode = null;
        }

        focusOnFirstChoice() {
            this.index = Math.max(0, Math.min(0, this.choices.length));
            this.enable(this.find(this.index));
        }

        changeValue(string: string): string {
            if (string === './') {
                return this.currentDirectory;
            }

            return string;
        }

        changeChoices(newChoices: string[]) {
            super.choices = newChoices.map((nameNewChoice, index) => {
                return {
                    ...super.choices[0],
                    index: index,
                    name: nameNewChoice,
                    message: nameNewChoice,
                    value: this.changeValue(nameNewChoice),
                    path: nameNewChoice,
                };
            });
        }

        submit() {
            // Core start
            if (this.options.multiple) {
                this.value = this.selected.map((ch: types.OptionsConstructorOfCustomAutoComplete) => ch.name);
            }
            // Core end

            if (this.selected.name === controllersDirectories[0]) {
                // ../
                this.currentDirectory = resolve(this.currentDirectory, '..');
                this.options.message = firstPartOfMessage + this.currentDirectory;

                const gotDirectories = getDirectories({
                    currentDirectory: this.currentDirectory,
                    outputAbsolutePath: this.outputPath,
                    selectedNames,
                });

                this.changeChoices(gotDirectories);

                this.render();

                return;
            }

            if (this.selected.name === controllersDirectories[1]) {
                // ./
                super.choices = [...super.choices].map((choice) => {
                    if (choice.name === controllersDirectories[1]) {
                        return { ...choice, value: this.currentDirectory };
                    }

                    return choice;
                });

                return super.submit();
            }

            if (
                this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER.MAIN ||
                this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER.OPTION_CANCEL
            ) {
                // create new folder (system settings)
                this.changeChoices([CONTROLLERS.OPTION_CANCEL, CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.MAIN]);

                this.focusOnFirstChoice();
                this.render();

                return;
            } else if (this.selected.name === CONTROLLERS.OPTION_CANCEL) {
                // leave create new folder (system settings)
                const gotDirectories = getDirectories({
                    currentDirectory: this.currentDirectory,
                    outputAbsolutePath: this.outputPath,
                    selectedNames,
                });

                this.changeChoices(gotDirectories);

                this.focusOnFirstChoice();
                this.render();

                return;
            } else if (
                this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.MAIN ||
                this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.OPTION_CANCEL
            ) {
                // go to Create new folder by stringsReplacers (list stringsReplacers)
                this.mode = CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.MAIN;

                this.changeChoices(getOptionsOfCreateNewFolder(selectedNames.map((name) => '/' + name.replaceVar)));

                this.focusOnFirstChoice();
                this.render();

                return;
            } else if (
                this.mode === CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.MAIN &&
                selectedNames.some((selectedName) => selectedName.replaceVar === this.selected.name.replace('/', ''))
            ) {
                // select word case
                this.currentDirectory = resolve(this.currentDirectory, this.selected.name.replace('/', ''));

                this.options.message = firstPartOfMessageForSelectingWordCase + this.currentDirectory;

                this.changeChoices([CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.OPTION_CANCEL, ...DEFAULT_WORDS_CASES_ARRAY]);

                this.focusOnFirstChoice();
                this.render();

                return;
            } else if (DEFAULT_WORDS_CASES_ARRAY.some((wordCase) => wordCase === this.selected.name)) {
                this.mode = null;

                this.currentDirectory += `(${this.selected.name})`;

                this.options.message = firstPartOfMessage + this.currentDirectory;

                const gotDirectories = getDirectories({
                    currentDirectory: this.currentDirectory,
                    outputAbsolutePath: this.outputPath,
                    selectedNames,
                });

                this.changeChoices(gotDirectories);

                this.focusOnFirstChoice();
                this.render();

                return;
            }

            this.currentDirectory = resolve(this.currentDirectory, this.selected.value.replace('/', ''));

            this.options.message = firstPartOfMessage + this.currentDirectory;

            const gotDirectories = getDirectories({
                currentDirectory: this.currentDirectory,
                outputAbsolutePath: this.outputPath,
                selectedNames,
            });

            this.changeChoices(gotDirectories);

            this.focusOnFirstChoice();
            this.render();
        }
    }

    const promptCustomAutoComplete = new CustomAutoComplete({
        name: 'selectDirectory',
        outputPath,
        message: firstPartOfMessage + outputPath,
        choices: getDirectories({
            currentDirectory: outputPath,
            outputAbsolutePath: outputPath,
            selectedNames,
        }),
    });

    const resultPrompt = await promptCustomAutoComplete.run();

    return resultPrompt;
};
