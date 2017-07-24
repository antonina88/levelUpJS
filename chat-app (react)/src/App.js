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
        textMessage : "",
        images: []
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

    const { user, textMessage, images } = this.state;
    let activeImg = document.querySelectorAll("img.active");

    let idSelectedImages = [],
        urlSelectedImages = [],
        url;
   // let id= ++idCount;

   if (user) {
  /*    if (textMessage) {
        socket.emit("chat message", {id, user, textMessage, urlSelectedImages }); 
      }  */
      if (activeImg) {
        /* idSelectedImages = activeImg.map(function(imgElem) {
            imageId = imgElem.dataset.id;
            imgElem.classList.remove("active");
            return imageId;
        }); */

        activeImg.forEach(imgElem => {
          idSelectedImages.push(imgElem.dataset.id);
          imgElem.classList.remove("active");
        });

        idSelectedImages.forEach(imageId => {
         fetch(`http://api.giphy.com/v1/gifs/${imageId}?api_key=dc6zaTOxFJmzC`)
          .then(res => res.json())
          .then(res => {
              url = res.data.images.fixed_width.url;
              urlSelectedImages.push(url);
            //  socket.emit("chat message", {user, url}); 
          });
       });
        console.log(urlSelectedImages);
        this.setState({images: urlSelectedImages});
        socket.emit("chat message", {user, textMessage, images}); 
      } 
    }
  }

  addNewMessage({ id, user, textMessage, images}) {
    const { messages } = this.state;

    if (user){
        messages.push({id, user, textMessage, urlSelectedImages: images });
    }

    this.setState({ 
      messages
    });
  
  /* this.setState({
      messages, 
      user: "", 
      textMessage: "", 
      images: []
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
