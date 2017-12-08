import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import axios from 'axios';
import './App.css';

import Header from './components/Header'
import Navbar from './components/Navbar'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
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
			.then((res) => {
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
			axios.post('http://localhost:8080/search', {search: search})
			.then((response) => {
				let __recipes = response.data.matches
				this.setState({
					recipes: __recipes
				})
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
				console.log("Recipe Saved!")
			})

	}
		


	render() {
		return (
			<div className="container">
				<Header />
				<Navbar />
				<Search search={(search) => this.search(search)} />
				<div className="row fullLength">

					<div className="col s12 main z-depth-1">
						<Route exact path="/" render={() => <Recipes recipes={this.state.recipes} />} />
						<Route path="/:recipeId" render={(props) => <RecipeDetails recipe={this.state.recipe} saveRecipe={() => this.saveRecipe()} getRecipe={(recipeId) => this.getRecipe(recipeId)} {...props} />} />
					</div>
				</div>
			</div>
		);
	}
}


export default App;
