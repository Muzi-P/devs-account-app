
const appConfig = {
    app: process.env.REACT_APP_APP_ID,
    apiUrl: process.env.REACT_APP_API_URL,
    rootUrl: process.env.REACT_APP_ROOT_URL,
    domain: process.env.REACT_APP_DOMAIN,
    secure: process.env.REACT_APP_SECURE ?? false,
    googleId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    expiration: 2, // 2 days
};

export default appConfig;

