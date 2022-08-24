import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/action/Login';
import AllTask from './slices/action/AllTasks';
import singleTask from './slices/action/SingleTask';

export const myReducers = combineReducers({
    loginReducer: loginReducer,
    allTasks: AllTask,
    singleTask: singleTask,
});
