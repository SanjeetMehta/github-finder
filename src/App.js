import axios from "axios";
import React, {Component} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
class App extends Component {
    state = {
        users: [],
        loading: false,
        alert: null
    };
    searchUsers = async text => {
        this.setState({loading: true});
        const result = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        this.setState({users: result.data.items, loading: false});
    };

    clearUsers = () => this.setState({users: [], loading: false});

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
        const {loading, users} = this.state;
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Alert alert={this.state.alert} />
                    <Search
                        searchUsers={this.searchUsers}
                        clearUsers={this.clearUsers}
                        showClear={users.length ? true : false}
                        setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </div>
            </div>
        );
    }
}

export default App;
