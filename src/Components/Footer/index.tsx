import { Link } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import "./styles.scss";

const Footer = () => {
    return (
        <footer className="p-10 footer bg-base-200 text-base-content">
            <div>
                <div className="logo">
                    <img alt="" src={Logo} />
                </div>
            </div>
            <div>
                <span className="footer-title">Support</span>
                <Link to="/support" className="link link-hover">
                    Help Center
                </Link>
                <a href="/" className="link link-hover">
                    iOS App
                </a>
                <a href="/" className="link link-hover">
                    Android App
                </a>
            </div>
            <div>
                <span className="footer-title">Transparency</span>
                <Link to="/privacy-policy" className="link link-hover">
                    Privacy policy
                </Link>
                <Link to="/terms-of-service" className="link link-hover">
                    Terms of Service
                </Link>
            </div>
        </footer>
    );
};

export default Footer;
