
import { createStore } from 'redux';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGES_FROM_SERVER = 'GOT_NEW_MESSAGES_FROM_SERVER';
// const GOT_CHANNELS_FROM_SERVER = "GOT_CHANNELS_FROM_SERVER";
const WRITE_MESSAGE = 'WRITE_MESSAGE'

const initialState = {
    messages: [],
    newMessageEntry: ''
};

export const writeMessage = function(inputContent){
    return {
        type: WRITE_MESSAGE,
        newMessageEntry: inputContent
    }
}

export const gotMessagesFromServer = function (messages){
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    }
}

export const gotNewMessageFromServer = function (messages){
    return {
        type: GOT_NEW_MESSAGES_FROM_SERVER,
        messages: messages
    }
}

function reducer (prevState= initialState, action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER: 
         return Object.assign({}, prevState, { messages: action.messages });
      case WRITE_MESSAGE: 
         return Object.assign({}, prevState, { newMessageEntry: action.newMessageEntry });
      case GOT_NEW_MESSAGES_FROM_SERVER: 
         return Object.assign({}, prevState, { messages: prevState.messages.concat(action.messages) });
      default: 
         return prevState;
    }
}

let store = createStore(reducer);
export default store;

