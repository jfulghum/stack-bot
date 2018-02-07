
import { createStore } from 'redux';
const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const initialState = {
    messages: []
};
let store = createStore(todoApp, window.STATE_FR

export const gotMessagesFromServer = function (messages){
    return {
        type: GOT_MESSAGES_FROM_SERVER,
        messages: messages
    }
}

function reducer (state = initialState, action) {
    switch (action.type) {
      case GOT_MESSAGES_FROM_SERVER: 
         return Object.assign({}, state, { messages: action.messages });
      default: 
         return state;
    }
}



