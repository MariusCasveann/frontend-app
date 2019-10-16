export enum LocalStorageKeys {
    token = 'auth_token'
}

type Key = LocalStorageKeys | string;

// local helper methods for creating setters, getters and resetters
const createLSGetter = (key: Key, fallbackValue: string) => (): string => localStorage.getItem(key) || fallbackValue;
const createLSSetter = (key: Key) => (newValue: string) => localStorage.setItem(key, newValue);
const createLSResetter = (keys: Key[]) => () => keys.forEach(k => localStorage.removeItem(k));

/**
 * Methods for Key-Value Pairs in the localStorage
 */
export class DPLocalStorage {
    // getters
    public static getToken = createLSGetter(LocalStorageKeys.token, '');
    // setters
    public static setToken = createLSSetter(LocalStorageKeys.token);
    // resetters
    public static resetSession = createLSResetter([LocalStorageKeys.token]);
}
