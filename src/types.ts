export type OptionsGenerateRow = {
    pathFromOutputPath: string
    marker: string
    whereInsertRow?: 'after marker' | 'before marker'
    generationRow: string
    onceInsertRow?: boolean
}

export type GenerateOptionsItem = {
    name:      string
    stringReplacers:    string
    pathTemplate:       string
    outputPath:         string
    addRowFiles?: OptionsGenerateRow[]
    onComplete?:        Function
}

export type GetSelectedName = string[]

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

export type ReplaceWordCase = {
    string: string
    stringReplacers: string
    selectedName: GetSelectedName
}

export type AddRowFiles = {
    selectedConfigItem: GenerateOptionsItem
    selectedName: GetSelectedName
}
export type DefineMarkerAndAddRow = {
    optionsGenerateRow: OptionsGenerateRow
    dataRedFile: string
    tabs: string
}
export type GenerateFiles = {
    id: {
        pathFromOutputPath: string
        marker: string
        generationRow: string
    },
    wasInsertRow: boolean
}
export type AddConfigToFile = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}
export type CheckIsOnceInsertRow = {
    optionsGenerateRow: OptionsGenerateRow
    fileNameConfig: string
}
