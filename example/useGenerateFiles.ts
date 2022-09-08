// Core
import { path as PROJECT_ROOT } from 'app-root-path';
import chalk from 'chalk';
// import { generateTemplateFiles } from '../src';
import { generateTemplateFiles } from '../dist';


generateTemplateFiles(
    PROJECT_ROOT,
    [
        {
            name:            'Bus: /bus/__entityName__',
            stringReplacers: '__entityName__',
            pathTemplate:    './example/templates/busEntity',
            outputPath:      './example/src/bus/__entityName__',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../../init/redux/index.ts',
                    marker:             '// Reducers MarkerGen',
                    whereInsertRow:     'after marker',
                    generationRow:      'import __entityName__ from \'../../bus/__entityName__/slice\';',
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
        {
            name:            'Saga: /bus/__entityName__/saga',
            stringReplacers: '__entityName__',
            pathTemplate:    './example/templates/saga',
            outputPath:      './example/src/bus/__entityName__/saga',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// Middleware MarkerGen',
                    whereInsertRow:     'after marker',
                    generationRow:      'import { use__entityName__(pascalCase)Saga } from \'./saga\'; /* Choose one technology, Saga or Thunk */',
                },
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// MarkerGen api hook',
                    whereInsertRow:     'after marker',
                    generationRow:      'const { fetch__entityName__(pascalCase) } = use__entityName__(pascalCase)Saga();  /* Saga api hook */',
                },
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// MarkerGen use api hook',
                    whereInsertRow:     'after marker',
                    generationRow:      '//     fetch__entityName__(pascalCase)();',
                },
                {
                    pathFromOutputPath: '../../../init/redux/rootSaga.ts',
                    marker:             '// Tools MarkerGen imports',
                    whereInsertRow:     'after marker',
                    generationRow:      'import { watch__entityName__(pascalCase) } from \'../../bus/__entityName__/saga\';',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/rootSaga.ts',
                    marker:             '// MarkerGen rootSaga',
                    whereInsertRow:     'after marker',
                    generationRow:      'watch__entityName__(pascalCase)(),',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen import Saga or Thunk',
                    whereInsertRow:     'after marker',
                    generationRow:      'import createSagaMiddleware from \'redux-saga\';',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen sagaMiddleware',
                    whereInsertRow:     'after marker',
                    generationRow:      'const sagaMiddleware = createSagaMiddleware();',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen insert middleware Saga or Thunk',
                    whereInsertRow:     'after marker',
                    generationRow:      'sagaMiddleware,',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen export sagaMiddleware',
                    whereInsertRow:     'after marker',
                    generationRow:      'sagaMiddleware,',
                    onceInsertRow:      true,
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created saga !!!'));
            },
        },
        {
            name:            'Thunk: /bus/__entityName__/thunk',
            stringReplacers: '__entityName__',
            pathTemplate:    './example/templates/thunk',
            outputPath:      './example/src/bus/__entityName__/thunk',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// Middleware MarkerGen',
                    whereInsertRow:     'after marker',
                    generationRow:      'import { use__entityName__(pascalCase)Thunk } from \'./thunk\'; /* Choose one technology, Saga or Thunk */',
                },
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// MarkerGen api hook',
                    whereInsertRow:     'after marker',
                    generationRow:      'const { fetch__entityName__(pascalCase) } = use__entityName__(pascalCase)Thunk();  /* Thunk api hook */',
                },
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// MarkerGen use api hook',
                    whereInsertRow:     'after marker',
                    generationRow:      '//     fetch__entityName__(pascalCase)();',
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen import Saga or Thunk',
                    whereInsertRow:     'after marker',
                    generationRow:      'import thunkMiddleware from \'redux-thunk\';',
                    onceInsertRow:      true,
                },
                {
                    pathFromOutputPath: '../../../init/redux/middleware.ts',
                    marker:             '// MarkerGen insert middleware Saga or Thunk',
                    whereInsertRow:     'after marker',
                    generationRow:      'thunkMiddleware,',
                    onceInsertRow:      true,
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created thunk !!!'));
            },
        },
        {
            name:            'Component: /view/components/__componentName__',
            stringReplacers: '__componentName__',
            pathTemplate:    './example/templates/component',
            outputPath:      './example/src/view/components/__componentName__(pascalCase)',
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
        {
            name:            'Element: /view/elements/__elementName__',
            stringReplacers: '__elementName__',
            pathTemplate:    './example/templates/element/',
            outputPath:      './example/src/view/elements/',
            addRowFiles:     [
                {
                    pathFromOutputPath: './index.ts',
                    marker:             '// MarkerGen Re-export',
                    whereInsertRow:     'after marker',
                    generationRow:      'export * from \'./__elementName__(pascalCase)\';',
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created element !!!'));
            },
        },
        {
            name:            'Container: /view/containers/__containerName__',
            stringReplacers: '__containerName__',
            pathTemplate:    './example/templates/container',
            outputPath:      './example/src/view/containers/__containerName__(pascalCase)',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// MarkerGen Re-export',
                    whereInsertRow:     'after marker',
                    generationRow:      'export * from \'./__containerName__(pascalCase)\';',
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created container !!!'));
            },
        },
        {
            name:            'Page: /view/pages/__pageName__',
            stringReplacers: '__pageName__',
            pathTemplate:    './example/templates/page',
            outputPath:      './example/src/view/pages/__pageName__(pascalCase)',
            addRowFiles:     [
                {
                    pathFromOutputPath: '../index.ts',
                    marker:             '// Pages MarkerGen',
                    whereInsertRow:     'after marker',
                    generationRow:      'export const __pageName__(pascalCase) = lazy(() => import(/* webpackChunkName: "__pageName__(pascalCase)" */ \'./__pageName__(pascalCase)\'));',
                },
                {
                    pathFromOutputPath: '../../routes/book.ts',
                    marker:             '// MarkerGen book',
                    whereInsertRow:     'after marker',
                    generationRow:      'export const __pageName__(constantCase) = \'/__pageName__(kebabCase)\';',
                },
                {
                    pathFromOutputPath: '../../routes/Public.tsx',
                    marker:             '{/* MarkerGen */}',
                    whereInsertRow:     'after marker',
                    generationRow:      '<Route element = { <Pages.__pageName__(pascalCase) /> } path = { book.__pageName__(constantCase) } />',
                },
            ],
            onComplete: () => {
                console.log(chalk.green('Created page !!!'));
            },
        },
    ],
);

