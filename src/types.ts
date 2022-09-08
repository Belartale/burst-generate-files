// File index
export type OptionsGenerateRow = {
    pathFromOutputPath: string
    marker: string
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
    onceInsertRow?: boolean
}

// File replaceWordCase
export type ReplaceWordCase = {
    string: string
    stringReplacers: string
    selectedName: GetSelectedName
}

// File getSelectedItem
export type GetSelectedItem = {
    options: GenerateOptionsItem[]
    PROJECT_ROOT: string
}
export type GenerateOptionsItem = {
    name:      string
    stringReplacers:    string
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: OptionsGenerateRow[]
    onComplete?:        Function
}

// File getSelectedName
export type GetSelectedName = string[]

// File createFiles
export type CreateFiles = {
    fromFolderPath: string
    toPath: string
    selectedConfigItem: {
        pathTemplate: string,
        name: string,
        stringReplacers: string,
        outputPath: string
    }
    selectedName: GetSelectedName
};

// File addRowFiles
export type AddRowFiles = {
    selectedConfigItem: GenerateOptionsItem
    selectedName: GetSelectedName
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
