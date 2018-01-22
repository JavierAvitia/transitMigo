import React from "react";
import { Route } from 'react-router-dom';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Favorites from "./children/Favorites";
import Home from "./children/Home";
import Saves from "./children/Saves";

// use const and render the usual stuff in a component so boolean && can be used
// to either render the page or to render the login page

const LoggedIn = (props) => (
	<div>
		<Navbar pathName={props.pathName} loggedIn={props.loggedIn} logout={props.logout} />
	    <Route exact path="/" render={() => (<Home username={props.username} />)} />
	    <Route path="/saves" component={Saves} />
	    <Route path="/favorites" component={Favorites} />
	    <Footer />
	</div>
);

export default LoggedIn;
