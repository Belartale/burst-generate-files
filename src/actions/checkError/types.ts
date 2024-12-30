import * as typesCommon from '../../types';

export type CheckError = {
    settings: typesCommon.SettingCustomGen[] | typesCommon.SettingCLIGen[];
    optionalSettings?: typesCommon.OptionalSettings;
    PROJECT_ROOT: string;
};

export type BeginOfLine = string;

export type CustomErrors = Error[];
