// File index
// Function mainActions
export type MainActions = {
    selectedConfigItem: Option
    selectedNames: GetSelectedName[]
}

// Function generateTemplateFiles
export type GenerateTemplateFile = {
    PROJECT_ROOT: string,
    option: OptionGTF,
}

export interface OptionGTF extends Omit<Option, 'stringsReplacers'> {
    stringsReplacers: Array<{
        string: string
        newString: string
    }>
}

// File replaceWordCase
export type ReplaceWordCase = {
    string: string
    arrayStringAndNewString: Array<{
        string: string
        newString: string[]
    }>
}

// File getSelectedItem
export type GetSelectedItem = {
    options: Option[]
    PROJECT_ROOT: string
}
export interface OptionO extends Omit<Option, 'stringsReplacers'> {
    stringsReplacers: string | string[]
}
export type Option = {
    name:      string
    stringsReplacers:    string[]
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: OptionsGenerateRow[]
    onComplete?:        Function
}

// File getSelectedName
export type GetSelectedName = {
    string: string,
    newString: string[]
}

// File createFiles
export type CreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedNames: GetSelectedName[]
}

// File addRowFiles
export type AddRowFiles = {
    selectedConfigItem: Option
    selectedNames: GetSelectedName[]
}
export type OptionsGenerateRow = {
    pathFromOutputPath: string
    marker: string
    regExp?: {
        value: string
        flags: string
    }
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
    onceInsertRow?: boolean
}
export type CheckIsOnceInsertRow = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}
export type GenerateFiles = {
    id: {
        pathFromOutputPath: string
        marker: string
        generationRow: string
    },
    wasInsertRow: boolean
}

// Function defineMarkerAndAddRow
export type DefineMarkerAndAddRow = {
    optionsGenerateRow: OptionsGenerateRow
    dataRedFile: string
    tabs: string
}

// Function addConfigToFile
export type AddConfigToFile = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}


// File onComplete
export type OnComplete = {
    selectedConfigItem: Option
    selectedNames: GetSelectedName[]
}
