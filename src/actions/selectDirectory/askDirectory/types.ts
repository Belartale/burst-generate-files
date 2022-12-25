export type AskDirectory = {
    outputPathReplacedWordCase: string
    PROJECT_ROOT: string
}

export type Values = {
    isPrompt: boolean
    currentDirectory: string
}

export type GetChangedPath = {
    result: string
    values: Values
}

export type Action = {
    result: GetChangedPath['result']
    values: GetChangedPath['values']
    symbol: string
}

export type GetDirectories = {
    source: string
}
