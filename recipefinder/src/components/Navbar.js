import React, { Component } from 'react';

class Navbar extends Component {
    
    render() {
        return (
            <div className="row">
                <nav>
                    <div className="nav-wrapper z-depth-2">
                        <a href="/" className="brand-logo">Home</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.props.user
                                ? <span><li><a onClick={() => this.props.history.goBack()}><i class="white-icon medium material-icons">arrow_back</i></a></li>
                                    <li><a onClick={() => this.props.getRecipebox()}>Recipe Box</a></li>
                                    <li><a onClick={() => this.props.logout()}>Logout</a></li></span>
                                : <span><li><a onClick={() => this.props.history.goBack()}><i class="white-icon medium material-icons">arrow_back</i></a></li>
                                    <li><a href="http://localhost:8080/auth/google">Login</a></li></span>}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar;