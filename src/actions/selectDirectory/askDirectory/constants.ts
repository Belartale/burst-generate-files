export const slash = '\\';
// export const partOfMessageForCreatingCLI = ' // <= Create last folder by outputPath';

export enum CONTROLLERS {
    BACK = '../',
    HERE = './',
    CREATE_NEW_FOLDER = '# Create new folder',
}

export enum CONTROLLERS_CREATE_NEW_FOLDER {
    OPTION_CANCEL = '# Back to select directory',
    CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS = '# Create new folder by stringsReplacers',
}

export enum CONTROLLERS_CREATE_NEW_FOLDER_BY_STRINGS_REPLACERS {
    OPTION_CANCEL = '# Back to option crete new folder',
}

export const controllersDirectories = [
    CONTROLLERS.BACK,
    CONTROLLERS.HERE,
    CONTROLLERS.CREATE_NEW_FOLDER,
];

export const getSelectionsOfCreateFolder
= (stringsReplacers: string[]) => [
    CONTROLLERS_CREATE_NEW_FOLDER.OPTION_CANCEL,
    ...stringsReplacers,
];
