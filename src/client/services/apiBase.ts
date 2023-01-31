import { merge } from 'lodash';
import { store } from '../store';
import Axios, { AxiosInstance, Method, ResponseType, AxiosError, AxiosResponse, AxiosRequestConfig, CancelToken } from 'axios';
import { mapSlice } from '../store/slices/map.slice';
import { snackbarSlice } from '../store/slices/snackbar.slice';

export type ApiBaseHookModifyAxoisConfigHook = (axoisRequestConfig: AxiosRequestConfig) => Promise<void>;

export type ApiBaseHookBeforeRequestHook = (axiosInstance: AxiosInstance) => Promise<void>;

export type ApiBaseHookResponseSuccessHook = (
    axiosInstance: AxiosInstance,
    axiosResponse: AxiosResponse
) => Promise<void>;

export type ApiBaseHookResponseErrorHook = (
    axiosInstance: AxiosInstance,
    axiosResponse: AxiosResponse,
    axiosError: AxiosError) => Promise<void>;

export type ApiBaseHookTokenExpireErrorHook = (data: unknown) => Promise<unknown>;

export interface ApiBaseHooks {
    modifyAxiosConfig?: ApiBaseHookModifyAxoisConfigHook[];
    beforeRequest?: ApiBaseHookBeforeRequestHook[];
    responseError?: ApiBaseHookResponseErrorHook[];
    responseSuccess?: ApiBaseHookResponseSuccessHook[];
    tokenExpiredError?: ApiBaseHookTokenExpireErrorHook[];
}

export interface ApiBaseOptions {
    baseUrl?: string;
    headers?: { [key: string]: string };
    hooks?: ApiBaseHooks;
}

export interface ApiBaseRequestOptions {
    method: Method;
    url: string;
    data?: unknown;
    params?: unknown;
    headers?: { [key: string]: string };
    config?: AxiosRequestConfig;
    suppressNotices?: boolean;
    hooks?: ApiBaseHooks;
    responseType?: ResponseType;
    returnFullResponse?: boolean;
    cancelToken?: CancelToken;
    onErrorToast?: (
        axiosInstance: AxiosInstance,
        axiosResponse: AxiosResponse,
        axoisError: AxiosError
    ) => Promise<boolean | { message: string; title: string }>;
}

export abstract class ApiBase {
    private _options: ApiBaseOptions;

    // protected abstract getBaseUrl(state?: any): string;

    constructor(options?: ApiBaseOptions) {
        this._options = options ?? {};
    }

    protected setHooks(hooks: ApiBaseHooks) {
        this._options.hooks = hooks;
    }

    protected request = async<T>(options: any): Promise<T> => {
        const headers = {
            ...this._options.headers,
            ...options.headers,
        }

        const { appConfig } = store.getState();

        const axiosRequestConfig: AxiosRequestConfig = {
            url: options.url,
            method: options.method,
            headers,
            data: options.data,
            params: options.params,
            responseType: options.responseType,
        }

        if (options.config) {
            merge(axiosRequestConfig, options.config);
        }

        const http = Axios.create(axiosRequestConfig);

        http.interceptors.response.use(
            (response) => {
                return response;
            }, (error) => {
                if (error.response) {
                    const { status } = error.response;
                    switch (status) {
                        case 401: {
                            store.dispatch(
                                snackbarSlice.actions.showError('Session expired. Please log in again to continue.')
                            )
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500)
                            break;
                        }
                        case 403: {
                            store.dispatch(
                                snackbarSlice.actions.showError('You do not have permissions to view this content.')
                            )
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500)
                            break;
                        }
                        default: {
                            return Promise.reject(error);
                        }
                    }
                } else {
                    store.dispatch(snackbarSlice.actions.showError(error.message));
                    return Promise.reject(error);
                }
            }
        );

        const beforeRequestHooks = [
            ...(this._options.hooks?.beforeRequest ?? []),
            ...(options.hooks?.beforeRequest ?? []),
        ];

        for (let i = 0; i < beforeRequestHooks.length; i++) {
            const hook = beforeRequestHooks[i];
            await hook(http);
        }

        const response: AxiosResponse | undefined = await http.request(axiosRequestConfig);
        const data = response?.data;
        return options.returnFullResponse ? { ...response, data } : data;
    }
}