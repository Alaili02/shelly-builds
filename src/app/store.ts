import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import equipmentInventoryReducer from '../store/equipmentInventorySlice';

import weaponInventoryReducer from '../store/weaponInventorySlice';
import matrixInventoryReducer from '../store/matrixInventorySlice';
import characterReducer from '../store/characterSlice';
import configReducer from '../store/configSlice';
import toastReducer from '../store/toastSlice';
import loadoutReducer from '../store/loadoutSlice';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  config: configReducer,
  character: characterReducer,
  equipmentInventory: equipmentInventoryReducer,
  weaponInventory: weaponInventoryReducer,
  matrixInventory: matrixInventoryReducer,
  loadout: loadoutReducer,
  toast: toastReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
  }),
});
export const persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
