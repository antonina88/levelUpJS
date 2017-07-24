import React, { Component } from 'react';

export default class Messages extends Component {
	render() {
		const {
			user,
			textMessage, 
			urlSelectedImages
		} = this.props;

		const imagesList = urlSelectedImages.map((url, index) => ( 
		     <img key={index} src={url} alt="selectedGify" />
		   )
		);
		
		return (

			<div className="item-message">
				<p className="user">{user}</p>
				<p className="text">{textMessage}</p>
				{imagesList}		
			</div>
		);
	}
}