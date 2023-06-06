import { combineReducers, configureStore } from '@reduxjs/toolkit';

// import reducers
import mainReducer from './modules/mainSlice';
import optionsReducer from './modules/optionsSlice';

const rootReducer = combineReducers({
  main: mainReducer,
  options: optionsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
