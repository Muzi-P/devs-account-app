import "./styles.css";

const PageLoader = () => {
    return (
        <div className="loader-container">
            <div className="flex flex-col justify-center w-full h-full">
                <button className="btn btn-ghost btn-lg loading self-center normal-case text-white">
                    Loading...
                </button>
            </div>
        </div>
    );
};

export default PageLoader;
