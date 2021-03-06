import React, { Component } from 'react';
import Message from './Message';
import NewMessageEntry from './NewMessageEntry';
import axios from 'axios';
import store, { gotMessagesFromServer, gotNewMessageFromServer, writeMessage } from '../store';

export default class MessagesList extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    axios.get('/api/messages')
      .then(res => res.data)
      .then(messages => {
        // this.setState({ messages })
        const action = gotMessagesFromServer(messages)
        store.dispatch(action)
      });

    this.unsubscribe = store.subscribe(() =>  this.setState(store.getState()));

    //return a function that will remove the event listener, if we invoke it. 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    const messages = this.state.messages;
    // console.log("channelId", channelId)
    const filteredMessages = messages.filter(message => message.channelId === channelId);
    console.log("filteredMessages", filteredMessages)
    return (
      <div>
     
          { 
            filteredMessages.map(message => 
                  <ul className="media-list">
                    <Message message={message} key={message.id} />
                  </ul>
                )
          }
              
          
         
        
        <NewMessageEntry channelId={ channelId }/>
      </div>
    );
  }
}
