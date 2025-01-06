export type GetName = {
    message: string;
    name: string;
};

export type GetSelectedName = {
    replaceVar: string;
    value: string;
};

export type GotValueOfEnquirerPrompt = {
    selectedName: string;
};
