// utils
import { collectorTemplates } from './collectorTemplates';

// Types
import * as types from './types';

export const defineMarkerAndAddMarkerTemplate = (
    { optionsMarker, dataRedFile }: types.DefineMarkerAndAddMarkerTemplate,
) => {
    const newDataRedFile: string = dataRedFile.split(/\r?\n/).map((line: string) => {
        const reg = new RegExp(`^.*(${optionsMarker.pattern})$`, 'g');

        if (
            (typeof optionsMarker.pattern === 'string' && line.match(reg))
            || (optionsMarker.pattern === RegExp(optionsMarker.pattern) && optionsMarker.pattern.test(line))
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
                return line + '\n' + collectorTemplates({ optionsMarker, tabs });
            }
            if (optionsMarker.genDirection === 'before') {
                return collectorTemplates({ optionsMarker, tabs }) + '\n' + line;
            }
        }

        return line;
    })
        .join('\n');

    return newDataRedFile;
};
