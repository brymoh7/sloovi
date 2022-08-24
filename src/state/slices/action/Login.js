import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import { Message, toaster } from 'rsuite';
import axios from 'axios';
import { allTaskHandle } from './AllTasks';

const Login = createAsyncThunk('post/Login', async (payload) => {
    const { data } = await axios
        .post(
            'https://stage.api.sloovi.com/login',
            {
                email: 'smithwills1989@gmail.com',
                password: '12345678',
            },
            {
                headers: {
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

const UserSlice = createSlice({
    name: 'OsomheLogin',
    initialState,
    keepUnusedDataFor: 3,
    extraReducers: {
        [Login.pending]: (state) => {
            state.status = REQUEST_STATUS.PENDING;
            state.loading = true;
        },
        [Login.fulfilled]: (state, { payload }) => {
            state.status = REQUEST_STATUS.FULFILLED;
            state.userData = payload;
            state.loading = false;
        },
        [Login.rejected]: (state, error) => {
            state.status = REQUEST_STATUS.REJECTED;
            state.error = error;
        },
    },
});

export const { setUsers, wasGone } = UserSlice.actions;

// export states
export default UserSlice.reducer;
export { Login };

//

export const LoginHandle = (dispatch, setAllTask) => {
    dispatch(Login())
        .then(unwrapResult)
        .then((res) => {
            if (res.status === 'success') {
                allTaskHandle(
                    dispatch,
                    res.results.token,
                    res.results.company_id,
                    setAllTask
                );
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
