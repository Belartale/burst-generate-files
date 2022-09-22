// Utils
import { getDataTemplate } from './getDataTemplate';

// Types
import * as types from './types';

export const collectorTemplates = (
    { optionsMarker, tabs }: types.CollectorTemplates,
) => {
    let templates: [] | string[] = [];

    if (typeof optionsMarker.markerTemplate === 'string') {
        return [ ...templates, getDataTemplate({ template: optionsMarker.markerTemplate, tabs }) ].join('\n');
    }

    if (Array.isArray(optionsMarker.markerTemplate)) {
        optionsMarker.markerTemplate.forEach((template: string) => {
            templates = [ ...templates, getDataTemplate({ template, tabs }) ];
        });

        return templates.join('\n');
    }

    return tabs + optionsMarker.markerTemplate;
};
