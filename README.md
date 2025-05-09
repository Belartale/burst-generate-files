# Welcome to burst-generate-files.

<image align="right" width="160px" alt="HTML5" src="https://lh3.googleusercontent.com/pw/AL9nZEXF_kAh3tezMRxnT4GGR3YHoKo5CpSkWtRBD9_HsJ7K_KNqcpjELcsJ1OKdji9fJNIa9GKHXjeuLLshj5t-Y0QJuMn3IVxRCT1iXtm0AeSjD8s2cR1VJOpqRHEXLLZVZRgmJcw59HXUwCb2_dw1L17A=s432-no?authuser=0"/>

This is a library for generating files and folders based on templates that the user creates.

## How to install

### Using npm:

```bash
npm i burst-generate-files
```

## Fast instructions for use

Below are the steps we will take to build our first generation together.

### Create your first template

Template is a folder with any structure. In our case, we create a simple example of `React` component.

Create the folder `componentTemplate`, then create file with name `index.tsx`, but also you can use another name `__exampleComponentName__(pascalCase).tsx`, in second variant we have dynamic file name with different replace modes. More information about variables in file names and replace modes you can find deeper in these docs.

```typescript
// ./componentTemplate/index.tsx

import React from "react";

export const __exampleComponentName__(pascalCase) = () => {
    return (
        <div>
            This is component: __exampleComponentName__
        </div>
     );
};
```

### Create config file

Let's create `generate.config.ts` in the root of your project.

First of all you need to add import of `burst-generate-files`, and get `CLIGen` function.

That function require one parameter, array of settings.

```typescript
// ./generate.config.ts

import { CLIGen } from "burst-generate-files";

CLIGen([
    {
        name:      "Generate new React component",
        templates: [
            {
                stringsReplacers: "__exampleComponentName__",
                pathToTemplate:   "./componentTemplate",
                outputPath:       "./components/__exampleComponentName__(pascalCase)",
            },
        ],
    },
]);
```

#### If you happy with TypeScript

