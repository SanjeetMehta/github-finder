import React, {Component} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios";

class App extends Component {
    state = {
        users: [],
        loading: false
    };
    async componentDidMount() {
        this.setState({loading: true});
        const result = await axios.get("https://api.github.com/users");
        this.setState({users: result.data, loading: false});
    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="container">
                    <Users
                        loading={this.state.loading}
                        users={this.state.users}
                    />
                </div>
            </div>
        );
    }
}

export default App;
