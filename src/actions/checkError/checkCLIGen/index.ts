// Core
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../../utils';

// Schemas
import { commonSchemaOfOptionalSettings, getSchemaCLIGen } from '../schemas';

// Types
import { CreateErrorsZod } from '../../../utils/types';
import { OptionalSettingsCLIGen, SettingCLIGen } from '../../../types';
import { CheckError } from '../types';

export const checkCLIGen = ({ settings, optionalOfSettings, rootPath }: CheckError<SettingCLIGen[], OptionalSettingsCLIGen>) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schemaSettings: zod.ZodType<SettingCLIGen[]> = getSchemaCLIGen(rootPath);

    const schemaOptionalSettings: zod.ZodType<OptionalSettingsCLIGen | undefined> = zod
        .object({
            ...commonSchemaOfOptionalSettings,
            showFullError: zod.boolean().optional(),
        })
        .optional();

    const validationResultSettings = schemaSettings.safeParse(settings);
    const validationResultOptionalSettings = schemaOptionalSettings.safeParse(optionalOfSettings);

    errors.push(
        ...createErrorsZod({
            validationResult: validationResultSettings,
            whichParameter: 'first',
            errors,
        }),
        ...createErrorsZod({
            validationResult: validationResultOptionalSettings,
            whichParameter: 'second',
            errors,
        }),
    );

    // Errors
    if (errors.length > 0) {
        throw errors;
    }
};
