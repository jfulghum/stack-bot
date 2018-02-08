import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from "../store.js";

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1';
const GENERAL_CHANNEL = '/channels/2';
const DOGS_CHANNEL = '/channels/3';
const LUNCH_CHANNEL = '/channels/4';


export default class ChannelList extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount () {
    axios.get('/api/channels')
      .then(res => res.data)
      .then(channels => {
        // this.setState({ channels })
        const action = gotchannelsFromServer(channels)
        store.dispatch(action)
      });

    this.unsubscribe = store.subscribe(() =>  this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    return (
      <ul>
        <li>
          {/* {this.store.channels.map(channel => {
            return (
            <NavLink to={channel.name} activeClassName="active">
              <span># really_random</span>
              <span className="badge">0</span>
            </NavLink>
            )
          })} */}
          </li>
          
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge"> {this.store.messages.filter(message => message.channelId === 1).length } </span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span># generally_speaking</span>
            <span className="badge">0</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={DOGS_CHANNEL} activeClassName="active">
            <span># dogs_of_fullstack</span>
            <span className="badge">0</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={LUNCH_CHANNEL} activeClassName="active">
            <span># lunch_planning</span>
            <span className="badge">0</span>
          </NavLink>
        </li>
      </ul>
    );
  }
}
