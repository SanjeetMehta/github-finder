import axios from "axios";
import React, {Component, Fragment} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
class App extends Component {
    state = {
        users: [],
        user: {},
        loading: false,
        alert: null
    };

    // Search github users.
    searchUsers = async text => {
        this.setState({loading: true});
        const result = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({users: result.data.items, loading: false});
    };

    // Clear users from state.
    clearUsers = () => this.setState({users: [], loading: false});

    // Get Single user.
    getUser = async username => {
        this.setState({loading: true});
        const result = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({user: result.data, loading: false});
    };
    // Set alert.
    setAlert = (message, type) => {
        this.setState({alert: {msg: message, type: type}});
        setTimeout(() => {
            this.setState({alert: null});
        }, 5000);
    };

    async componentDidMount() {
        this.setState({loading: true});
        const result = await axios.get(
            `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({users: result.data, loading: false});
    }
    render() {
        const {loading, users, user} = this.state;
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={this.state.alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={props => (
                                    <Fragment>
                                        <Search
                                            searchUsers={this.searchUsers}
                                            clearUsers={this.clearUsers}
                                            showClear={
                                                users.length ? true : false
                                            }
                                            setAlert={this.setAlert}
                                        />
                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />

                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={props => (
                                    <User
                                        {...props}
                                        getUser={this.getUser}
                                        user={user}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
