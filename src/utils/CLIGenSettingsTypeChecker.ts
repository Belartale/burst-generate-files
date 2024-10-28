import { SettingCLIGen } from '../types';

export const CLIGenSettingsTypeChecker = (settings: SettingCLIGen[]) => {
	const errors: {
		message: string;
		value?: string;
		template?: { property: string; value: string };
		marker?: { property: string; value: string };
	}[] = [];
	// Typechecking
	if (Array.isArray(settings)) {
		settings.forEach((item) => {
			if (typeof item.name !== 'string')
				errors.push({
					message: `name should be a string!`,
					value: JSON.stringify(item.name),
				});

			if (!Array.isArray(item.templates)) {
				errors.push({
					message: `templates should be an array!`,
					value: JSON.stringify(item.templates),
				});
				return;
			}

			item?.templates?.forEach(({ stringsReplacers, pathToTemplate, outputPath, selectDirectory, markers }) => {
				if (typeof stringsReplacers === 'string' || !Array.isArray(stringsReplacers)) {
					errors.push({
						message: `stringsReplacers should be a string or array of strings!`,
						template: {
							property: 'stringsReplacers',
							value: JSON.stringify(stringsReplacers),
						},
					});
				}

				if (Array.isArray(stringsReplacers)) {
					const wrongTypeValues: number[] = [];
					stringsReplacers.forEach((replacer, index) => {
						if (typeof replacer !== 'string') wrongTypeValues.push(index);
					});
					wrongTypeValues.length &&
						errors.push({
							message: `stringsReplacers have wrong values at indexes: ${wrongTypeValues.join(',')}!`,
							template: {
								property: 'stringsReplacers',
								value: JSON.stringify(stringsReplacers),
							},
						});
				}

				if (typeof pathToTemplate !== 'string' && !Array.isArray(pathToTemplate)) {
					errors.push({
						message: `pathToTemplate should be a string or an array of strings!`,
						template: {
							property: 'pathToTemplate',
							value: JSON.stringify(pathToTemplate),
						},
					});
				}

				if (typeof pathToTemplate !== 'string' && Array.isArray(pathToTemplate)) {
					const wrongTypeValues: number[] = [];
					pathToTemplate.forEach((replacer, index) => {
						if (typeof replacer !== 'string') wrongTypeValues.push(index);
					});
					wrongTypeValues.length &&
						errors.push({
							message: `pathToTemplate have wrong values at indexes: ${wrongTypeValues.join(',')}!`,
							template: {
								property: 'pathToTemplate',
								value: JSON.stringify(pathToTemplate),
							},
						});
				}

				if (outputPath) {
					if (typeof outputPath !== 'string' && !Array.isArray(outputPath)) {
						errors.push({
							message: `outputPath should be a string or an array of strings or undefined!`,
							template: {
								property: 'outputPath',
								value: JSON.stringify(outputPath),
							},
						});
					}
					if (typeof outputPath !== 'string' && Array.isArray(outputPath)) {
						const wrongTypeValues: number[] = [];
						outputPath.forEach((replacer, index) => {
							if (typeof replacer !== 'string') wrongTypeValues.push(index);
						});
						wrongTypeValues.length &&
							errors.push({
								message: `outputPath have wrong values at indexes: ${wrongTypeValues.join(',')}!`,
								template: {
									property: 'outputPath',
									value: JSON.stringify(outputPath),
								},
							});
					}
				}

				if (selectDirectory && typeof selectDirectory !== 'boolean') {
					errors.push({
						message: `selectDirectory should be boolean or undefined!`,
						template: {
							property: 'selectDirectory',
							value: JSON.stringify(selectDirectory),
						},
					});
				}
				if (markers && !Array.isArray(markers)) {
					errors.push({
						message: `markers should be an array or undefined!`,
						template: {
							property: 'markers',
							value: JSON.stringify(markers),
						},
					});
				}

				if (markers && Array.isArray(markers)) {
					markers.forEach((marker) => {
						// eslint-disable-next-line no-empty
						if (typeof marker.pattern === 'string' || !!(marker instanceof RegExp)) {
						} else {
							errors.push({
								message: 'pattern should be a string or RegEpx',
								marker: {
									property: 'pattern',
									value: JSON.stringify(marker.pattern),
								},
							});
						}
						// eslint-disable-next-line no-empty
						if (typeof marker.markerTemplate === 'string' || Array.isArray(marker.markerTemplate)) {
							if (Array.isArray(marker.markerTemplate)) {
								const wrongTypeValues: number[] = [];
								marker.markerTemplate.forEach((val, i) => {
									if (typeof val !== 'string') wrongTypeValues.push(i);
								});
								wrongTypeValues.length &&
									errors.push({
										message: `markerTemplate have wrong values at indexes: ${wrongTypeValues.join(',')}!`,
										template: {
											property: 'markerTemplate',
											value: JSON.stringify(marker.markerTemplate),
										},
									});
							}
						} else {
							errors.push({
								message: 'markerTemplate should be a string or array of strings',
								marker: {
									property: 'markerTemplate',
									value: JSON.stringify(marker.markerTemplate),
								},
							});
						}
						// eslint-disable-next-line no-empty
						if (typeof marker.pathToMarker === 'string' || Array.isArray(marker.pathToMarker)) {
							if (Array.isArray(marker.pathToMarker)) {
								const wrongTypeValues: number[] = [];
								marker.pathToMarker.forEach((val, i) => {
									if (typeof val !== 'string') wrongTypeValues.push(i);
								});
								wrongTypeValues.length &&
									errors.push({
										message: `pathToMarker have wrong values at indexes: ${wrongTypeValues.join(',')}!`,
										template: {
											property: 'pathToMarker',
											value: JSON.stringify(marker.pathToMarker),
										},
									});
							}
						} else {
							errors.push({
								message: 'pathToMarker should be a string or array of strings',
								marker: {
									property: 'pathToMarker',
									value: JSON.stringify(marker.pathToMarker),
								},
							});
						}

						if (
							(marker.genDirection && marker.genDirection === 'after') ||
							(marker.genDirection && marker.genDirection === 'before') ||
							typeof marker.genDirection === 'undefined'
							// eslint-disable-next-line no-empty
						) {
						} else {
							errors.push({
								message: 'genDirection should be of value "before" or "after" or undefined',
								marker: {
									property: 'genDirection',
									value: JSON.stringify(marker.genDirection),
								},
							});
						}

						// eslint-disable-next-line no-empty
						if ((marker.onceInsert && typeof marker.onceInsert === 'boolean') || typeof marker.onceInsert === 'undefined') {
						} else {
							errors.push({
								message: 'onceInsert should be of value boolean or undefined',
								marker: {
									property: 'onceInsert',
									value: JSON.stringify(marker.onceInsert),
								},
							});
						}
					});
				}
			});
		});
	}

	return errors;
};
