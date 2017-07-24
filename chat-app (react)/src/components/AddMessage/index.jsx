 import React from 'react';

export default function AddMessage({
	updateUser,
	updateText,
	addNewMessage,
	formSubmit
}) 
{
	return (
		<form onSubmit={formSubmit} action="/">
	        <input 
	            type="text" 
	            id="username" 
	            placeholder="Введите имя"
	            onChange = {updateUser}
	        />
	        <br />	
	        <textarea 
	            id="message" 
	           	placeholder="Введите сообщение" 
	           	onChange = {updateText}
	        >
	        </textarea>
	        <button onClick={addNewMessage}>Send</button>
		</form>
	);
}