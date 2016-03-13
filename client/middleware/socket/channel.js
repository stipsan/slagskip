import { 
  SUBSCRIBE_SERVICE_REQUEST,
  SUBSCRIBE_SERVICE_SUCCESS,
  SUBSCRIBE_SERVICE_FAILURE,
  SUBSCRIBE_PRIVATE_REQUEST,
  SUBSCRIBE_PRIVATE_SUCCESS,
  SUBSCRIBE_PRIVATE_FAILURE,
} from '../../constants/ActionTypes'



export const maybeJoinChannel = (store, next, action, socket) => {
  console.warn('maybeJoinChannel', action);
}

export const willLeaveChannel = (store, next, action, socket) => {
  console.warn('shouldLeaveChannel?', action);
  
  return false
}