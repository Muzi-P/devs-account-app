import Cookies from "universal-cookie";
import config from "../Config/App";

import { AuthUser } from "../Reducers/Auth";
import { TOKEN } from "../Types/Token";

const cookies = new Cookies();

export const getTokens = () => {
    const data: AuthUser = cookies.get(`${config.app}-user`);
    const token: TOKEN | null =
        typeof data !== "undefined"
            ? {
                  refreshToken: data.refreshToken,
                  accessToken: data.accessToken,
              }
            : null;

    return token ?? null;
};

export const removeUser = () => {
    cookies.remove(`${config.app}-user`, {
        domain: config.domain,
        path: "/",
        secure: Boolean(config.secure),
        sameSite: true,
    });
};

export const updateUser = (user: AuthUser) => {
    let exp = new Date();
    exp.setDate(exp.getDate() + config.expiration);
    cookies.set(`${config.app}-user`, JSON.stringify(user), {
        expires: exp,
        domain: config.domain,
        path: "/",
        secure: Boolean(config.secure),
        sameSite: true,
    });
};

export const updateToken = (refreshToken: string, accessToken: string) => {
    const data: AuthUser = cookies.get(`${config.app}-user`);
    data.refreshToken = refreshToken;
    data.accessToken = accessToken;
    let exp = new Date();
    exp.setDate(exp.getDate() + config.expiration);
    cookies.set(`${config.app}-user`, JSON.stringify(data), {
        expires: exp,
        domain: config.domain,
        path: "/",
        secure: Boolean(config.secure),
        sameSite: true,
    });
};
