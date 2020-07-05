import React, {Component} from "react";

class UserItems extends Component {
    constructor() {
        super();
        this.state = {
            id: "1",
            login: "mojombo",
            avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
            html_url: "https://github.com/mojombo"
        };
    }
    render() {
        const {avatar_url, html_url, id, login} = this.state;
        return (
            <div className="card text-center">
                <img
                    src={avatar_url}
                    alt=""
                    className="round-img"
                    style={{width: "60px"}}
                />
                <h3>{login}</h3>
                <div>
                    <a href={html_url} className="btn btn-dark btn-sm my-1">
                        More
                    </a>
                </div>
            </div>
        );
    }
}

export default UserItems;
