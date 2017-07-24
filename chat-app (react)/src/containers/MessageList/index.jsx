import React, { Component } from 'react';
import Message from "./Message";

export default class MessageList extends Component {
	render() {
		const {
			messages
		} = this.props;

	    const messageList = messages.map(messageElem => (
	      	<Message 
		      	key={messageElem.id}
		      	user = {messageElem.user}
		      	textMessage = {messageElem.textMessage}
		      	urlSelectedImages = {messageElem.urlSelectedImages}
		      />
		    )
		  );

		 return (
		 	<div className="message-list">
		 	  {messageList}
		 	</div>
		 );
	}
}