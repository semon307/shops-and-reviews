import { AnyAction, combineReducers } from 'redux';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import { shopsReducer } from './shops-reducer';
import { useDispatch } from 'react-redux';
import { reviewsReducer } from './reviews-reducer';

const rootReducer = combineReducers({
  shops: shopsReducer,
  reviews: reviewsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(
    {
      serializableCheck: false,
    }
  ).prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;


export type TypedDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();


// @ts-ignore
window.store = store;
