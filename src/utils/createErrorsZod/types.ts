// Core
import { z as zod } from 'zod';

export type CreateErrorsZod = {
    validationResult: zod.SafeParseReturnType<unknown, unknown>;
    whichParameter: string;
    errors: Error[];
};
