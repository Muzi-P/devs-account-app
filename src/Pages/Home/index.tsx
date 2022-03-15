import { lazy } from "react";

import Layout from "../../Components/Layout";

const Auth = lazy(() => import("../../Modules/Auth"));

const HomePage = () => {

    return (
        <Layout>
            <Auth />
        </Layout>
    );
};

export default HomePage;
