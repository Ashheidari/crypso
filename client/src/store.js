import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER } from "redux-persist";

import storage from 'redux-persist/lib/storage';
import authReducer from "state/authSlice";


const persistConfig = {key:'root', storage, version: 1};

const persistedReducer = persistReducer(persistConfig,authReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>{
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH,REHYDRATE,PAUSE,PURGE,REGISTER]
            }
        });
    }
})