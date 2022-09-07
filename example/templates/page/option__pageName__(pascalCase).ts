// Types
import { TypesOption } from '../types';

export const option__pageName__(pascalCase): TypesOption = {
    rootRoutePath: '/__pageName__',

    navLink: {
        path:     '/__pageName__',
        textLink: {
            id:   '__pageName__(kebabCase)',
            text: '__pageName__(pascalCase)',
        },
        subtitles: [
            {
                id:   'subtitles-id-__pageName__(kebabCase)',
                text: 'Subtitles __pageName__(pascalCase)',
            },
            {
                id:   'subtitles-id2-__pageName__(kebabCase)',
                text: 'Subtitles __pageName__(pascalCase)',
            },
        ],
    },
};
