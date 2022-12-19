// Core
import fs from 'fs';
import enquirer from 'enquirer';

// Utils
import { catchErrors } from '../catchErrors';
// import { getNameFromCLI } from '../getSelectedName';

import * as types from './types';


export const removeEntity = async ({ options }: types.RemoveEntity) => {
    try {
        const getNamesForShowingInCLI = () => options.map((option) => option.name);

        // const getSelectedItemForRemoving: { optionChoice: string } = await enquirer.prompt(
        //     {
        //         type:    'autocomplete',
        //         name:    'optionChoice',
        //         message: 'What do you want to remove?',
        //         choices: getNamesForShowingInCLI(),
        //     },
        // );
        // console.log('removeEntity => getSelectedItemForRemoving', getSelectedItemForRemoving.optionChoice);


        // options.find((option) => option.name === getSelectedItemForRemoving.optionChoice);


        const gotValue: { entityForRemoving: string, nameForRemoving: string } = await enquirer.prompt([
            {
                type:    'autocomplete',
                name:    'entityForRemoving',
                message: 'Select the directory containing the entity you want to remove',
                choices: getNamesForShowingInCLI(),
            },
            {
                type:    'input',
                name:    'nameForRemoving',
                message: 'Write name of the entity that you want to remove',
            },
        ]);


        const foundOption = options.find((option) => option.name === gotValue.entityForRemoving);
        console.log('removeEntity => foundOption', foundOption);

        if (foundOption) {
            foundOption.templates.forEach((option) => {
                option.outputPath;

                const removeEntityFun = (path: string) => {
                    fs.access(path, (error) => {
                        if (error) {
                            // todo
                        }
                        // todo
                    });
                };

                if (typeof option.pathToTemplate === 'string') {
                    console.log('str');
                    removeEntityFun(option.pathToTemplate);
                }

                if (Array.isArray(option.pathToTemplate)) {
                    option.pathToTemplate.forEach((path) => {
                        console.log('Array');
                        removeEntityFun(path);
                    });
                }
            });
        }
    } catch (error) {
        catchErrors(error);
    }
};
