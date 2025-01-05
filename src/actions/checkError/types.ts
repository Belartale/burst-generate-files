import { z as zod } from 'zod';

export type CheckError<Settings = unknown, OptionalOfSettings = unknown> = {
    settings: Settings;
    optionalOfSettings?: OptionalOfSettings;
    rootPath: string;
};

export type BeginOfLine = string;

export type GetRefineParams = (
    rootPath: CheckError['rootPath'],
    params?: zod.CustomErrorParams,
) => (path: string | string[]) => { message: string } & zod.CustomErrorParams;
