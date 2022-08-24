import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import axios from 'axios';

const updateTask = createAsyncThunk('post/addTask', async (payload) => {
    console.log(payload);
    const { data } = await axios
        .put(
            ` https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${payload.taskID}?company_id=${payload.company_id}`,

            payload.body,
            {
                headers: {
                    Authorization: 'Bearer ' + payload.token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((err) => {
            console.log(err.response);
            return err.data;
        });

    return data;
});

const initialState = {
    userData: {},
    loading: false,
    status: 'idle',
    error: {},
};

const editTask = createSlice({
    name: 'OsomheLogin',
    initialState,
    keepUnusedDataFor: 2,
    extraReducers: {
        [updateTask.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [updateTask.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.userData = payload;
            state.loading = false;
        },
        [updateTask.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = editTask.actions;

// export states
export default editTask.reducer;
export { editTask };

//

export const updateTaskHandle = (dispatch, info) => {
    console.log(info);
    const payload = {
        token: info.token,
        companyID: info.companyID,
        body: info.body,
        taskID: info.taskID,
    };
    dispatch(updateTask(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.results);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const convertToSec = (str) => {
    const exactTime = str.toString().split('2022')[1].split('G')[0];
    let myTime = exactTime.split(':');
    let TimeInSec = myTime[0] * 60 * 60 + myTime[1] * 60 + myTime[2];

    return parseInt(TimeInSec);
};
