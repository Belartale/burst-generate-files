// Types
import { CheckError, CustomErrors } from './types';

// Functions
import { checkFirstSetting } from './checkFirstSetting';
import { checkSecondSetting } from './checkSecondSetting';

export const checkError = ({
    whichFunction,
    settings,
    optionalSettings,
    PROJECT_ROOT,
}: CheckError) => {
    let errors: CustomErrors = [];

    checkFirstSetting({
        whichFunction,
        settings,
        errors,
        PROJECT_ROOT,
    });
    checkSecondSetting({
        whichFunction,
        optionalSettings,
        errors,
    });


    // Errors
    if (errors.length > 0) {
        throw errors;
    }
};
