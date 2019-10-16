declare module 'replace-in-file' {
    export interface FileReplaceOptions {
        files: string;
        from: RegExp;
        to: string;
    }
    export function replace(options: FileReplaceOptions): Promise;
    export = replace;
}
