import * as typesCommon from '../../../types';
import { CheckError } from '../types';

export interface CheckErrorCLIGen extends CheckError {
    settings: typesCommon.SettingCustomGen[];
    optionalOfSettings?: typesCommon.OptionalSettingsCustomGen;
}
