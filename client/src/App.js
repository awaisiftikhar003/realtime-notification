import logo from './logo.svg';
import React, { Component } from "react";
import './App.css';
import openSocket from 'socket.io-client';
import _ from 'underscore'
//importing react-notification-system
import NotificationSystem from 'react-notification-system';
// initialized notificationSystem object
let notificationSystem = React.createRef();
// connecting to socket server
const socket = openSocket('http://localhost:8000/');

function App() {
	
	const name = _.sample(["Arthur", "Hall", "Henry", "Russell"])
	const age = _.sample([32,24,25,20])
	const person = {"name":name,"age":age}
	//sending data upon connecting to server
	 socket.emit('personData', person)
	 //listening for changes at server side
	 socket.on('timeNotification',(data)=>{
	//genreating notification
		 const notification = notificationSystem.current;
    notification.addNotification({
      message: `Current server time is ${data}`,
	  title: "Updated Time",
      level: 'success'
    });
	 })
	
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
		 <NotificationSystem ref={notificationSystem} newOnTop={true} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
