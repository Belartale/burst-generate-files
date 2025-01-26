// Core
import { customGen, CLIGen, markersGen } from '../../src';

const folderForTesting = 'test'; // if folder changed, change it in package.json too (npm scripts) and in tsconfig.generate.json
const pathToTemplate = `./${folderForTesting}/generate/templates`;

// customGen([
//     {
//         stringsReplacers: [{ replaceVar: '__componentName__', value: 'lorem1' }],
//         pathToTemplate: `${pathToTemplate}/component`,
//         outputPath: `./${folderForTesting}/src/components/__componentName__(pascalCase)`,
//         // selectDirectory: true,
//         markers: [
//             {
//                 pattern: '// MarkerGen re-export1',
//                 markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
//                 pathToMarker: `./${folderForTesting}/src/components/index.ts`,
//             },
//         ],
//         // onComplete: (result) => { console.log(`result >>> `, result) }
//     },
// ]);

CLIGen(
    [
        {
            name: 'Component: ./src/view/components/__componentName__',
            templates: [
                {
                    stringsReplacers: '__componentName__',
                    pathToTemplate: `${pathToTemplate}/component`,
                    outputPath: `./${folderForTesting}/src/components/__componentName__(pascalCase)`,
                    selectDirectory: true,
                    markers: [
                        {
                            pattern: '// MarkerGen re-export',
                            markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
                            pathToMarker: `./${folderForTesting}/src/components/index.ts`,
                        },
                    ],
                    // onComplete: ({ init, result }) => {
                    //     console.log('init:', init);
                    //     console.log('result:', result);
                    // },
                },
            ],
        },
        {
            name: 'Generate new React component',
            templates: [
                {
                    stringsReplacers: ['__exampleComponentName__', '__exampleExtension__', '__exampleStyleExtension__'],
                    pathToTemplate: `${pathToTemplate}/componentTemplate`,
                    outputPath: `./${folderForTesting}/src/components/__exampleComponentName__(pascalCase)`,
                    selectDirectory: true,
                    markers: [
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
    {
        rootPath: './',
        // showFullError: true,
    },
);

// markersGen(
//     {
//         selectedNames: [
//             {
//                 replaceVar: '__componentName__',

//                 value: 'Wrapper ds',
//             },
//         ],

//         markers: [
//             {
//                 pattern: '// MarkerGen re-export', // Marker location in the file

//                 markerTemplate: `${pathToTemplate}/component/.genignore/export.ts`,
//                 pathToMarker: `./${folderForTesting}/src/components/index.ts`,
//             },
//         ],
//     },

//     {
//         rootPath: './', // Optional root path configuration
//     },
// );
