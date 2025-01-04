// Types
import * as typesActions from '../../actions/types';

export type Cases = {
    stringReplace: typesActions.GetSelectedName;
    result: string;
};

export type ReplaceWordCase = {
    string: string;
    stringsForReplace: typesActions.GetSelectedName | typesActions.GetSelectedName[];
};
