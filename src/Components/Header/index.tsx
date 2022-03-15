import { Link } from "react-router-dom";
import Logo from "../../Assets/logo-text.png";
import "./styles.scss";

const Header = () => {
    return (
        <div className="navbar border-b text-neutral-content header flex w-full">
            <div className="flex-1 sm:flex-1 xs:flex-none">
                <Link to="/">
                    <div className="avatar h-10">
                        <img alt="logo" src={Logo} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
