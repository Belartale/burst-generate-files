export const slash = '\\';
export const firstPartOfMessage = 'Select a directory!\n    Current directory: ';
export const firstPartOfMessageForSelectingWordCase = 'Select a word case!\n    Current directory: ';

export enum CONTROLLERS {
    BACK = '../',
    HERE = './',
    OPTION_CANCEL = '# Back to select directory',
}

export enum CONTROLLERS_CREATE_NEW_FOLDER {
    MAIN = '# Create new folder',
    OPTION_CANCEL = '# Back to option "Crete new folder"',
}

export enum CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS {
    MAIN = '# Create new folder by stringsReplacers',
    OPTION_CANCEL = '# Back to option "Create new folder by stringsReplacers"',
}

export const controllersDirectories = [
    CONTROLLERS.BACK,
    CONTROLLERS.HERE,
    CONTROLLERS_CREATE_NEW_FOLDER.MAIN,
];

export const getOptionsOfCreateNewFolder
= (stringsReplacers: string[]) => [
    CONTROLLERS_CREATE_NEW_FOLDER.OPTION_CANCEL,
    ...stringsReplacers,
];
