// Types
import * as types from '../types';

export type CreateFiles = {
    pathToTemplate: string
    outputPath: string
    selectedNames: types.GetSelectedName | types.GetSelectedName[]
}
