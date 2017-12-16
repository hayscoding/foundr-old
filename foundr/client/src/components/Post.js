import React, { Component } from 'react';
import '../css/custom.css';

const dateFormat = require('dateformat');

function Post(props) {
	const post = props.post

	return (
		<div className="container col-md-10">
			<div className="panel panel-default" key={post._id}>
				<div className="panel-heading">
					<h1 className="panel-title" key={post._id+'h1'}>{post.content.title}</h1>
				</div>
				<div className="panel-body">
					<p key={post._id+'info'}><strong key={post._id+'strong'}>Author: {post.content.author}</strong> | Last Updated: {
						dateFormat(post.updated, "dddd, mmmm dS, yyyy, h:MM:ss TT")
					}</p>
					<p key={post._id+'body'}>{post.content.body}</p>
				</div>
			</div>
		</div>
	);
}

export default Post;
