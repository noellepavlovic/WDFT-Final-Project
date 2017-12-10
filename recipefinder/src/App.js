import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Route } from 'react-router-dom';
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
			recipe: []
		}
	}

	componentDidMount() {
		this.verifyAuthenticated();
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
				console.log("not authenticated")
			})
	}

	search = (search) => {
			axios.post('http://localhost:8080/search', {search: search})
			.then((response) => {
				let __recipes = response.data.matches
				this.setState({
					recipes: __recipes
				})
				this.props.history.push('/');
			})
	}

	getRecipe = (recipeId) => {
		axios.get(`http://localhost:8080/getRecipe/${recipeId}`)
			.then((response) => {
				console.log(response)
				let __recipe = response
				this.setState({
					recipe: __recipe
			})
		})
		console.log("this is the recipe")
		console.log(this.state.recipe)
	}

	saveRecipe = () => {
		let recipe = this.state.recipe
		
		axios.post('http://localhost:8080/recipe', {recipe: recipe, user: this.state.user})
			.then((response) => {
				swal("Recipe Saved!")
			})
	}

	getRecipebox = () => {
		console.log("in getRecipebox")
		axios.get('http://localhost:8080/recipebox')
		.then((response) => {
			console.log(response.data)
			let __recipes = response.data
			this.setState({
				recipes: __recipes
			})
			this.props.history.push('/');
			console.log("in getRecipebox2")
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
		console.log(this.state.user)
		return (
			<div className="container">
				<Header />
				<Navbar user={this.state.user} logout={() => this.logout()} getRecipebox={() => this.getRecipebox()}/>
				<Search search={(search) => this.search(search)} />
				<div className="row fullLength">

					<div className="col s12 main z-depth-2">
						<Route exact path="/" render={() => <Recipes recipes={this.state.recipes} />} />
						<Route path="/:recipeId" render={(props) => <RecipeDetails user={this.state.user} recipe={this.state.recipe} 
							saveRecipe={() => this.saveRecipe()} getRecipe={(recipeId) => this.getRecipe(recipeId)} {...props} />} />
					</div>
				</div>
			</div>
		);
	}
}


export default withRouter(App);
