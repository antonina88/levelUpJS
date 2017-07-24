import React, { Component } from 'react';

export default class GiftImage extends Component {
	render() {
		const {	imagesList } = this.props;

		return (
			<div className="gifts-list">
				{imagesList}	
			</div>
		);
	}
}