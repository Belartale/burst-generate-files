import { generateTemplateFiles } from '../src';


generateTemplateFiles([
    {
        name:            'Component: /view/components/__componentName__',
        stringReplacers: '__componentName__',
        pathTemplate:    './scripts/generate/templates/component',
        outputPath:      './src/view/components/__componentName__(pascalCase)',
        addRowFiles:     [
            {
                pathFromOutputPath: '../index.ts',
                marker:             '// MarkerGen Re-export',
                whereInsertRow:     'after marker',
                generationRow:      'export * from \'./__componentName__(pascalCase)\';',
            },
        ],
        onComplete: () => {
            console.log('Created component !!!');
        },
    },
]);
