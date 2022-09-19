// utils
import { isLineOrTemplate } from './isLineOrTemplate';

// Types
import * as types from '../../types';

export const defineMarkerAndAdd = ({ optionsMarker, dataRedFile }: types.DefineMarkerAndAdd) => {
    const newDataRedFile: string = dataRedFile.split(/\r?\n/).map((line: string) => {
        const reg = new RegExp(`^.*(${optionsMarker.pattern})$`, 'g');

        if (
            (typeof optionsMarker.pattern === 'string' && line.match(reg))
            || (optionsMarker.pattern === RegExp(optionsMarker.pattern) && line.match(optionsMarker.pattern))
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
                return line + '\n' + isLineOrTemplate(optionsMarker.markerTemplate, tabs);
            }
            if (optionsMarker.genDirection === 'before') {
                return isLineOrTemplate(optionsMarker.markerTemplate, tabs) + '\n' + line;
            }
        }

        return line;
    })
        .join('\n');

    return newDataRedFile;
};
