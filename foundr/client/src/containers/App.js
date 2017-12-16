import React, { Component } from 'react';
import Post from '../components/Post';

const dateFormat = require('dateformat');

const API = 'http://localhost:8000/api'

class App extends Component {
	state = {posts: []}

	componentDidMount() {
		fetch(API+'/posts')		//Get and store posts from db using api proxy url in package.json
			.then(res => res.json())
			.then((postsJson) => {
					const posts = postsJson.map((postJson) => {
						const content = postJson.content
						const id = postJson._id
						const updated = postJson.updated
						const post = {id, content, updated}

						return post
					})

					this.setState({ posts })
				});
	}

	render() {
		return (
			<div className="container-fluid">
				{/*Navbar*/}
				<nav className="navbar navbar-default">
					<a class="navbar-brand" href="#">ChainPointers</a>
					<ul class="nav navbar-nav navbar-left">
						<li><a href="#">Getting Started</a></li>
						<li><a href="#">Development Guides</a></li>
						<li><a href="#">Investing Tutorials</a></li>
						<li><a href="#">Simple Explanations</a></li>
					</ul>
				</nav>

				{/*Main Showcase Area*/}
				<div class="jumbotron">
				  <h1 class="display-3">Learn How Bitcoin Works.</h1>
				  <h2 class="display-3">Make Money Using Your Knowledge.</h2>
				  <hr class="my-4" />
				  <p>Find out what drives the value of digital currency. Get the facts, then learn how to apply the concepts.</p>
				  <p class="lead">
				    <a class="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
				  </p>
				</div>

				{/*Featured Content Area Wtih 2 Panels*/}
				<div class="col-md-6">
					<div class="panel panel-default">
					  <div class="panel-heading">
					    <h3 class="panel-title">Panel title</h3>
					  </div>
					  <div class="panel-body">
					    Panel content
					  </div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="panel panel-default">
					  <div class="panel-heading">
					    <h3 class="panel-title">Panel title</h3>
					  </div>
					  <div class="panel-body">
					    Panel content
					  </div>
					</div>
				</div>

				{
					// this.state.posts.map((post) => {
					// 	return (
					// 		<Post post={ post } />
					// 	)
					// })
				}

				{/*Footer Area*/}
				<div class="panel">
					<div class="panel-title">
						<p className="text-center">ChainPointers 2017</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
