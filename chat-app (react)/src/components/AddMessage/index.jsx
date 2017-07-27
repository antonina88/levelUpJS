 import React from 'react';

export default function AddMessage({
	updateUser,
	updateText,
	addNewMessage,
	formSubmit,
	user,
	textMessage
}) 
{
	return (
		<form onSubmit={formSubmit} action="/">
	        <input 
	            type="text" 
	            id="username" 
	            placeholder="Введите имя"
	            onChange = {updateUser}
	            value = {user}
	        />
	        <br />	
	        <textarea 
	            id="message" 
	           	placeholder="Введите сообщение" 
	           	onChange = {updateText}
	           	value = {textMessage}
	        >
	        </textarea>
	        <button onClick={addNewMessage}>Send</button>
		</form>
	);
}