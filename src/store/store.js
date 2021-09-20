import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import getTeacherData from "./reducers/LacTable/getTeachersData.reducer";
import getGroupData from "./reducers/LacTable/getGroupsData.reducer";

const reducer = combineReducers({
    cvlac: getTeacherData,
    grouplac: getGroupData,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;