// Core
import { z as zod } from 'zod';

// Utils
import { createErrorsZod } from '../../../utils';

// Schemas
import { commonSchemaOfOptionalSettings, getSchemaMarkersGen } from '../schemas';

// Types
import { CreateErrorsZod } from '../../../utils/types';
import { OptionalSettingsMarkersGen, SettingMarkersGen } from '../../../types';
import { CheckError } from '../types';

export const checkMarkersGen = ({ settings, optionalOfSettings, rootPath }: CheckError<SettingMarkersGen, OptionalSettingsMarkersGen>) => {
    const errors: CreateErrorsZod['errors'] = [];

    const schemaSettings: zod.ZodType<SettingMarkersGen> = getSchemaMarkersGen(rootPath);

    const schemaOptionalSettings: zod.ZodType<OptionalSettingsMarkersGen | undefined> = zod
        .object({
            ...commonSchemaOfOptionalSettings,
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
