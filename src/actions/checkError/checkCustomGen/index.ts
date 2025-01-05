// Core
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../../utils';

// Schemas
import { commonSchemaOfOptionalSettings, getSchemaCustomGen } from '../schemas';

// Types
import { CreateErrorsZod } from '../../../utils/types';
import { OptionalSettingsCustomGen, SettingCustomGen } from '../../../types';
import { CheckErrorCLIGen } from './types';

export const checkCustomGen = ({ settings, optionalOfSettings, rootPath }: CheckErrorCLIGen) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schemaSettings: zod.ZodType<SettingCustomGen[]> = getSchemaCustomGen(rootPath);

    const schemaOptionalSettings: zod.ZodType<OptionalSettingsCustomGen | undefined> = zod
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
