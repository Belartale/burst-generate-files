import fs from 'fs';

// Constants
import { betweenTwoLines, endErrorLine } from '../constants';

// Types
import { CheckSecondSetting } from './types';

export const checkSecondSetting = ({
    whichFunction,
    optionalSettings,
    errors,
}: CheckSecondSetting) => {
    if (optionalSettings) {
        if (typeof optionalSettings !== 'object' || Array.isArray(optionalSettings)) {
            errors.push(new Error(`${whichFunction}/SecondSetting${betweenTwoLines}Type '${typeof optionalSettings === 'object' && Array.isArray(optionalSettings) ? 'object(Array)' : typeof optionalSettings}' is not assignable to type 'object'.${endErrorLine}`));
        }
        if (Object.hasOwn(optionalSettings, 'rootPath') && typeof optionalSettings.rootPath !== 'string') {
            errors.push(new Error(`${whichFunction}/SecondSetting(Object)/rootPath${betweenTwoLines}Type '${typeof optionalSettings.rootPath}' is not assignable to type 'string'.${endErrorLine}`));
        }

        if (typeof optionalSettings.rootPath === 'string' && !fs.existsSync(optionalSettings.rootPath)) {
            errors.push(new Error(`${whichFunction}/SecondSetting(Object)/rootPath${betweenTwoLines}No such directory, '${optionalSettings.rootPath}'.${endErrorLine}`));
        }
    }
};
