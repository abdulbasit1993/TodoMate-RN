import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import todoReducer from './slices/todoSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['themeReducer', 'todoReducer'],
};

const rootReducer = combineReducers({
  themeReducer: themeReducer,
  todoReducer: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
