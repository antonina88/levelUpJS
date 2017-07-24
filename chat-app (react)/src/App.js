import React, { Component } from 'react';
import './App.css';

import AddMessage from "./components/AddMessage";
import MessageList from "./containers/MessageList";
import GiftsList from "./containers/GiftsList";

import io from 'socket.io-client';

const socket = io('http://46.101.241.147:8888');

let idCount = 0;

class App extends Component {
  constructor() {
      super();
     
      this.state = {
        messages: [],
        giftsList: [],

        user : "",
        textMessage : ""
      };

      this.addNewMessage = this.addNewMessage.bind(this);
      this.toggleActive = this.toggleActive.bind(this);
      this.formSubmit = this.formSubmit.bind(this);
      this.updateUser = this.updateUser.bind(this); 
      this.updateText = this.updateText.bind(this);   
  }

  componentDidMount() {
      fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
      .then(res => res.json())
      .then(res => {
        const images = res.data.map(element => {
          return {
            id: element.id,
            url: element.images.fixed_height_small.url
          } 
        });
        this.setState({giftsList : images});
      }); 
     
      socket.on("chat message", data => {
        console.log(data);
        this.addNewMessage(data);
      });  
  }

  formSubmit(ev) {
    ev.preventDefault();
    const { user, textMessage } = this.state;
    let activeImg = Array.from(document.querySelectorAll("img.active"));

   if (user) {
      if (activeImg) {
        let idSelectedImages = activeImg.map(function(imgElem) {
            let imageId = imgElem.dataset.id;
            imgElem.classList.remove("active");
            return imageId;
        }); 

        let urlSelectedImages = idSelectedImages.map(imageId => {
          return fetch(`http://api.giphy.com/v1/gifs/${imageId}?api_key=dc6zaTOxFJmzC`)
                 .then(res => res.json());
        });

        Promise.all(urlSelectedImages).then(function(requestUrl) {
            let urlImages = requestUrl.map(element => {
                return element.data.images.fixed_width.url;
            });
           // console.log(urlImages);
            socket.emit("chat message", {user, textMessage, urlImages}); 
        });  
      } 
    }
  }

  addNewMessage({ user, textMessage, urlImages}) {
    const { messages } = this.state;

    if (user){
        messages.push({id: ++idCount, user, textMessage, urlSelectedImages: urlImages});
    }

    this.setState({ 
      messages,
    });
  
  /* this.setState({
      messages, 
      user: "", 
      textMessage: ""
    }); */

/*    let userElement = document.getElementById("username");
    userElement.value="";
    let messageElement = document.getElementById("message");
    messageElement.value="";*/
  }

  toggleActive(ev) {
    ev.target.classList.toggle("active");
  }

  updateUser(ev) {
    this.setState({
      user: ev.target.value
    })
  }
    
  updateText(ev) {
    this.setState({
      textMessage: ev.target.value
    })
  }

  render() {
    const {
      giftsList,
      messages
    } = this.state;

    return (
        <div className="App">
           <MessageList
            messages = {messages}
          />

          <GiftsList
            giftsList = {giftsList}
            toggleActive = {this.toggleActive}
          />

          <AddMessage
            addNewMessage = {this.addNewMessage}
            formSubmit = {this.formSubmit}
            updateUser = {this.updateUser}
            updateText = {this.updateText}
          />
        </div>
      );
    }
}

export default App;
