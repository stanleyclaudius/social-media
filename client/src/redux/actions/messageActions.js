import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI, postDataAPI } from './../../utils/fetchData';

export const MESSAGE_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATION: 'GET_CONVERSATION',
  GET_MESSAGE: 'GET_MESSAGE'
};

export const createMessage = ({msg, auth}) => async(dispatch) => {
  dispatch({type: MESSAGE_TYPES.ADD_MESSAGE, payload: msg});
  
  try {
    await postDataAPI('message', {
      ...msg,
      sender: auth.user._id,
      recipient: msg.recipient.user._id
    }, auth.token);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const getConversation = ({auth}) => async(dispatch) => {
  try {
    const res = await getDataAPI('conversation', auth.token);

    const newArr = [];
    res.data.conversation.forEach(item => {
      item.recipients.forEach(user => {
        if (user._id !== auth.user._id) {
          newArr.push({...item, user})
        }
      })
    });

    dispatch({
      type: MESSAGE_TYPES.GET_CONVERSATION,
      payload: newArr
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}

export const getMessage = ({id, auth}) => async(dispatch) => {
  try {
    const res = await getDataAPI(`message/${id}`, auth.token);

    dispatch({
      type: MESSAGE_TYPES.GET_MESSAGE,
      payload: res.data.message
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    });
  }
}