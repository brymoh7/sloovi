import { configureStore } from '@reduxjs/toolkit';
import { myReducers } from './combineReducers';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'klsdwp;kn;k',
    version: 1,
    storage,
    setTimeout: 1000,
};

const persistedReducer = persistReducer(persistConfig, myReducers);

export const store = configureStore({
    reducer: {
        reducer: persistedReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
