export interface APIDefinition {
    name: string;
    src: string;
}

export const apiClientDefinitions: APIDefinition[] = [
    {
        name: 'dp-backend',
        src: 'backend/api.json'
    }
];
