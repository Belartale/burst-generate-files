# Welcome to burst-generate-files.

This is a library for generating files and folders based on templates that the user creates.

## How to install

### Using npm:

```sh
npm i burst-generate-files -D
```

## How to use
For first example you can copy code below. You need create two files.
### Create template file

First file it's `template` file. In future you create many of them, but now just simple example of `React` component.

`componentTemplate.tsx`
```typescript
import React from "react";

const __exampleComponentName__(pascalCase) = () => {
    return (
        <div>
            This is component: __exampleComponentName__(pascalCase)
        </div>
     );
};
```
### Create config file

After you create `generate.cofig.ts` in root of your project. 

First of all you need add import of `burst-generate-files`, and get `generateTemplateFiles` function. 

That function need get two parametrs, root path of your aplication and array of options.

**Note:** for easy way, to get root path of your aplication, you can use [app-root-path](https://www.npmjs.com/package/app-root-path). Install that: `npm i app-root-path -D`.

`generate.cofig.ts`
```typescript
import { generateTemplateFiles } from "burst-generate-files";
import { path as ROOT_PATH_OF_YOUR_APLICATION } from 'app-root-path';

generateTemplateFiles(ROOT_PATH_OF_YOUR_APLICATION, [
    {
        name:            "Component: ./src/components/__exampleComponentName__",
        stringReplacers: "__exampleComponentName__",
        pathTemplate:    "./componentTemplate.tsx", // use js or ts extensions, whatever you like.
        outputPath:      "./src/components/__exampleComponentName__(pascalCase)",
        onComplete: () => {
            console.log("Example component created!");
        },
    },
]);
```
### The function's arguments
| Arguments         | Types | Descriptions                                  | Examples
| :---:             | :---: | :---:                                         | :---:
| First argument    | string | This is absolute path to your project        | C:\projects\YourProject
| Second argument   | array | Objects with parameters for generate files     | [ {...}, {...} ]

### Simple example second parameter
```javascript
[
    {
        name:            "Component: /view/components/__componentName__",
        stringReplacers: "__componentName__",
        pathTemplate:    "./generate/templates/component",
        outputPath:      "./src/components/__componentName__(pascalCase)",
        addRowFiles:     [
            {
                pathFromOutputPath: "../index.ts",
                marker:             "// Re-export",
                whereInsertRow:     "after marker",
                generationRow:      "export * from \"./__componentName__(pascalCase)\";",
            },
        ],
        onComplete: () => {
            console.log("Created component !!!");
        },
    },
]
```

### How to start
If you are using TypeScript. You have to create config file `tsconfig.generate.json`.
```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "typeRoots": [ "node_modules/@types" ],
    },
} 
```

Run in terminal `ts-node -P \"./tsconfig.generate.json\" \"./generate\"`

If you use just JavaScript, you can run next script: `node \"./generate\"`

## How it works
You can transform name for files and into files. You have to choose a name for the string which will replace.
Example you want to choose `__componentName__`. After used burst-generate-files, all names of files and strings will replace.
### Example with files
#### Before (your template files)
```sh
┣━ __componentName__.ts
┗━ __componentName__Styles.css
```
#### After (output files)
```sh
┣━ message.ts
┗━ messageStyles.css
```
### Example replace names
#### Before (your template file)
```javascript
const __componentName__(pascalCase) = () => {
    return (
        <dvi>
            Component: __componentName__(pascalCase)
        <div>
    );
};
```
#### After (It was generate)
```javascript
const Message = () => {
    return (
        <dvi>
            Component: Message
        <div>
    );
};
```

### Insert line for files
You can insert line for file. You have to set the marker.
#### Before
```javascript
// Re-export
```
#### After
```javascript
// Re-export
export * from "./Message";
```

## Settings
### `name`
This is the name that will be displayed in the interface.

![Image interface](https://user-images.githubusercontent.com/33392042/189359666-be15cce3-133a-444d-a57d-33fb16033f78.png)

### `stringReplacers`
This is the string which will replace.
#### Types of string replacements
```sh
__componentName__(noCase) === lorem Lorem loremam
__componentName__(pascalCase) === LoremLorem
__componentName__(constantCase) === LOREM_LOREM
__componentName__(kebabCase) === lorem-lorem
__componentName__ === loremLorem
```

### `pathTemplate`
This is the path for your template that will create.

### `outputPath`
This is the path for output files.

### `addRowFiles` *optional*
This is the array to create lines into files.
- #### `pathFromOutputPath`
This is the path to the file to insert the line.

- #### `marker`
This is the marker for insert line.

- #### `regExp` *optional*
    If you have a complex or specific marker, you can use `new RegExp(value, flags)`.
    - ##### `value`
    The value for RegExp.
    - ##### `flags`
    The flags for RegExp.

- #### `whereInsertRow` *optional*
This is the option tells the program where to insert the line. Insert line after marker or before marker.

**Note:** if not exists, then default value `after maker`.

- #### `generationRow`
This is the string which will be inserted into file.

- #### `onceInsertRow`
This is the boolean. If it is true, the row will only be inserted once, when you insert again you will catch the warning.
**Note:** if you want to paste again, you need edit file `config.generate.files.json`

### `onComplete` *optional*
this is the function that will be executed after generation
