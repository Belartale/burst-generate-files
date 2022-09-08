# Welcome to burst-generate-files.

Burst-generate-files App works on Windows, Linux, macOS.<br>

This is a library for generating files and folders based on templates that the user creates.

### Cases
```sh
(lorem lorem) =>
__name__(noCase) === lorem Lorem lorem
__name__(pascalCase) === LoremLorem
__name__(constantCase) === LOREM_LOREM
__name__(kebabCase) === lorem-lorem
__name__ === loremLorem
```
### Example
```sh
generateTemplateFiles(
    PROJECT_ROOT,
    [
        {
            name:            'Bus: /bus/__entityName__',
            stringReplacers: '__entityName__',
            pathTemplate:    './scripts/generate/templates/busEntity',
            outputPath:      './src/bus/__entityName__',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../../init/redux/index.ts',
                    marker:             '// Reducers MarkerGen',
                    whereInsertRow:     'after marker',
                    generationRow:      'import __entityName__ from \'../../bus/__entityName__/slice\';',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../init/redux/index.ts',
                    marker:             '// MarkerGen add reducer',
                    whereInsertRow:     'after marker',
                    generationRow:      '__entityName__,',
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created bus entity !!!'));
            },
        },
    ]
);
```