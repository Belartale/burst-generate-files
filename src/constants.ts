// Core
import path from 'path';

export const nameFolderForMarkers = '.genignore';
export const nameConfigGenerateForOnceInsert = 'config.generate.files.json';
export const PROJECT_ROOT = path.resolve();

export const spaces = '    ';

enum PREFIXES {
    CASE = 'Case',
}

export enum DEFAULT_WORDS_CASES {
    CAMEL = 'camel' + PREFIXES.CASE,
    NO = 'no' + PREFIXES.CASE,
    PASCAL = 'pascal' + PREFIXES.CASE,
    CONSTANT = 'constant' + PREFIXES.CASE,
    KEBAB = 'kebab' + PREFIXES.CASE,
    DOT = 'dot' + PREFIXES.CASE,
    LOWER = 'lower' + PREFIXES.CASE,
    PATH = 'path' + PREFIXES.CASE,
    SENTENCE = 'sentence' + PREFIXES.CASE,
    SNAKE = 'snake' + PREFIXES.CASE,
    TITLE = 'title' + PREFIXES.CASE,
}

export const DEFAULT_WORDS_CASES_ARRAY = Object.values(DEFAULT_WORDS_CASES) as string[];
