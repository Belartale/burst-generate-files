// utils
import { collectorPatternFileAndTemplates } from './collectorPatternFileAndTemplates';

// Types
import * as types from './types';

export const defineMarkerAndAdd = (
    { pathToTemplate, optionsMarker, dataRedFile, PROJECT_ROOT }: types.DefineMarkerAndAdd,
) => {
    const newDataRedFile: string = dataRedFile.split(/\r?\n/).map((line: string) => {
        const reg = new RegExp(`^.*(${optionsMarker.pattern})$`, 'g'); //? todo // and /* add???????

        if (
            typeof optionsMarker.pattern === 'string' && line.match(reg)
        ) {
            let tabs: string = '';

            line.split('').every((symbolOfLine) => {
                if (symbolOfLine === ' ') {
                    tabs += ' ';

                    return true;
                }

                return false;
            });

            if (typeof optionsMarker.genDirection === 'undefined' || optionsMarker.genDirection === 'after') {
                return line + '\n' + collectorPatternFileAndTemplates({ pathToTemplate, optionsMarker, tabs, PROJECT_ROOT });
            }
            if (optionsMarker.genDirection === 'before') {
                return collectorPatternFileAndTemplates({ pathToTemplate, optionsMarker, tabs, PROJECT_ROOT }) + '\n' + line;
            }
        }

        return line;
    })
        .join('\n');

    return newDataRedFile;
};
