import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { Message, toaster } from 'rsuite';
import axios from 'axios';

const getTasks = createAsyncThunk('post/allTask', async (payload) => {
    const { data } = await axios
        .get(
            `https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${payload.company_id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + payload.token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err.response);
            return err.data;
        });

    return data;
});

const initialState = {
    taskData: {},
    loading: false,
    status: 'idle',
    error: {},
};

const AllTask = createSlice({
    name: 'allTasks',
    initialState,
    keepUnusedDataFor: 3,
    extraReducers: {
        [getTasks.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [getTasks.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.taskData = payload;
            state.loading = false;
        },
        [getTasks.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = AllTask.actions;

// export states
export default AllTask.reducer;
export { getTasks };

//

export const allTaskHandle = (dispatch, token, company_id, setAllTask) => {
    const payload = {
        token: token,
        company_id: company_id,
    };
    dispatch(getTasks(payload))
        .then(unwrapResult)
        .then((res) => {
            setAllTask(res.results);
            if (res.status === 'success') {
                toaster.push(
                    <Message showIcon type={res.type}>
                        {res.message}
                    </Message>,
                    {
                        placement: 'topEnd',
                    }
                );
            }
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
