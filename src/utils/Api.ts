import Axios, { AxiosInstance } from 'axios';
import { config } from '../config';
import { DPLocalStorage } from '../state/LocalStorage';

export const unpack = <T>({ data }: { data: T }) => data;

class Api {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = this.initialize();
    }

    private initialize() {
        return Axios.create({
            baseURL: `${config.backend.url}`,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${DPLocalStorage.getToken()}`,
                'Content-Type': 'application/json'
            }
        });
    }

    public reset() {
        this.axiosInstance = this.initialize();
    }

    public getInstance() {
        return this.axiosInstance;
    }

    public get(path: string) {
        return this.axiosInstance.get(path);
    }

    public post<T>(path: string, payload: T) {
        return this.axiosInstance.post(path, payload);
    }
}

export const api = new Api();
