
Cases
lorem lorem =>
__name__(noCase) === lorem Lorem lorem
__name__(pascalCase) === LoremLorem
__name__(constantCase) === LOREM_LOREM
__name__(kebabCase) === lorem-lorem
__name__ === loremLorem

Example
generateTemplateFiles([
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
]);


### Welcome to genfiles App.

Arziburst genfiles App works on Windows, Linux, macOS.<br>
If something doesn’t work, please [file an issue](https://github.com/Belartale/burst-generate-files/issues/new).<br>
If you have some enhancements, please [file an pull request](https://github.com/Belartale/burst-generate-files/compare).<br>

## Quick Overview

```
INITIALIZING COMMANDS
```

Also you can create `.env.development` and `.env.production` by example from `.env.example`.

### `npm start`
To run project in dev mode

### `npm run build`
To create bundle

## Additions
📍 Auto formatting code with ESLint

You may need to correct `settings.json` in VS Code
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
},
"eslint.format.enable": true,
```

📍 Extention for VS Code `Better Comments (id: aaron-bond.better-comments)`

Best comments names:

![image](https://user-images.githubusercontent.com/53538417/139050274-e7f87f9e-7d8c-4b9c-8ac2-8f65837850c2.png)
