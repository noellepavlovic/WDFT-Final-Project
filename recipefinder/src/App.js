import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

axios.defaults.withCredentials = true;

class App extends Component {

	constructor() {
		super()
		this.state = {
			user: false,
		}
	}

	componentDidMount() {
		this.verifyAuthenticated();
	}

	verifyAuthenticated = () => {
		axios.get('http://localhost:8080/account')
			.then((res) => {
				console.log(res)
				if (res.status !== 401) {
					this.setState({
						user: res.data
					})
				}
			})
			.catch(err => {
				console.log("not authenticated")
			})
	}

	search = (search) => {
		axios.post('http://localhost:8080/search', { search: search })
			.then((response) => {
				let recipes = response
			})
	}

	getRecipe = (recipeId) => {
		axios.get(`http://localhost:8080/getRecipe/${recipeId}`)
			.then((response) => {
				let recipe = response
			})
	}



	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>

				</header>
				<p className="App-intro">

					<a href="http://localhost:8080/auth/google"><button>Login</button></a>
					To get started, edit <code>src/App.js</code> and save to reload.
        </p>
			</div>
		);
	}
}

export default App;
