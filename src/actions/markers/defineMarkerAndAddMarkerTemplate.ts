// Functions
import { collectorTemplates } from './collectorTemplates';

// Types
import * as types from './types';

export const defineMarkerAndAddMarkerTemplate = (
    { settingsMarker, dataRedFile }: types.DefineMarkerAndAddMarkerTemplate,
) => {
    const newDataRedFile: string = dataRedFile.split(/\r?\n/).map((line: string) => {
        const reg = new RegExp(`^.*(${settingsMarker.pattern})$`, 'g');

        if (
            (typeof settingsMarker.pattern === 'string' && line.match(reg))
            || (settingsMarker.pattern === RegExp(settingsMarker.pattern) && settingsMarker.pattern.test(line))
        ) {
            let tabs: string = '';

            line.split('').every((symbolOfLine) => {
                if (symbolOfLine === ' ') {
                    tabs += ' ';

                    return true;
                }

                return false;
            });

            if (typeof settingsMarker.genDirection === 'undefined' || settingsMarker.genDirection === 'after') {
                return line + '\n' + collectorTemplates({ settingsMarker, tabs });
            }
            if (settingsMarker.genDirection === 'before') {
                return collectorTemplates({ settingsMarker, tabs }) + '\n' + line;
            }
        }

        return line;
    })
        .join('\n');

    return newDataRedFile;
};
