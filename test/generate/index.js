// Core
import { CLIGen } from '../../src';

const folderForTesting = 'test'; // if folder changed, change it in package.json too (npm scripts) and in tsconfig.generate.json
const pathToTemplate = `./${folderForTesting}/generate/templates`;

CLIGen(
    [
        {
            name: 'Component: ./src/view/components/__componentName__',
            templates: [
                {
                    stringsReplacers: ['__componentName__', '__componentName2__'],
                    pathToTemplate: [`${pathToTemplate}/component`, `${pathToTemplate}/component`],
                    outputPath: [
                        `./${folderForTesting}/src/components/__componentName__/folder1/__componentName__(pascalCase)`,
                        `./${folderForTesting}/src/components/__componentName2__/folder2/__componentName2__(pascalCase)`,
                    ],
                    selectDirectory: true,
                    markers: [
                        {
                            pattern: '// MarkerGen re-export',
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker: `./${folderForTesting}/src/components/index.ts`,
                        },
                    ],
                },
            ],
        },
        {
            name: 'Generate new React component',
            templates: [
                {
                    stringsReplacers: ['__exampleComponentName__', '__exampleExtension__', '__exampleStyleExtension__'],
                    pathToTemplate: `${pathToTemplate}/componentTemplate`,
                    // outputPath: "./components/__exampleComponentName__(pascalCase)",
                    markers: [
                        // <= New key here
                        {
                            pattern: '// MarkerGen re-export',
                            pathToMarker: `./${folderForTesting}/src/components/index.ts`,
                            markerTemplate: `${pathToTemplate}/componentTemplate/.genignore/import.ts`,
                        },
                    ],
                },
            ],
        },
    ],
    // {
    // 	rootPath:      `./`,
    // 	showFullError: true,
    // },
);
