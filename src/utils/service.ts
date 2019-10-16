import { AxiosError } from 'axios';

export interface AsyncServiceResult<V> {
    data?: V;
    error?: AxiosError;
    loading: boolean;
}

export const buildDefault = <T>(data: T): AsyncServiceResult<T> => ({ data, error: undefined, loading: true });

// We need to disable the any check to make this function reusable for all the calls
// tslint:disable-next-line:no-any
export async function fetchData<R, Fn extends (...args: any[]) => Promise<R>>(
    serviceFunction: Fn,
    // tslint:disable-next-line:no-any
    ...args: any[]
): Promise<{ data?: R; error?: AxiosError; loading?: boolean }> {
    let data;
    try {
        data = await serviceFunction(...args);
        return { data, error: undefined, loading: false };
    } catch (error) {
        console.log(error);
        return { data: undefined, error, loading: false };
    }
}
