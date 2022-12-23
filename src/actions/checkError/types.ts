import * as typesCommon from '../../types';

export type CheckError = {
    whichFunction: 'customGen' | 'CLIGen'
    settings: typesCommon.SettingCustomGen[] | typesCommon.SettingCLIGen[]
    optionalSettings?: typesCommon.OptionalSettings
    PROJECT_ROOT: string
}

export type BeginOfLine = string

export type CustomErrors = Error[]
