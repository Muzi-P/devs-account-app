import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import config from "../Config/App";
import { getTokens, updateToken } from "../Helpers/Services";
import { logout } from "../Reducers/Auth";
import { store } from "../store";
import { TOKEN } from "../Types/Token";

axios.defaults.baseURL = config.apiUrl;
axios.defaults.withCredentials = true;

const handleResponse = (response: Response) => {
    return response.text().then((text) => {
        try {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        } catch (err: any) {
            return Promise.reject(text);
        }
    });
};

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data ? response.data : response;
    },
    (err: any) => {
        return new Promise((resolve, reject) => {
            const originalReq: any = err.config;
            const token: TOKEN | null = getTokens();

            if (
                token &&
                token.refreshToken &&
                err.response &&
                err.response.status === 401 &&
                err.config &&
                !err.config.__isRetryRequest
            ) {
                originalReq._retry = true;

                const res = fetch(`${config.apiUrl}/auth/refresh`, {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refreshToken: token.refreshToken,
                    }),
                })
                    .then((res) => {
                        return handleResponse(res);
                    })
                    .then((res) => {
                        updateToken(res.refreshToken, res.accessToken);
                        originalReq.headers["Authorization"] =
                            "Bearer " + res.accessToken;
                        return axios(originalReq);
                    })
                    .catch(() => {
                        toast.error("Session ended, please login again...");
                        store.dispatch(logout());
                    });

                resolve(res);
            }
            reject(err.response && err.response.data ? err.response.data : err);
        });
    }
);

const getHeader = () => {
    const token: TOKEN | null = getTokens();
    if (token)
        return {
            headers: {
                Authorization: "Bearer " + token?.accessToken,
            },
        };
};

const getRequest = (url: string, params: any) => {
    let paramsStr = "";
    if (typeof params === "object") {
        const keys = Object.keys(params);
        paramsStr = keys.map((key) => `${key}=${params[key]}`).join("=");
    }

    if (params) paramsStr = `/?${paramsStr}`;

    return axios.get(`${url}${paramsStr}`, getHeader());
};

const postRequest = (url: string, body: any) => {
    return axios.post(url, body, getHeader());
};

const putRequest = (url: string, body: any) => {
    return axios.put(`${url}`, body, getHeader());
};

const deleteRequest = (url: string, params: any) => {
    let paramsStr = "";
    if (typeof params === "object") paramsStr = params.join("/");

    if (params) paramsStr = `/${paramsStr}`;

    return axios.delete(`${url}${paramsStr}`, getHeader());
};

export const RequestService = {
    get: getRequest,
    put: putRequest,
    post: postRequest,
    delete: deleteRequest,
};
