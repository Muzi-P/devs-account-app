import BasicAuth from "../../Components/BasicAuth";
import GoogleAuth from "../../Components/GoogleAuth";

const Auth = () => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-12">
            <div className="col-start-2 col-span-2 md:col-start-5 md:col-span-4 sm:col-start-1 sm:col-span-2">
                <div>
                    <BasicAuth />
                </div>
                <div className="divider">OR</div>
                <div className="flex justify-center">
                    <GoogleAuth />
                </div>
            </div>
        </div>
    );
};

export default Auth;
