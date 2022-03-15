import { ReactNode, FC } from "react";

import Footer from "../Footer";
import Header from "../Header";

import "./styles.scss";

interface Props {
    children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="main-container">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
