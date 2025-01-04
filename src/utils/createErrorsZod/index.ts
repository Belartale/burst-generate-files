// Core
import { z as zod } from 'zod';

// Types
import { CreateErrorsZod } from './types';

// Constants
import { CUSTOM_ERROR } from '../../constants';

const betweenTwoLines = `:\n`;

export const createErrorsZod = ({ validationResult, whichParameter, errors }: CreateErrorsZod) => {
    if (!validationResult.success) {
        const result = [...errors];
        validationResult.error.errors.forEach((objError) => {
            const objErrorPath = `>>> at the ${whichParameter} parameter of the function: ${objError.path.join('.')} <<<`;

            const causeOfCustomError: zod.ZodIssue = objError;

            const newError = new Error(`${objError.code}: ${objError.message + betweenTwoLines + objErrorPath}`, {
                cause: causeOfCustomError,
            });
            newError.name = CUSTOM_ERROR;

            result.push(newError);
        });

        return result;
    } else {
        return [];
    }
};
