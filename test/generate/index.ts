// Core
import chalk from 'chalk';

// Constants
import { MODE } from '../../scripts/webpack/constants';

// Core
const PACKAGE = import(process.env.TEST_MODE === MODE.PRODUCTION ? '../../dist' : '../../src');

const folderForTesting = 'test'; // if folder changed, change it in package.json too (npm scripts) and in tsconfig.generate.json
const pathToTemplate = `./${folderForTesting}/generate/templates`;

PACKAGE.then(({ CLIGen }) => {
    console.log(chalk.yellow(`Test started with mode: ${process.env.TEST_MODE || MODE.DEVELOPMENT}\n`));

    CLIGen([
        {
            name:      'Component: ./src/view/components/__componentName__',
            templates: [
                {
                    stringsReplacers: '__componentName__',
                    pathToTemplate:   `${pathToTemplate}/component`,
                    outputPath:       `./${folderForTesting}/src/components/__componentName__(pascalCase)`,
                    markers:          [
                        {
                            pattern:        '// MarkerGen re-export',
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker:   `./${folderForTesting}/src/components/index.ts`,
                        },
                    ],
                },
            ],
        },
        {
            name:      'selectDirectory Component: ./src/view/components/__componentName__',
            templates: [
                {
                    stringsReplacers: '__componentName__',
                    pathToTemplate:   `${pathToTemplate}/component`,
                    outputPath:       `./${folderForTesting}/src/components/__componentName__(pascalCase)`,
                    selectDirectory:  true,
                    markers:          [
                        {
                            pattern:        '// MarkerGen re-export',
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker:   `./${folderForTesting}/src/components/index.ts`,
                        },
                        {
                            pattern:        '// MarkerGen re-export',
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker:   `./${folderForTesting}/src/components/index.ts`,
                        },
                    ],
                },
            ],
        },
    ], {
        showFullError: true,
    });
});

