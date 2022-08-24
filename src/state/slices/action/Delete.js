import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { Message, toaster } from 'rsuite';
import axios from 'axios';

const deleteTasks = createAsyncThunk('post/deleteTask', async (payload) => {
    console.log(payload);
    const { data } = await axios
        .delete(
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

const myTask = createSlice({
    name: 'OsomheLogin',
    initialState,
    keepUnusedDataFor: 3,
    extraReducers: {
        [deleteTasks.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [deleteTasks.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.userData = payload;
            state.loading = false;
        },
        [deleteTasks.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = myTask.actions;

// export states
export default myTask.reducer;
export { deleteTasks };

//

export const deleteTaskHandle = (dispatch, token, company_id, taskID) => {
    const payload = {
        token: token,
        company_id: company_id,
        taskID: taskID,
    };
    dispatch(deleteTasks(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
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
            alert('Are you sure you want to delete this task?');
        })
        .catch((err) => {
            console.log(err);
        });
};
