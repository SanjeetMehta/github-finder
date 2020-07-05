import React, {Component} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import UserItems from "./components/users/UserItems";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar title="Github Finder" icon="fab fa-github" />
                <UserItems />
            </div>
        );
    }
}

export default App;
