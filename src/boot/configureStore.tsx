import { createStore, applyMiddleware, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import reducers from "../reducers";
import promise from './promise';
import storage from "redux-persist/lib/storage";

const peristConfig = {
  key: "root",
  storage,
};


const persistedReducer = persistReducer(peristConfig, reducers);

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(thunk, promise),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );

  const store = createStore(persistedReducer, enhancer);
  persistStore(store, onCompletion);

  return store;
}

