import React, { Component } from 'react';

class Navbar extends Component {
    
    render() {
        return (
            <div className="row">
			
			<nav classsName="z-depth-0">
				<div className="nav-wrapper">
				<a href="/" className="brand-logo">Home</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><a href="http://localhost:8080/auth/google">Login</a></li>
				</ul>
				</div>
			</nav>
			
			</div>
        )
    }
}

export default Navbar