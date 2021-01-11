import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import { reduxBatch } from "@manaflair/redux-batch";
import { rootReducer } from "./rootReducer";
// import {rootReducer, rootSaga} from "./rootReducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
    thunk: true,
  }),
  sagaMiddleware,
];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [reduxBatch],
});
/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

export default store;
