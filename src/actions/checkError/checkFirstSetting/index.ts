// Core
import fs from 'fs';

// Constants
import { betweenTwoLines, endErrorLine } from '../constants';

// Types
import * as types from './types';
import * as typesActions from '../../types';
import * as typesCommon from '../../../types';
import { resolve } from 'path';

export const checkFirstSetting = ({ whichFunction, settings, errors, PROJECT_ROOT }: types.CheckFirstSettings) => {
	const checkSettings = ({ setting, beginOfLine }: types.CheckSettings) => {
		const settingCustomGem = setting as typesCommon.SettingCustomGen;
		const settingCLIGen = setting as typesCommon.SettingCLIGenTemplate;

		// Setting Objects of Array
		//! ===== Start ===== setting: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate setting always be object
		/*
			if (typeof setting !== 'object') {
				errors.push(
					new Error(`${beginOfLine}${betweenTwoLines}Type '${typeof setting}' is not assignable to type 'object'.${endErrorLine}`),
				);
			}
		*/
		//! ===== End ===== setting: typesCommon.SettingCustomGen | typesCommon.SettingCLIGenTemplate setting always be object

		// Setting stringsReplacers
		const whichFunc = {
			customGen: () => {
				// TODO: make settingCustomGem.stringsReplacers array of objects to exclude checking
				/*
					if (typeof settingCustomGem.stringsReplacers !== 'object') { //! It's commented 'cause this if block runs when settingCustomGem.stringsReplacers === array
						errors.push(
							new Error(
								`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof settingCustomGem.stringsReplacers}' is not assignable to type 'object' | 'array'.${endErrorLine}`,
							),
						);
					}
				*/
				//! ======START======
				//TODO: remove this if block there is no need in it in current condition!!!
				// if (typeof settingCustomGem.stringsReplacers === 'object' && !Array.isArray(settingCustomGem.stringsReplacers)) { //! BEFORE: Double checking on same type!!
				if (!Array.isArray(settingCustomGem.stringsReplacers)) {
					//! AFTER: Double checking on same type!!
					if (typeof settingCustomGem.stringsReplacers.replaceVar !== 'string') {
						//! settingCustomGem.stringsReplacers.replaceVar always be string !! 'cause settingCustomGem.stringsReplacers is not array
						errors.push(
							new Error(
								`${beginOfLine}/stringsReplacers/replaceVar${betweenTwoLines}Type '${typeof settingCustomGem
									.stringsReplacers.replaceVar}' is not assignable to type 'string'.${endErrorLine}`,
							),
						);
					}
					if (typeof settingCustomGem.stringsReplacers.value !== 'string') {
						//! settingCustomGem.stringsReplacers.value always be string !! 'cause settingCustomGem.stringsReplacers is not array
						errors.push(
							new Error(
								`${beginOfLine}/stringsReplacers/value${betweenTwoLines}Type '${typeof settingCustomGem.stringsReplacers
									.value}' is not assignable to type 'string'.${endErrorLine}`,
							),
						);
					}
				}
				//! ======End======

				if (Array.isArray(settingCustomGem.stringsReplacers)) {
					settingCustomGem.stringsReplacers.forEach((obj, indexStringsReplacers) => {
						//! its array of objects!!!

						//! ==== Start ==== Remove if block it never runs
						if (typeof obj !== 'object' || (typeof obj !== 'object' && Array.isArray(obj))) {
							errors.push(
								new Error(
									`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]${betweenTwoLines}Type '${typeof obj}' is not assignable to type 'object'.${endErrorLine}`,
								),
							);
						}
						//! ==== End ==== Remove if block it never runs

						if (typeof obj === 'object' && !Array.isArray(obj)) {
							//! it always be object there is no need to check type

							//! ==== Start ==== Remove if block it never runs 'cause obj.replaceVar === string
							if (typeof obj.replaceVar !== 'string') {
								errors.push(
									new Error(
										`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]/replaceVar${betweenTwoLines}Type '${typeof obj.replaceVar}' is not assignable to type 'string'.${endErrorLine}`,
									),
								);
							}
							//! ==== End ==== Remove if block it never runs 'cause obj.replaceVar === string

							//! ==== Start ==== Remove if block it never runs 'cause obj.value === string
							if (typeof obj.value !== 'string') {
								errors.push(
									new Error(
										`${beginOfLine}/stringsReplacers[${indexStringsReplacers}]/value${betweenTwoLines}Type '${typeof obj.value}' is not assignable to type 'string'.${endErrorLine}`,
									),
								);
							}
							//! ==== Start ==== Remove if block it never runs 'cause obj.value === string
						}
					});
				}
			},
			CLIGen: () => {
				//! ==== Start ==== stringsReplacers: string | string[] => It can not be both a string and an array !!!this if block never runs
				if (typeof settingCLIGen.stringsReplacers !== 'string' && !Array.isArray(settingCLIGen.stringsReplacers)) {
					errors.push(
						new Error(
							`${beginOfLine}/stringsReplacers${betweenTwoLines}Type '${typeof settingCLIGen.stringsReplacers}' is not assignable to type 'string' | 'array'.${endErrorLine}`,
						),
					);
				}
				//! ==== End ==== stringsReplacers: string | string[] => It can not be both a string and an array !!!this if block never runs

				//! ===== Start ===== if block never runs !!!
				//! if it's array it contain strings as value !! it can not contain anything except strings
				Array.isArray(settingCLIGen.stringsReplacers) &&
					settingCLIGen.stringsReplacers.forEach((string: string, indexString: number) => {
						if (typeof string !== 'string') {
							//? How can it be ? string with type string is not a string ???
							errors.push(
								new Error(
									`${beginOfLine}/stringsReplacers[${indexString}]${betweenTwoLines}Type '${typeof string}' is not assignable to type 'string'.${endErrorLine}`,
								),
							);
						}
					});

				//! ===== End ===== if block never runs !!!
			},
		};

		whichFunc[whichFunction]();

		// Setting pathToTemplate
		//! ====Start==== this if block never runs setting.pathToTemplate can only be string or rray of strings
		if (typeof setting.pathToTemplate !== 'string' && !Array.isArray(setting.pathToTemplate)) {
			//! double checking on same type!!
			errors.push(
				new Error(
					`${beginOfLine}/pathToTemplate${betweenTwoLines}Type '${typeof setting.pathToTemplate}' is not assignable to type 'string' | 'array'.${endErrorLine}`,
				),
			);
		}
		//! ====End==== this if block never runs setting.pathToTemplate can only be string or rray of strings

		if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, setting.pathToTemplate))) {
			errors.push(
				new Error(`${beginOfLine}/pathToTemplate${betweenTwoLines}No such directory, '${setting.pathToTemplate}'.${endErrorLine}`),
			);
		}
		if (Array.isArray(setting.pathToTemplate)) {
			setting.pathToTemplate.forEach((path, indexPathToTemplate) => {
				//! ====Start==== setting.pathToTemplate is array of strings remove this if block
				if (typeof path !== 'string') {
					errors.push(
						new Error(
							`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`,
						),
					);
				}
				//! ====End==== setting.pathToTemplate is array of strings remove this if block

				if (typeof setting.pathToTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, path))) {
					errors.push(
						new Error(
							`${beginOfLine}/pathToTemplate[${indexPathToTemplate}]${betweenTwoLines}No such directory, '${path}'.${endErrorLine}`,
						),
					);
				}
			});
		}

		// Setting outputPath
		//! setting.outputPath is string or array of strings and it always exists there is no need to check if it exists it always exists
		if (setting.outputPath) {
			//! ====Start==== this if block never runs
			if (typeof setting.outputPath !== 'string' && !Array.isArray(setting.outputPath)) {
				//! doublechecking on same type !! it can not be neither string nor array
				errors.push(
					new Error(
						`${beginOfLine}/outputPath${betweenTwoLines}Type '${typeof setting.outputPath}' is not assignable to type 'string' | 'array'.${endErrorLine}`,
					),
				);
			}
			//! ====End==== this if block never runs

			//! ====Start==== this if block never makes a result!!
			if (Array.isArray(setting.outputPath)) {
				setting.outputPath.forEach((path, indexOutputPath) => {
					if (typeof path !== 'string') {
						//! it can not be other type except string!!!!
						errors.push(
							new Error(
								`${beginOfLine}/outputPath[${indexOutputPath}]${betweenTwoLines}Type '${typeof path}' is not assignable to type 'string'.${endErrorLine}`,
							),
						);
					}
				});
			}
			//! ====End==== this if block never makes a result!!
		}

		// Setting selectDirectory
		// Optional
		//! REMOVE!!!!!!
		//! ==== Start ==== THIS if block never runs 'cause setting.selectDirectory can only be boolean or undefined in this case you checking if it exists and not exists at the same time !!!
		if (Object.hasOwn(setting, 'selectDirectory') && typeof setting.selectDirectory !== 'boolean') {
			errors.push(
				new Error(
					`${beginOfLine}/selectDirectory${betweenTwoLines}Type '${typeof setting.selectDirectory}' is not assignable to type 'boolean'.${endErrorLine}`,
				),
			);
		}
		//! ==== End ==== THIS if block never runs 'cause setting.selectDirectory can only be boolean or undefined in this case you checking if it exists and not exists at the same time !!!

		// Setting markers
		// Optional
		if (setting.markers) {
			//! ===== Start ===== typesActions.SettingsMarker[] setting.markers (if exists) always be array
			if (!Array.isArray(setting.markers)) {
				errors.push(
					new Error(
						`${beginOfLine}/markers${betweenTwoLines}Type '${typeof setting.markers}' is not assignable to type 'array'.${endErrorLine}`,
					),
				);
			}
			//! ===== End ===== typesActions.SettingsMarker[] setting.markers (if exists) always be array
			// if (Array.isArray(setting.markers)) {  //! ===== Start ===== typesActions.SettingsMarker[] setting.markers (if exists) always be array
			setting.markers.forEach((settingMarker: typesActions.SettingsMarker, indexMarker: number) => {
				// Setting pattern
				//! ====Start==== settingMarker.pattern can only be string or regexp in this case nothing will hapen!!
				if (typeof settingMarker.pattern !== 'string' && settingMarker.pattern !== RegExp(settingMarker.pattern)) {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/pattern${betweenTwoLines}Type '${typeof settingMarker.pattern}' is not assignable to type 'string' | 'RegExp'.${endErrorLine}`,
						),
					);
				}
				//! ====End==== settingMarker.pattern can only be string or regexp in this case nothing will hapen!!

				// Setting pathToMarker
				//! ====Start==== settingMarker.pathToMarker can only be string or array of string in this case nothing will hapen!!
				if (typeof settingMarker.pathToMarker !== 'string' && !Array.isArray(settingMarker.pathToMarker)) {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}Type '${typeof settingMarker.pathToMarker}' is not assignable to type 'string' | 'array'.${endErrorLine}`,
						),
					);
				}
				//! ====End==== settingMarker.pathToMarker can only be string or array of string in this case nothing will hapen!!

				//TODO:
				if (whichFunction === 'customGen') {
					if (
						typeof settingMarker.pathToMarker === 'string' &&
						((typeof settingCustomGem.stringsReplacers === 'object' &&
							!Array.isArray(settingCustomGem.stringsReplacers) &&
							!settingMarker.pathToMarker.includes(settingCustomGem.stringsReplacers.replaceVar)) ||
							(Array.isArray(settingCustomGem.stringsReplacers) &&
								!settingCustomGem.stringsReplacers.some((srtRep) =>
									settingMarker.pathToMarker.includes(srtRep.replaceVar),
								))) &&
						!fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker))
					) {
						errors.push(
							new Error(
								`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`,
							),
						);
					}
					if (Array.isArray(settingMarker.pathToMarker)) {
						settingMarker.pathToMarker.forEach((pathToMarker, indexPathToMarker) => {
							if (typeof pathToMarker !== 'string') {
								errors.push(
									new Error(
										`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof pathToMarker}' is not assignable to type 'string'.${endErrorLine}`,
									),
								);
							}
							if (typeof pathToMarker === 'string') {
								if (
									typeof pathToMarker === 'string' &&
									((typeof settingCustomGem.stringsReplacers === 'object' &&
										!Array.isArray(settingCustomGem.stringsReplacers) &&
										!pathToMarker.includes(settingCustomGem.stringsReplacers.replaceVar)) ||
										(Array.isArray(settingCustomGem.stringsReplacers) &&
											!settingCustomGem.stringsReplacers.some((srtRep) =>
												pathToMarker.includes(srtRep.replaceVar),
											))) &&
									!fs.existsSync(resolve(PROJECT_ROOT, pathToMarker))
								) {
									errors.push(
										new Error(
											`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${pathToMarker}'.${endErrorLine}`,
										),
									);
								}
							}
						});
					}
				}
				//TODO:
				if (whichFunction === 'CLIGen') {
					if (typeof settingMarker.pathToMarker === 'string') {
						if (
							((typeof settingCLIGen.stringsReplacers === 'string' &&
								!settingMarker.pathToMarker.includes(settingCLIGen.stringsReplacers)) ||
								(Array.isArray(settingCLIGen.stringsReplacers) &&
									!settingCLIGen.stringsReplacers.some((srtRep) => settingMarker.pathToMarker.includes(srtRep)))) &&
							!fs.existsSync(resolve(PROJECT_ROOT, settingMarker.pathToMarker))
						) {
							errors.push(
								new Error(
									`${beginOfLine}/markers[${indexMarker}]/pathToMarker${betweenTwoLines}No such directory, '${settingMarker.pathToMarker}'.${endErrorLine}`,
								),
							);
						}
					}
					if (Array.isArray(settingMarker.pathToMarker)) {
						settingMarker.pathToMarker.forEach((pathToMarker, indexPathToMarker) => {
							if (typeof pathToMarker !== 'string') {
								errors.push(
									new Error(
										`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}Type '${typeof pathToMarker}' is not assignable to type 'string'.${endErrorLine}`,
									),
								);
							}
							if (
								typeof pathToMarker === 'string' &&
								((typeof settingCLIGen.stringsReplacers === 'string' &&
									!pathToMarker.includes(settingCLIGen.stringsReplacers)) ||
									(Array.isArray(settingCLIGen.stringsReplacers) &&
										!settingCLIGen.stringsReplacers.some((srtRep: string) => pathToMarker.includes(srtRep)))) &&
								!fs.existsSync(resolve(PROJECT_ROOT, pathToMarker))
							) {
								errors.push(
									new Error(
										`${beginOfLine}/markers[${indexMarker}]/pathToMarker[${indexPathToMarker}]${betweenTwoLines}No such directory, '${pathToMarker}'.${endErrorLine}`,
									),
								);
							}
						});
					}
				}

				// Setting markerTemplate
				//! ====Start==== Remove if blovk it will never runs
				if (typeof settingMarker.markerTemplate !== 'string' && !Array.isArray(settingMarker.markerTemplate)) {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}Type '${typeof settingMarker.markerTemplate}' is not assignable to type 'string' | 'array'.${endErrorLine}`,
						),
					);
				}
				//! ====End==== Remove if blovk it will never runs

				if (
					typeof settingMarker.markerTemplate === 'string' &&
					!fs.existsSync(resolve(PROJECT_ROOT, settingMarker.markerTemplate))
				) {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/markerTemplate${betweenTwoLines}No such directory, '${settingMarker.markerTemplate}'.${endErrorLine}`,
						),
					);
				}
				if (Array.isArray(settingMarker.markerTemplate)) {
					settingMarker.markerTemplate.forEach((markerTemplate, indexMarkerTemplate) => {
						//! remove if block it never runs
						if (typeof markerTemplate !== 'string') {
							errors.push(
								new Error(
									`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}Type '${typeof markerTemplate}' is not assignable to type 'string'.${endErrorLine}`,
								),
							);
						}
						if (typeof markerTemplate === 'string' && !fs.existsSync(resolve(PROJECT_ROOT, markerTemplate))) {
							errors.push(
								new Error(
									`${beginOfLine}/markers[${indexMarker}]/markerTemplate[${indexMarkerTemplate}]${betweenTwoLines}No such directory, '${markerTemplate}'.${endErrorLine}`,
								),
							);
						}
					});
				}

				// Setting genDirection
				// Optional
				//! ====Start==== There is no need in this if block you have excluded all conditions it never runs
				if (
					typeof settingMarker.genDirection !== 'undefined' &&
					settingMarker.genDirection !== 'after' &&
					settingMarker.genDirection !== 'before'
				) {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/genDirection${betweenTwoLines}Type '${typeof settingMarker.genDirection}' is not assignable to type 'after' | 'before' | 'undefined'.${endErrorLine}`,
						),
					);
				}
				//! ====End==== There is no need in this if block you have excluded all conditions it never runs

				// Setting onceInsert
				// Optional
				//! ====Start==== settingMarker.onceInsert can only be boolean or undefined if block never runs
				if (Object.hasOwn(settingMarker, 'onceInsert') && typeof settingMarker.onceInsert !== 'boolean') {
					errors.push(
						new Error(
							`${beginOfLine}/markers[${indexMarker}]/onceInsert${betweenTwoLines}Type '${typeof settingMarker.onceInsert}' is not assignable to type 'boolean'.${endErrorLine}`,
						),
					);
				}
				//! ====Start==== settingMarker.onceInsert can only be boolean or undefined if block never runs
			});
			// } //! ===== End ===== typesActions.SettingsMarker[] setting.markers (if exists) always be array
		}

		// Setting onComplete
		// Optional
		//! =====Start===== if block never runs 'cause of condition there is checking if it exists and it's not a function it's impossible
		if (Object.hasOwn(setting, 'onComplete') && typeof setting.onComplete !== 'function') {
			errors.push(
				new Error(
					`${beginOfLine}/onComplete${betweenTwoLines}Type '${typeof setting.onComplete}' is not assignable to type 'function'.${endErrorLine}`,
				),
			);
		}
		//! =====End===== if block never runs 'cause of condition there is checking if it exists and it's not a function it's impossible
	};

	if (!settings || !Array.isArray(settings)) {
		errors.push(
			new Error(
				`${whichFunction}/FirstSetting(Array)${betweenTwoLines}Type '${typeof settings}' is not assignable to type 'array'.${endErrorLine}`,
			),
		);
	}

	if (whichFunction === 'customGen' && Array.isArray(settings)) {
		settings.forEach((setting, indexSetting) => {
			checkSettings({
				setting: setting as typesCommon.SettingCustomGen,
				beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexSetting}]`,
			});
		});
	}

	if (whichFunction === 'CLIGen' && Array.isArray(settings)) {
		settings.forEach((setting, indexCLIGen: number) => {
			const settingCLIGen = setting as typesCommon.SettingCLIGen;
			if (typeof settingCLIGen.name !== 'string') {
				errors.push(
					new Error(
						`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/name${betweenTwoLines}Type '${typeof settingCLIGen.name}' is not assignable to type 'string'.${endErrorLine}`,
					),
				);
			}
			if (!Array.isArray(settingCLIGen.templates)) {
				errors.push(
					new Error(
						`${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates${betweenTwoLines}Type '${typeof settingCLIGen.templates}' is not assignable to type 'array'.${endErrorLine}`,
					),
				);
			}
			if (Array.isArray(settingCLIGen.templates)) {
				settingCLIGen.templates.forEach((setting, indexSetting: number) => {
					checkSettings({
						setting,
						beginOfLine: `${whichFunction}/FirstSetting(Array)/Config[${indexCLIGen}]/templates[${indexSetting}]`,
					});
				});
			}
		});
	}
};
