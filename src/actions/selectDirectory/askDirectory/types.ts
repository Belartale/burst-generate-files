import * as typesCommon from '../../types';

export type AskDirectory = {
    outputPath: string
    selectedNames: typesCommon.GetSelectedName []
}

export type Values = {
    isPrompt: boolean
    currentDirectory: string
}

export type GetChangedPath = {
    result: string
    values: Values
}

export type GetDirectories = {
    currentDirectory: string
    selectedNames: AskDirectory['selectedNames']
    outputAbsolutePath: AskDirectory['outputPath']
}
