// Core
import * as yup from 'yup';

// Types
import * as types from '../types';

export const checkError = (PROJECT_ROOT: string, options: types.GenerateOptionsItem[]) => {
    const schemaRoot = yup.string()
        .test({
            name:    'firstArgument',
            message: 'First argument must be string',
            test:    (value) => typeof value === 'string',
        });

    schemaRoot.validateSync(PROJECT_ROOT, { abortEarly: false });

    options.forEach((option) => {
        const schemaOption = yup.object({
            name:             yup.string().required(),
            stringsReplacers: yup.array().required(),
            pathTemplate:     yup.string().required(),
            outputPath:       yup.string().required(),
            addRowFiles:      yup.array(),
            onComplete:       yup.object(),
        });
        schemaOption.validateSync(option, { abortEarly: false });

        if (option.addRowFiles) {
            option.addRowFiles.forEach((addRowFilesObject) => {
                const schemaDddRowFiles = yup.object({
                    pathFromOutputPath: yup.string().required(),
                    marker:             yup.string().required(),
                    regExp:             yup.object({
                        value: yup.string(),
                        flags: yup.string(),
                    }),
                    whereInsertRow: yup.string(),
                    generationRow:  yup.string().required(),
                    onceInsertRow:  yup.boolean(),
                });
                schemaDddRowFiles.validateSync(addRowFilesObject, { abortEarly: false });
            });
        }
    });
};
