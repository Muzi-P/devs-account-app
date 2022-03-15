import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router";

import moment from "moment";
import "moment-timezone";

import config from "../../Config/App";
import { AuthService } from "../../Services/Auth";
import { setUser } from "../../Reducers/Auth";

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const redirectTo = query.get("p");

    const onSuccess = async (res: any) => {
        if (res?.tokenObj) {
            try {
                const result: any = await AuthService.google(
                    res?.tokenObj?.access_token,
                    moment.tz.guess()
                );
                dispatch(setUser({ user: result }));
                if (redirectTo) window.location.href = redirectTo;
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    const onFailure = (err) => {};

    return (
        <GoogleLogin
            className="google-button"
            clientId={String(config.googleId)}
            buttonText="Continue with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            scope="profile email"
        />
    );
};

export default GoogleAuth;
