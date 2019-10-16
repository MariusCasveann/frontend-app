declare module 'openapi-client' {
    export const openapi: {
        genCode: (options: CodeGenOptions) => Promise<{}>;
    };
    export interface CodeGenOptions {
        src: string;
        outDir: string;
        language: string;
        redux: boolean;
    }
}
