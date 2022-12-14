// Types
import * as typesCommon from '../../../types';
import { BeginOfLine, CheckError, CustomErrors } from '../types';

export type CheckFirstSettings = {
    whichFunction: CheckError['whichFunction']
    settings: typesCommon.SettingCustomGen[] | typesCommon.SettingCLIGen[]
    errors: CustomErrors
}

export type CheckSettings = {
    setting: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate | any
    beginOfLine: BeginOfLine
}
