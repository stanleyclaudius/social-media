import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import suggestion from './suggestionReducer';
import discover from './discoverReducer';
import postDetail from './postDetailReducer';
import notification from './notificationReducer';
import socket from './socketReducer';
import message from './messageReducer';
import status from './statusReducer';
import call from './callReducer';
import peer from './peerReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  homePost,
  suggestion,
  discover,
  postDetail,
  socket,
  message,
  status,
  call,
  peer,
  notification
});