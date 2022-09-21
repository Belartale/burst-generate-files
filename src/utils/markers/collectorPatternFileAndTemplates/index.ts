// Utils
import { getDataPatternFile } from './getDataPatternFile';
import { getDataTemplate } from './getDataTemplate';

// Types
import * as types from '../types';

export const collectorPatternFileAndTemplates = (
    { pathToTemplate, optionsMarker, tabs, PROJECT_ROOT }: types.CollectorPatternFileAndTemplates,
) => {
    let templates: [] | string[] = [];

    if (typeof optionsMarker.markerTemplate === 'string') {
        const dataPatternFile = getDataPatternFile({ tabs, pathToTemplate, optionsMarker, PROJECT_ROOT });

        if (dataPatternFile) {
            templates = [ ...templates, dataPatternFile ];
        }

        return [ ...templates, getDataTemplate({ template: optionsMarker.markerTemplate, tabs, PROJECT_ROOT }) ].join('\n');
    }

    if (Array.isArray(optionsMarker.markerTemplate)) {
        const dataPatternFile = getDataPatternFile({ tabs, pathToTemplate, optionsMarker, PROJECT_ROOT });

        if (dataPatternFile) {
            templates = [ ...templates, dataPatternFile ];
        }

        optionsMarker.markerTemplate.forEach((template: string) => {
            templates = [ ...templates, getDataTemplate({ template, tabs, PROJECT_ROOT }) ];
        });

        return templates.join('\n');
    }

    return tabs + optionsMarker.markerTemplate;
};
