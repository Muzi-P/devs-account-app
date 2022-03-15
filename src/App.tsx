import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import PageLoader from "./Components/PageLoader";
import { RootState } from "./store";

const HomePage = lazy(() => import("./Pages/Home"));
const SecurePage = lazy(() => import("./Pages/Secure"));

const App = () => {

    const { loggedIn } = useSelector((state: RootState) => state.auth.user);

    return (
        <Suspense fallback={<PageLoader />}>
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/secure">
                        {loggedIn ? <SecurePage /> : <Redirect to="/" />}
                    </Route>
                </Switch>
            </Router>
        </Suspense>
    );
};

export default App;
