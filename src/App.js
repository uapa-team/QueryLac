import React, {Component} from "react";
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Home from "./modules/queryLac/pages/Home/Home.page";
// import Header from "./layouts/Header/Header.layout";
import './global/styles/styles.scss';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                {/*<Header/>*/}
                <Switch>
                    <Route path="/home" component={Home}/>
                    <Route exact path="/"><Redirect to="/home"/></Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;


