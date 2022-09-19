// Types
import * as types from '../types';

export type Cases = {
    stringReplace: types.GetSelectedName
    result: string
}

export type ReplaceWordCase = {
    string: string
    stringsForReplace: types.GetSelectedName | types.GetSelectedName[]
}
