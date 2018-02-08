import React, { Component } from 'react';
import axios from "axios";
import socket from '../socket'

export default class NewMessageEntry extends Component {

  constructor() {
    super()
    this.state = store.getState()
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidMount() {
    //we think we need to call writeMessages here ?? 
    this.unsubscribe = store.subscribe(() =>  this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeHandler(event){
    const action = writeMessage(event.target.value)
    store.dispatch(action)
  }

  submitHandler(event){
    event.preventDefault();
    const content = this.state.newMessageEntry;

    const channelId = this.props.channelId;

    axios.post('/api/messages', {content: content, channelId: channelId})
    .then(request => request.data)
    .then(message => {
      // const action = writeMessage(message)
      const action = gotNewMessageFromServer(message)
      store.dispatch(action)
      socket.emit('new-message', message)
    }
    ) 



  }

  render () {
    return (
      <form id="new-message-form">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newMessageEntry}
            onChange={this.changeHandler}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
