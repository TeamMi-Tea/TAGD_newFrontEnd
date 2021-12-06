import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import usersReducer from "./reducers/users";
import hostsReducer from "./reducers/hosts";

const reducer = combineReducers({
  users: usersReducer,
  hosts: hostsReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({ collapsed: true })))

const store = createStore(reducer, middleware)

export default store;
export * from './reducers/users';
