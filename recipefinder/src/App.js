import React, { Component } from 'react';
import {withRouter, Route, Switch} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import './App.css';

import Header from './components/Header'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Recipes from './components/Recipes'
import RecipeDetails from './components/RecipeDetails'

axios.defaults.withCredentials = true;

class App extends Component {

	constructor() {
		super()
		this.state = {
			user: false,
			recipes: [],
			recipe: [],
			recipebox: []
		}
	}

	componentDidMount() {
		this.verifyAuthenticated();
		this.loadRecipebox();

		axios.get('http://localhost:8080/')
			.then((response) => {
				let __recipes = response.data.matches
				this.setState({
					recipes: __recipes
				})
			})
	}

	verifyAuthenticated = () => {
		axios.get('http://localhost:8080/account')
			.then((response) => {
				if (response.status !== 401) {
					this.setState({
						user: response.data
					})
				}
			})
			.catch(err => {
				console.log("NOT AUTHENTICATED!")
			})
	}

	loadRecipebox = () => {
		axios.get('http://localhost:8080/recipebox')
			.then((response) => {
				let __recipebox = response.data
				this.setState({
					recipebox: __recipebox
				})
				this.props.history.push('/');
			})
	}

	search = (search) => {
		axios.post('http://localhost:8080/search', { search: search })
			.then((response) => {
				if (response.data.message) {
					swal(response.data.message)
				} else {
					let __recipes = response.data.matches
					this.setState({
						recipes: __recipes
					})
				}
			})
		this.props.history.push('/');
	}

	getRecipe = (recipeId) => {
		axios.get(`http://localhost:8080/getRecipe/${recipeId}`)
			.then((response) => {
				let __recipe = response
				this.setState({
					recipe: __recipe
				})
			})
	}

	saveRecipe = () => {
		let recipe = this.state.recipe

		axios.post('http://localhost:8080/recipe', { recipe: recipe })
			.then((response) => {
				swal(response.data.message)
			})
	}

	removeRecipe = (recipeid) => {
		axios.delete(`http://localhost:8080/delete/${recipeid}`)
			.then((response) => {
				swal(response.data.message)
			})
	}


	getRecipebox = () => {
		axios.get('http://localhost:8080/recipebox')
			.then((response) => {
				let __recipebox = response.data
				this.setState({
					recipebox: __recipebox
				})
				this.props.history.push('/recipebox');
				swal(response.data.error)
			})
	}

	logout = () => {
		axios.get('http://localhost:8080/logout')
			.then((response) => {
				this.setState({
					user: false
				})
				swal("You successfully logged out!")
			})
	}
	
	render() {
		return (
			<div className="container">
				<Header />
				<Navbar user={this.state.user} logout={() => this.logout()} getRecipebox={() => this.getRecipebox()} />
				<Search search={(search) => this.search(search)} />
				<div className="row fullLength">
					<div className="col s12 main z-depth-2">
						<Switch>
							<Route exact path="/" render={() => <Recipes recipes={this.state.recipes} />} />
							<Route exact path="/recipebox" render={() => <Recipes recipes={this.state.recipebox} />} />
							<Route path="/:recipeId" render={(props) => <RecipeDetails user={this.state.user} recipe={this.state.recipe} recipebox={this.state.recipebox}
								removeRecipe={(recipeid) => this.removeRecipe(recipeid)} saveRecipe={() => this.saveRecipe()} getRecipe={(recipeId) => this.getRecipe(recipeId)} {...props} />} />
						</Switch>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(App);
