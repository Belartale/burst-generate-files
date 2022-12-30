// Types
import * as typesCommon from '../../../types';
import { BeginOfLine, CheckError, CustomErrors } from '../types';

export type CheckFirstSettings = {
    whichFunction: CheckError['whichFunction']
    settings: typesCommon.SettingCustomGen[] | typesCommon.SettingCLIGen[]
    errors: CustomErrors
    PROJECT_ROOT: string
}

export type CheckSettings = {
    setting: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate
    beginOfLine: BeginOfLine
}
