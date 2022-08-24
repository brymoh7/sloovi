import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import axios from 'axios';

const addTask = createAsyncThunk('post/addTask', async (payload) => {
    // console the payload.
    console.log(payload);
    const { data } = await axios
        .post(
            `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${payload.company_id}`,

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

const newTask = createSlice({
    name: 'OsomheLogin',
    initialState,
    keepUnusedDataFor: 3,
    extraReducers: {
        [addTask.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [addTask.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.userData = payload;
            state.loading = false;
        },
        [addTask.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = newTask.actions;

// export states
export default newTask.reducer;
export { newTask };

//

export const addNewTaskHandle = (dispatch, info) => {
    console.log(info);
    const payload = {
        token: info.token,
        companyID: info.companyID,
        body: info.body,
    };
    dispatch(addTask(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.results);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const convertTosec = (str) => {
    const exactTime = str.toString().split('2022')[1].split('G')[0];
    let myTime = exactTime.split(':');
    let TimeInSec = myTime[0] * 60 * 60 + myTime[1] * 60 + myTime[2];

    return parseInt(TimeInSec);
};
