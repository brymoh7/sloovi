import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import axios from 'axios';

const singleTasks = createAsyncThunk('get/singleTask', async (payload) => {
    console.log(payload);
    const { data } = await axios
        .get(
            `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${payload.taskID}?company_id=${payload.company_id}`,
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
    singleData: {},
    loading: false,
    status: 'idle',
    error: {},
};

const OneTask = createSlice({
    name: 'OsomheLogin',
    initialState,
    keepUnusedDataFor: 3,
    extraReducers: {
        [singleTasks.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [singleTasks.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.userData = payload;
            state.loading = false;
        },
        [singleTasks.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = OneTask.actions;

// export states
export default OneTask.reducer;
export { OneTask };

//

export const singleTaskHandle = (
    dispatch,
    token,
    company_id,
    formData,
    setFormData,
    taskID,
    setAction,
    setTask
) => {
    const payload = {
        token: token,
        company_id: company_id,
        taskID: taskID,
    };
    dispatch(singleTasks(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res.results);
            setFormData({
                ...formData,
                task_msg: res.results.task_msg,
                task_time: res.results.task_time,
                task_date: res.results.task_date,
                task_id: res.results.id,
                assigned_user: res.results.assigned_user_name,
            });
            setAction('edit');
            setTask(true);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const convertTosec = (str) => {
    const exactTime = str.toString().split('2022')[1].split('G')[0];
    let myTime = exactTime.split(':');
    let TimeInSec = myTime[0] * 60 * 60 + myTime[1] * 60 + myTime[2];

    return TimeInSec;
};
