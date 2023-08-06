// Core
const { AutoComplete } = require('enquirer');
import { resolve } from 'path';

// Constants
import {
    controllersDirectories, partOfMessageForCreatingCLI,
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

        removePartOfMessageForCreatingCLI(string: string): string {
            return string.replace(partOfMessageForCreatingCLI, '');
        }

        submit() {
            if (this.options.multiple) {
                this.value = this.selected.map((ch: any) => ch.name);
            }

            if (this.selected.name === controllersDirectories[ 0 ]) { // ../
                this.currentDirectory = resolve(this.removePartOfMessageForCreatingCLI(this.currentDirectory), '..');
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
                this.currentDirectory = this.removePartOfMessageForCreatingCLI(this.currentDirectory);
                super.choices = [ ...super.choices ].map((choice) => {
                    if (choice.name === controllersDirectories[ 1 ]) {
                        return { ...choice, value: this.currentDirectory };
                    }

                    return choice;
                });

                return super.submit();
            }

            if (this.selected.value.includes(partOfMessageForCreatingCLI)) {
                this.currentDirectory = resolve(
                    this.currentDirectory + this.removePartOfMessageForCreatingCLI(this.selected.value),
                ) + partOfMessageForCreatingCLI;
            } else {
                this.currentDirectory = resolve(this.currentDirectory + this.selected.value);
            }

            this.options.message = firstPartOfMessage + this.currentDirectory;

            const gotDirectories = getDirectories({
                currentDirectory:   this.currentDirectory,
                outputAbsolutePath: this.outputPath,
                selectedNames,
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
