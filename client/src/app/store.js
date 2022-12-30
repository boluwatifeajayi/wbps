import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userAuth/userAuthSlice';
import stationAuthReducer from '../features/stationAuth/stationAuthSlice';
import documentReducer from '../features/document/documentSlice';

export const store = configureStore({
  reducer: {
    userauth: userAuthReducer,
    stationauth: stationAuthReducer,
    document: documentReducer
  },
});
