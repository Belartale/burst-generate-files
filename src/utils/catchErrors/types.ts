import * as typesCommon from '../../types';

export type CatchErrorsTypes = {
    error: unknown | Error | Error[];
    showFullError: typesCommon.OptionalSettingsCLIGen['showFullError'];
};
