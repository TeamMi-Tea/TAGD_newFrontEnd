import axios from 'axios';
import { authenticateRequest } from '../gateKeepingMiddleware';

// ACTION TYPES
const GET_HOST = 'GET_HOST';
const CREATE_HOST = 'CREATE_HOST';

// ACTION CREATORS
const getHost = (host) => {
  return {
    type: GET_HOST,
    host
  }
}

const createHost = (newHost) => {
  return {
    type: CREATE_HOST,
    newHost
  }
}

// THUNKS
export const fetchSingleHost = (email, password) => {
  return async (dispatch) => {
    try {
      const { host } = await axios.post('https://tagd-backend.herokuapp.com/auth/login', {
        email,
        password
      })
      dispatch(getHost(host))
    } catch (error) {
      console.log(error)
    }
  }
}

export const createSingleHost = (hostData) => async dispatch => {
  try {
    let createdHost = { firstName: userData.firstName, lastName: userData.lastName, email: userData.email, password: userData.password }
    const { host } = await axios.post(`https://tagd-backend.herokuapp.com/api/hosts/1`, createdHost)
    if (host) {
      dispatch(createHost(host))
    }
  } catch (error) {
    console.log(error)
  }
}

export default function hostsReducer(state = {}, action) {
  switch (action.type) {
    case GET_HOST:
      return action.host
    case CREATE_HOST:
      return { ...state, host: action.newHost }
    default:
      return state;
  }
}
