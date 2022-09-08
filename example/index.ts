// import { generateTemplateFiles } from '../src';
import { generateTemplateFiles } from '../dist';

// generateTemplateFiles();

generateTemplateFiles([
    {
        name:            'Component: /view/components/__componentName__',
        stringReplacers: '__componentName__',
        pathTemplate:    './example/templates/component',
        outputPath:      './example/components/__componentName__(pascalCase)',
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
