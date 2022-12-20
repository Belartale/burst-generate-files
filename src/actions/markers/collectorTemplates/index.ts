// Utils
import { getDataTemplate } from './getDataTemplate';

// Types
import * as types from './types';

export const collectorTemplates = (
    { settingsMarker, tabs }: types.CollectorTemplates,
) => {
    let templates: [] | string[] = [];

    if (typeof settingsMarker.markerTemplate === 'string') {
        return [ ...templates, getDataTemplate({ template: settingsMarker.markerTemplate, tabs }) ].join('\n');
    }

    if (Array.isArray(settingsMarker.markerTemplate)) {
        settingsMarker.markerTemplate.forEach((template: string) => {
            templates = [ ...templates, getDataTemplate({ template, tabs }) ];
        });

        return templates.join('\n');
    }

    return tabs + settingsMarker.markerTemplate;
};
