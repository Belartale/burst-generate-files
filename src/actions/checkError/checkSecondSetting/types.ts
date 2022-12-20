// Types
import * as typesCommon from '../../../types';
import { CheckError, CustomErrors } from '../types';

export type CheckSecondSetting = {
    whichFunction: CheckError['whichFunction']
    errors: CustomErrors
    optionalSettings?: typesCommon.OptionalSettings
}
