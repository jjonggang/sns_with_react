import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "./Navigation";


const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />} 
            {/*isLoggedIn이 true인 경우에만, navigation이 보이도록 처리*/ }
            <Switch>
                {isLoggedIn? (
                    <div
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 50,
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <Route exact path = "/" >
                            <Home userObj = {userObj} />
                        </Route>
                        <Route exact path = "/profile">
                            <Profile refreshUser={refreshUser} userObj={userObj} /> 
                            {/* userObj를 profile 컴포넌트에 넘긴다  */}
                        </Route>
                    </div>
                ) : (<Route exact path = "/"><Auth /></Route>)}
            </Switch>
        </Router>
        
    );
};

export default AppRouter;