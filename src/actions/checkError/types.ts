import { z as zod } from 'zod';
import * as typesCommon from '../../types';

export type CheckError = {
    settings: typesCommon.SettingCustomGen[] | typesCommon.SettingCLIGen[];
    optionalOfSettings?: typesCommon.OptionalSettingsCLIGen;
    rootPath: string;
};

export type BeginOfLine = string;

export type GetRefineParams = (
    rootPath: CheckError['rootPath'],
    params?: zod.CustomErrorParams,
) => (path: string | string[]) => { message: string } & zod.CustomErrorParams;