To start generating files, you need to run `generate.config.ts`, the best way to do this install [ts-node](https://www.npmjs.com/package/ts-node) package globally.

In terminal, you need just type next command and magic begin...

```bash
ts-node "./generate.config.ts"
```

**Note:** also you can add new script in your `package.json`, for example

```json
"scripts": {
    "gen": "ts-node ./generate.config.ts"
},
```

#### If you must use JavaScript

For JavaScript all easier, in your terminal run next command:

```bash
node "./generate.config.js"
```

### Command Line Interface

After running `generate.config.js`, advanced CLI started in your terminal. Next you have to choose that you want to generate, for example it will be `Component`. Press `Enter` to submit your choice, and continue.

![image](https://user-images.githubusercontent.com/33392042/189500538-5bc4e95e-9b05-4b49-bde2-fde162e3a1e5.png)

On next step we need to type the name of entity what we are generating. All strings inside templates what you use, and looks like this: `__entityName__`, will replace with your name of entity.

For example, the name of the entity will be `wrapper`. Let's press `Enter` button to complete generation.

![image](https://user-images.githubusercontent.com/33392042/189500561-3bf47a86-6902-479f-9cab-49446033106f.png)

Finely, example React component file structure will be successfully created.

![image](https://user-images.githubusercontent.com/33392042/189501072-308de453-8519-4667-824e-74a79f922db1.png)

Congratulations, we make our first generation together!

## Advanced use

Next, we will get acquainted with the main features of the library.

### Variables in file or folder names

The library supports the syntax of variables in the names of files or folders that are contained in templates.

For example, we can rename `index.tsx` file in previous example to `__exampleComponentName__(pascalCase).__exampleExtension__`.
In that case, name and extension of file will be replaced, by variables what are configured in config file.
Let's add new variable to `generate.config.ts` file:

```typescript
    // ./generate.config.ts
    {
        // ...
        stringsReplacers: [  // <= Open new array
            "__exampleComponentName__",
            "__exampleExtension__", // <= New variable here
        ],
        // ...
    }
```

Run `generate.config.ts` with new changes.
In CLI add value `wrapper` to `__exampleComponentName__`, and add value `tsx` to `__exampleExtension__`, and get result with custom file name, and custom extension.

![image](https://user-images.githubusercontent.com/33392042/189850848-aceeefbf-e864-4fc3-8e61-c2107d5a5181.png)

![image](https://user-images.githubusercontent.com/25966000/189736262-c0b179b1-739b-4332-84c0-1d667a6a41a4.png)

### Extend template

Size of file structure no matter for burst generation. You can create any template, with any files and folder inside.
For example, let's add new file in `componentTemplate`, and it will be `styles.__exampleStyleExtension__`.

```typescript
    // ./generate.config.ts
    {
        // ...
        stringsReplacers: [
            "__exampleComponentName__",
            "__exampleExtension__",
            "__exampleStyleExtension__" // <= New variable again here
        ],
        // ...
    }
```

As result, we get new generated file structure based on extended template.

![image](https://user-images.githubusercontent.com/25966000/189738692-03c3c6f3-3185-4302-b133-25cabd01ba11.png)

### Extend config with new template

The library can support unlimited templates at the same time.
For extend your config with new template, you need to create new `template` folder with some stuff inside, and add new `settings` object to `generate.config.ts`.

```typescript
// ./generate.config.ts

CLIGen([
    {
        name:      "Generate new React component",
        templates: [
            {
                stringsReplacers: [
                    "__exampleComponentName__",
                    "__exampleExtension__",
                    "__exampleStyleExtension__",
                ],
                pathToTemplate:   "./componentTemplate",
                outputPath:       "./components/__exampleComponentName__(pascalCase)",
            },
        ],
    },
    {
        // <= Page generation config
        name:      "New page",
        templates: [
            {
                stringsReplacers: "__pageName__",
                pathToTemplate:   "./pageTemplate",
                outputPath:       "./page/__pageName__(pascalCase)",
            },
        ],
    },
]);
```

![image](https://user-images.githubusercontent.com/33392042/189851222-ed4c7a8b-156e-4a5c-bc79-965b48462a33.png)

### Markers

The main feature of this library is `markers` that you can put in existing files and add new lines. For example, a new line can be any entity, for example we use a usual import which should look like this `import { Wrapper2 } from "./Wrapper2";` after using generate.

Foremost, we have to create the template for the marker. In the folder `componentTemplate` we have to create the folder `.genignore`, this folder is ignored during generation, we can store our marker in it. Let's name this file `imports.ts`.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/e89f50e7-43b5-4bb8-bba4-6611929b78b1)

Then we write the usual import, but we will use `__exampleComponentName__` variable.

```typescript
// ./componentTemplate/.genignore/import.ts

import { __exampleComponentName__(pascalCase) } from "./__exampleComponentName__(pascalCase)";
```

Next, create the file `index.ts` in the folder `components`. Then write the marker `// Imports`. You can write any name for marker and use multitude markers for generation.

![image](https://user-images.githubusercontent.com/33392042/194883602-50b124ba-394c-4dc0-bee7-c17e450f98fb.png)

In `generate.config.ts` we have to add the new key `markers` for our config generate.

```typescript
// ./generate.config.ts

CLIGen([
    {
        name:      "Generate new React component",
        templates: [
            {
                stringsReplacers: [
                    "__exampleComponentName__",
                    "__exampleExtension__",
                    "__exampleStyleExtension__",
                ],
                pathToTemplate: "./componentTemplate",
                outputPath:     "./components/__exampleComponentName__(pascalCase)",
                markers: [
                    // <= New key here
                    {
                        pattern:        "// Imports",
                        pathToMarker:   "./components/index.ts",
                        markerTemplate: "./componentTemplate/.genignore/import.ts",
                    },
                ],
            },
        ],
    },
]);
```

And funnily, run the command `ts-node "./generate.config.ts"`. After generation, we get new line like import.

![image](https://user-images.githubusercontent.com/33392042/195048272-d848b67f-8d17-47e4-a75b-7c940858b6ab.png)

### Select a directory for generation

Also we can select a directory where we want to generate files. To activate this feature we have to remove `outputPath`. Then we have to run generate and fill inputs. After we can select a directory.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/0f1c6449-4c19-439f-83b9-11fdcb902d03)

**Note:** if `outputPath` is removed, the current directory starts from the root project.

First the `../` option to climb to the top directory. Second the `./` option to generate files in current directory. Third the `# Create new folder` option to create new folder. And other options are folders in current directory.

For example, we can select the option `/components`. After, we entered the `components` folder.

Then, we can generate files in the `components` folder, but we have to create new folder, we have to select the `# Create new folder` option.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/9875d2d1-41c3-46f3-8d1c-89f359221f96)

Then, we have to select the `# Create new folder by stringsReplacers` option. We can create new folder by `stringsReplacers`.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/93903e6f-f53a-48f6-b766-be9632e655b2)

We have to select the `/__exampleComponentName__` option.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/2ff24c20-23c4-4d45-8508-ff923eac0c0f)

Then, we can select type of string replacements. We have to select the `pascalCase` option.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/f610aa3a-016e-4a47-9379-160aaf92ea8b)

Then we have to select the `./` option to generate the files. But we can continue to select a directory.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/41560fb4-f96a-483c-a409-c04be8e8afe6)

Finally, we generated the files.

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/10432152-8617-4d19-99e9-46a1f0004205)

### Select a directory with the `outputPath` for generation

We can use the `selectDirectory` with the `outputPath`. For example, we can write:

```typescript
// ./generate.config.ts

CLIGen([
    {
        name:      "Generate new React component",
        templates: [
            {
                stringsReplacers: [
                    "__exampleComponentName__",
                    "__exampleExtension__",
                    "__exampleStyleExtension__",
                ],
                pathToTemplate:  "./componentTemplate",
                outputPath:      "./components/__exampleComponentName__(pascalCase)",
                selectDirectory: true, // <= New key here
                markers: [
                    {
                        pattern:        "// Imports",
                        pathToMarker:   "./components/index.ts",
                        markerTemplate: "./componentTemplate/.genignore/import.ts",
                    },
                ],
            },
        ],
    },
]);
```

After ran generation, the path starts by the `outputPath`

![image](https://github.com/Belartale/burst-generate-files/assets/33392042/b8966a14-521d-4b2f-b09a-2a07f4b455a5)


## Ultra plus use

If you want to look difficult cases with burst-generate-files. You can install [`Burst`](https://www.npmjs.com/package/cra-template-burst) template. After install, you have to use script `npm run gen` in your terminal.

## Settings

### `name`

This is the name that will be displayed in the interface. For only the function `CLIGen`.

![Image interface](https://user-images.githubusercontent.com/33392042/189359666-be15cce3-133a-444d-a57d-33fb16033f78.png)

### `templates`

This is array for settings to generate files. For only the function `CLIGen`.

### `stringsReplacers`

This is the string or array with strings which will replace. But if you use the function `customGen`, then `stringsReplacers` is object or array, example:

```typescript
// If you use the customGen

stringsReplacers: [
    {
        replaceVar: "__exampleComponentName__",
        value:      "Wrapper",
    },
    {
        replaceVar: "__exampleComponentName2__",
        value:      "Wrapper2",
    },
],
```

#### Types of string replacements

```sh
__componentName__(noCase) === lorem Lorem lorem
__componentName__(camelCase) === loremLorem
__componentName__(pascalCase) === LoremLorem
__componentName__(constantCase) === LOREM_LOREM
__componentName__(kebabCase) === lorem-lorem
__componentName__(dotCase) === lorem.lorem
__componentName__(lowerCase) === loremlorem
__componentName__(pathCase) === lorem/lorem
__componentName__(sentenceCase) === Lorem lorem
__componentName__(snakeCase) === lorem_lorem
__componentName__(titleCase) === Lorem Lorem
__componentName__ === loremLorem
```

### `pathToTemplate`

This is the path or array with your paths for your template that will create.

### `outputPath` _optional_

This is the path or array with your paths for output files.

### `selectDirectory` _optional_

This is the boolean. Dynamic change your path.

**Note:** default value `false`.

### `markers` _optional_

This is the array to create lines into files.

-   #### `pattern`

    This is the marker for insert line. If you want, you can use any regular expressions like this `pattern: /^.*(//.Marker)$/`.

-   #### `pathToMarker`

    This is the path or array with your paths to the file to insert your lines.

-   #### `markerTemplate`

    This is path or paths to data of file to be inserted where is the `pattern`.

**Note:** for keeping and ignoring markers template, you have to create the folder `.genignore`.

![image](https://user-images.githubusercontent.com/33392042/194910745-00151f31-f52b-43d9-bad3-f354677572aa.png)

-   #### `genDirection` _optional_

    This is the option tells the program where to insert the line. Insert line `after` or `before` your `pattern`.

**Note:** if not exists, then default value `after`.

-   #### `onceInsert` _optional_

    This is the boolean. If it is true, the row will only be inserted once, when you insert again you will catch the warning.

**Note:** if you want to paste again, you need edit file `config.generate.files.json`

### `onComplete` _optional_

This is the function that will be executed after generation. If you want you can get the setting that was use. To get the object you need to use a callback.

```typescript
CLIGen(
    [
        {
            templates: [
                {
                    onComplete: ({ init, result }) => {
                        console.log('init:', init);
                        console.log('result:', result);
                    },
                },
            ],
        },
    ],
);
```

**Note:** the `onComplete` key in the `result` object is omitted due to [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) restrictions, which cannot serialize functions or non-cloneable objects.

## Optional settings

```typescript
CLIGen(
    [
        {
            name:      "Generate new React component",
            templates: [
                // ...
            ],
        },
    ],
    {
        // <= Optional settings here
    }
);
```

### `rootPath` _optional_

This is the string for changing root path of your project.

### `showFullError` _optional_

This is the string for showing full message of error.

## Additional tools

`markersGen` - is the function for creating markers.

```typescript
markersGen(
    {
        selectedNames: [
            {
                replaceVar: '__exampleComponentName__',
                value: 'wrapper',
            },
        ],
        markers: [
            {
                pattern: '// Imports',
                pathToMarker: './components/index.ts',
                markerTemplate: './componentTemplate/.genignore/import.ts',
            },
        ],
    },
    {
        rootPath: './',
    },
);
```

## License
[Apache 2.0 License](https://github.com/Belartale/burst-generate-files/blob/main/LICENSE)
