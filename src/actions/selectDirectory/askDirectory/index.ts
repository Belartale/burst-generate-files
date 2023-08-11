// Core
const { AutoComplete } = require('enquirer');
import { resolve } from 'path';

// Constants
import {
    CONTROLLERS,
    CONTROLLERS_CREATE_NEW_FOLDER,
    CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS,
    controllersDirectories,
    getSelectionsOfCreateFolder,
} from './constants';

// Functions
import { getDirectories } from './getDirectories';

// Types
import * as types from './types';

export const askDirectory = async ({
    outputPath,
    selectedNames,
}: types.AskDirectory): Promise<string> => {
    const firstPartOfMessage = 'Choose a directory!\n    Current directory: ';

    class CustomAutoComplete extends AutoComplete {
        constructor(options: any) {
            super(options);
            this.outputPath = options.outputPath;
            this.currentDirectory = options.outputPath;
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
                    ...super.choices[ 0 ],
                    index:   index,
                    name:    nameNewChoice,
                    message: nameNewChoice,
                    value:   this.changeValue(nameNewChoice),
                    path:    nameNewChoice,
                };
            });
        }

        submit() {
            if (this.options.multiple) {
                this.value = this.selected.map((ch: any) => ch.name);
            }


            if (this.selected.name === controllersDirectories[ 0 ]) { // ../
                this.currentDirectory = resolve(this.currentDirectory, '..');
                this.options.message = firstPartOfMessage + this.currentDirectory;

                const gotDirectories = getDirectories({
                    currentDirectory:   this.currentDirectory,
                    outputAbsolutePath: this.outputPath,
                    selectedNames,
                });

                this.changeChoices(gotDirectories);

                this.render();

                return;
            }

            if (this.selected.name === controllersDirectories[ 1 ]) { // ./
                super.choices = [ ...super.choices ].map((choice) => {
                    if (choice.name === controllersDirectories[ 1 ]) {
                        return { ...choice, value: this.currentDirectory };
                    }

                    return choice;
                });

                return super.submit();
            }

            if (this.selected.name === CONTROLLERS.CREATE_NEW_FOLDER
                || this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS.OPTION_CANCEL) {
                // console.log(this.options);
                this.changeChoices(getSelectionsOfCreateFolder(selectedNames.map((name) => '/' + name.replaceVar)));

                this.focusOnFirstChoice();
                this.render();

                return;
            } else if (this.selected.name === CONTROLLERS_CREATE_NEW_FOLDER.OPTION_CANCEL) {
                const gotDirectories = getDirectories({
                    currentDirectory:   this.currentDirectory,
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
                currentDirectory:   this.currentDirectory,
                outputAbsolutePath: this.outputPath,
                selectedNames,
                debug:              true,
            });

            this.changeChoices(gotDirectories);

            this.focusOnFirstChoice();
            this.render();
        }
    }

    const promptCustomAutoComplete = new CustomAutoComplete({
        name:    'selectDirectory',
        outputPath,
        message: firstPartOfMessage + outputPath,
        choices: getDirectories({
            currentDirectory:   outputPath,
            outputAbsolutePath: outputPath,
            selectedNames,
        }),
    });

    const resultPrompt = await promptCustomAutoComplete.run();

    return resultPrompt;
};
