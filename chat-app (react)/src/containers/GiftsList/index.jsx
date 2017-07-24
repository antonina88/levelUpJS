import React, { Component } from 'react';
import GiftImage from "./GiftImage";

export default class GiftsList extends Component {
	render() {
		const {
			giftsList,
			toggleActive
		} = this.props;

		const imagesList = giftsList.map((element, index) => ( 
		       <img key={index} src={element.url} data-id={element.id} onClick={toggleActive} alt="gifycom" />
		    )
		  );

		 return (
		 	 <GiftImage 
		      	imagesList = {imagesList}
		      />
		 );
	}
}