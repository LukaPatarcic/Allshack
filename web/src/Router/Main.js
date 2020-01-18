import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navigation from "../Components/Navigation";
import Login from "../Screens/Login";
import Register from "../Screens/Register";
import Logout from "../Components/Logout";
import Footer from "../Components/Footer";
import Homepage from "../Screens/Homepage";
import CookiePolicy from "../Legal/CookiePolicy";
import TermsOfService from "../Legal/TermsOfService";
import PrivacyPolicy from "../Legal/PrivacyPolicy";
import {setBackground} from "../services/Services";
import Profile from "../Screens/Profile";
import NotificationList from "../Components/NotificationList";
import FriendProfile from "../Screens/FriendProfile";
import Notfound from "../Components/Notfound";

export default class Main extends React.Component{

    constructor(props) {
        super(props);
        setBackground();
    }

    render() {

        return (
            <Router>
                <Navigation search={this.props.search}/>
                <Switch>
                    {/* SECURITY */}
                    <Route exact={true} path="/register" component={Register}/>
                    <Route exact={true} path="/login" component={Login}/>
                    <Route exact={true} path="/logout" component={Logout}/>
                    {/* LEGAL */}
                    <Route exact={true} path="/legal/cookie" component={CookiePolicy} />
                    <Route exact={true} path="/legal/privacy" component={PrivacyPolicy} />
                    <Route exact={true} path="/legal/tos" component={TermsOfService} />
                    {/* USER */}
                    <Route exact={true} path="/" component={Homepage}/>
                    <Route exact={true} path="/profile/:username" component={FriendProfile}/>
                    <Route exact={true} path="/notification/list" component={NotificationList} />
                    <Route exact={true} path="/profile" component={Profile} />
                    {/* NOT FOUND */}
                    <Route exact={true} path="/notFound" component={Notfound} />
                </Switch>
                <Footer/>
            </Router>
        );
    }
}