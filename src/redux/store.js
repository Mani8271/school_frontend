import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { thunk } from "redux-thunk";
import logger from "redux-logger";
const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
// const store = createStore(rootReducer);
const store = createStore(rootReducer, applyMiddleware(...middleware));
export default store;