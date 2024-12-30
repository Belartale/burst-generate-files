// Core
import enquirer from 'enquirer';

// Types
import * as typesCommon from '../../types';

export const getSelectedItem = async (settings: typesCommon.SettingCLIGen[]): Promise<typesCommon.SettingCLIGen> => {
    const getNamesForShowingInCLI = () => {
        const result = settings.map((setting) => setting.name);

        return result;
    };

    const gotValue: { settingChoice: string } = await enquirer.prompt({
        type: 'autocomplete',
        name: 'settingChoice',
        message: 'What do you want to generate?',
        choices: getNamesForShowingInCLI(),
    });

    return settings.find(
        (item: Omit<typesCommon.SettingCLIGen, 'templates'>) => item.name === gotValue.settingChoice,
    ) as typesCommon.SettingCLIGen;
};
