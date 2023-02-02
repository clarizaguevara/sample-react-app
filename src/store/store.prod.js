import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sagas from './sagas'
import rootReducer from './reducers';
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

export default (initialState = {}) => {

    const enhancers = [applyMiddleware(sagaMiddleware)]

    const persistConfig = {
        key: 'appPersist',
        storage: storage,
        whitelist: [], // which reducer want to store
        timeout: null
    };

    const pReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(
        pReducer,
        initialState,
        compose(...enhancers)
    );
    const persistor = persistStore(store)

    sagaMiddleware.run(sagas)

    return { persistor, store };
}
